using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BaseWeb.Common;
using IBatisServer;
using Util;

namespace BaseWeb.Controllers
{
    public class HomeController : BaseController
    { 
        // GET: /Home/ 
        public ActionResult Index()
        {
            //TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            //v.Init("/Template/web/");
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> list = ass.GetModelList(" article_status = 1 order by article_time desc ");
            v.Put("list", list); 
            SysTypeService sts = new SysTypeService();
            IList<llm.Model.sys_type> booktypelist = sts.GetModelList(" type_cid = 101 and type_position = 'sysfl' order by type_order asc ");
            v.Put("booktypelist", booktypelist); 
            IList<llm.Model.sys_type> bookjiatypelist = sts.GetModelList(" type_cid = 101 and type_position = 'sysjfl' order by type_order asc ");
            v.Put("bookjiatypelist", bookjiatypelist);
            //IList<llm.Model.sys_type> photolist = sts.GetModelListWithPhotoWhere(" type_cid = 110 and type_position = 'yxc' order by type_order asc ");
            // v.Put("photolist", photolist);  
            v.Display("index.htm"); 
            return View();
        }

        public ActionResult t()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");

            LuceneHelper lh = new LuceneHelper(15,1);
            //商品索引与搜索
            //lh.CreateGoodsIndex(true);
            lh.SearchGoodsIndex("apple");
            v.Put("list", lh.plist);
            //文章索引与搜索
            //lh.CreateIndex(true);
            lh.SearchIndex("asp");
            v.Put("list2", lh.list);
            v.Display("article.htm");
            return View();
        }
        public ActionResult pitem(int? id)
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            ProductService ass = new ProductService();
            llm.Model.product item = ass.GetModelById((int)id);
            if (item!=null) item.product_image = item.product_image.Replace("thumb", "normal");
            v.Put("model", item); 
            v.Display("product.htm");
         
            return View();
        }
        public ActionResult Item(int? id)
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            ArticleService ass = new ArticleService();
            llm.Model.article item = ass.GetModelById((int)id);
            v.Put("model", item);
            ArticleContentService acs = new ArticleContentService();
            IList<llm.Model.article_content> list = acs.GetModelList("content_article_id = "+id+" order by content_order asc ");
            v.Put("list", list);
            //IList<llm.Model.article> list = ass.GetModelList("1=1 order by article_time desc ");
            v.Display("item.htm"); 
            return View();
        }

        public JsonResult ContentList(int? id)
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            JsonResult jr = new JsonResult();
            ArticleService ass = new ArticleService();
            llm.Model.article a = ass.GetModelById((int)id);
            ArticleContentService acs = new ArticleContentService();
            IList<llm.Model.article_content> list = null;
            if (a!=null)
            {
                list = acs.GetModelList("content_article_id = " + id + " order by content_order asc");
                if (list.Count == 0)
                {
                    llm.Model.article_content ac = new llm.Model.article_content();
                    ac.content_title = a.article_title;
                    ac.content_content = a.article_content;
                    list.Add(ac);
                }
            }
            jr.Data = list;
            return jr;
        }

        public JsonResult BookJiaTypeList(int? id)
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            JsonResult jr = new JsonResult();
            ArticleService acs = new ArticleService();

            IList<llm.Model.article> list = acs.GetModelList("article_type in (select type_id from sys_type where type_path like '%|" + id + "|%') and article_status = 1  order by article_time desc");
            jr.Data = list;
            return jr;
        }
        public JsonResult BookTypeList(int? id)
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            JsonResult jr = new JsonResult();
            ArticleService acs = new ArticleService();

            IList<llm.Model.article> list = acs.GetModelList("article_type = " + id + "  and article_status = 1  order by article_time desc");
            jr.Data = list;
            return jr;
        }

        public class stringHelper
        {
            public string SubStr(object obj, int length)
            {

                if (obj.ToString().Length > length)
                {
                    obj = obj.ToString().Substring(0, length - 1);
                }
                return obj.ToString();
            }
        }
        public ActionResult dog()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            v.Display("dog.htm");
            return View();
        }
        public ActionResult About()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            v.Put("val", "oh shit this is about page,fuck this page");
            v.Display("about.htm");
            return View();
        }

        public ActionResult _3d()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/3d/"); 
            v.Display("index.html");
            return View();
        } 

        public ActionResult babylon()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/3d/");
            v.Display("babylon.html");
            return View();
        }

        public ActionResult three()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/3d/");
            v.Display("three.html");
            return View();
        }


    }
}
