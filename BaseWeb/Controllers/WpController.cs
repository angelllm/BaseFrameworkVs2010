using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BaseWeb.Common;
using IBatisServer;


namespace BaseWeb.Controllers
{
    public class WpController : WpTempController
    {
        // GET: /Index/
        public ActionResult Index(int? id)
        {
            v.Display("index.htm");
            return View();
        }
       
        // GET: /wp/List/
        public JsonResult List(int? id)
        {
            #region 通用分页
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ass = new ArticleService();
            string url = "/wp/list/";
            string strwhere = "[sys_article]  where  article_status = 1 and article_type not in (select type_id from sys_type where type_parent = 73) ";
            if (!string.IsNullOrEmpty(Request["t"]))
            {
                SysTypeService sts = new SysTypeService();
                int tid = Convert.ToInt32(Request["t"]);

                v.Put("cur", tid);
                llm.Model.sys_type t = sts.GetModelById(tid);
                if (t != null) v.Put("t", "<li><a href='/index/list/?t=" + t.type_id + "'><i class=\"fa fa-list-ul\"></i> " + t.type_name + "</a></li>");
                v.Put("curparent", t.type_parent);
                v.Put("articl", t.type_name + " - 文章列表 - "); 
                strwhere += " and article_type in (select type_id from sys_type where type_parent = " + tid + " or type_id = " + tid + ") ";
                url += "?t=" + Request["t"] + "&id=";
            }
            else { v.Put("articl", ""); v.Put("t", ""); }
            if (!string.IsNullOrEmpty(Request["tag"]))
            {
                strwhere += " and article_tag like '%" + Request["tag"] + "%' ";
                url += "?tag=" + Request["tag"] + "&id=";
                v.Put("ta", Request["tag"]);
            }
            else { v.Put("ta", ""); }
            //通用分页  
            int pageindex = 1, pagesize = 10;
            pageindex = id != null ? (int)id * pagesize : pagesize;
            /*通用型sql 分页 满足 access sql2000 sql05 sql08 
            * 创建条件sql搜索满足要求的总数量 
            * 需要传入表名 
            * 表名后可加入搜索条件
            */
            string sqlCount = PagingHelper.CreateJoinCountingSql(strwhere);
            int rows = ass.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_time desc ", "*,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count");
            //v.Put("sql", PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(1) from sys_commite where commite_article_id = art.article_id) as [content_count]"));
            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url,1);
            IList<llm.Model.article> list = ass.GetModelListByPage2(sql);
            v.Put("pageinfo", lp.Contents);
            v.Put("list", list);
            jr.Data = list;
            return jr;
            #endregion   
          
          
           
        }

        public JsonResult TopList()
        {
            #region 通用分页
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ass = new ArticleService();
            string strwhere = "[sys_article]  where   article_status = 1 and article_type not in (select type_id from sys_type where type_parent = 73) ";
            //通用分页  
            string sqlCount = PagingHelper.CreateJoinCountingSql(strwhere);
            int rows = ass.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(1, 3, 0, strwhere, "article_pv desc ", "*,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count");
            //分页控件
            IList<llm.Model.article> list = ass.GetModelListByPage2(sql);
            v.Put("list", list);
            jr.Data = list;
            return jr;
            #endregion



        }
        public JsonResult NavList()
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            SysTypeService sts = new SysTypeService();
            jr.Data = sts.GetModelList("type_dict_code = 'article' and type_id != 73 ");

            return jr;
        }
        public JsonResult ListCount()
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ats = new ArticleService();
            int count = ats.GetPageinfoCount("select count(1) from  sys_article where article_status = 1 and article_type not in (select type_id from sys_type where type_parent = 73) ");
            llm.Model.article art = new llm.Model.article();
            art.article_pv = count;
            jr.Data = art;
            return jr;
        }

        public JsonResult TagList()
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleTagService ats = new ArticleTagService();
            IList<llm.Model.article_tag> taglist = ats.GetModelList();
            jr.Data = taglist;
            return jr;
        }

        public JsonResult CommiteList()
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            commiteService css = new commiteService();
            IList<llm.Model.commite> clist = css.GetModelList("commite_status = 1 and commite_ref_id = 0 order by commite_id desc");
            foreach (var item in clist)
            {
                Util.StringHelper sh = new Util.StringHelper();
                item.commite_uhead = sh.TimeDifference(item.commite_time);
                item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
            }
            jr.Data = clist;
            return jr;
        }


        public JsonResult LikeList()
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ats = new ArticleService();
            IList<llm.Model.article> list = ats.GetModelListByPage3("select top 5 *, NewID() as random,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count from sys_article where article_status = 1 order by random ");
            jr.Data = list;
            return jr;
        }

        // GET: /wp/View/
        public ActionResult View(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                getParse();
                v.Put("art", art);
                SysTypeService ts = new SysTypeService();
                llm.Model.sys_type t = ts.GetModelById((int)art.article_type);
                if (t != null) v.Put("t", "<li><a href='/index/list/?t=" + t.type_id + "'><i class=\"fa fa-list-ul\"></i> " + t.type_name + "</a></li>");
                else v.Put("t", "");
                string tag = "";
                foreach (var item in art.article_tag.Split(','))
                {
                    tag += "<a href='/index/list/?tag=" + item + "'>" + item + "<a/>,";
                }
                tag = tag.Substring(0, tag.LastIndexOf(','));
                ArticleContentService asc = new ArticleContentService();
                IList<llm.Model.article_content> list = asc.GetModelList("content_article_id=" + art.article_id + " order by content_order asc ");
                if (list.Count == 0)
                {
                    llm.Model.article_content c = new llm.Model.article_content();
                    c.content_article_id = art.article_id;
                    c.content_content = art.article_content;
                    c.content_title = art.article_title;
                    list.Add(c);
                }
                commiteService css = new commiteService();
                IList<llm.Model.commite> clist = css.GetModelList("commite_status = 1 and commite_article_id=" + art.article_id + " order by commite_id desc");
                foreach (var item in clist)
                {
                    item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
                }
                v.Put("clist", clist);
                v.Put("list", list);
                v.Put("tag", tag);
                v.Put("q", "");
                v.Put("aid", art.article_id);
                v.Put("count", clist.Count());
                v.Display("item.htm");
            }
            else
            {
                v.Display("error.htm");
            }

            return View();
        }

        // GET: /wp/Item/
        public ActionResult Item(int? id)
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                //jr.Data = art;
                SysTypeService ts = new SysTypeService();
                llm.Model.sys_type t = ts.GetModelById((int)art.article_type);
                ArticleContentService asc = new ArticleContentService();
                IList<llm.Model.article_content> list = asc.GetModelList("content_article_id=" + art.article_id + " order by content_order asc ");
                if (list.Count == 0)
                {
                    llm.Model.article_content c = new llm.Model.article_content();
                    c.content_article_id = art.article_id;
                    c.content_content = art.article_content;
                    c.content_title = art.article_title;
                    list.Add(c);
                }
                commiteService css = new commiteService();
                IList<llm.Model.commite> clist = css.GetModelList("commite_status = 1 and commite_article_id=" + art.article_id + " order by commite_id desc");
                foreach (var item in clist)
                {
                    item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
                }
                v.Put("clist", clist);
                v.Put("list", list);

                jr.Data = list;
                v.Put("count", clist.Count());
               
            }
            else
            {
                v.Display("error.htm");
            }

            return jr;
        }
          
        public ActionResult Error(string q)
        {
            v.Display("404.html");
            return View();
        }
   
        public void getParse(){

            ArticleTagService ats = new ArticleTagService();
            IList<llm.Model.article_tag> taglist = ats.GetModelList();
            v.Put("taglist", taglist);
            commiteService css = new commiteService();
            IList<llm.Model.commite> clist = css.GetModelList("commite_status = 1 and commite_ref_id = 0 order by commite_id desc");
            foreach (var item in clist)
            {
                item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
            }
            v.Put("clist", clist);
            v.Put("count", clist.Count());
        }


        // GET: /wp/GetList/
        public JsonResult GetList(int? id)
        {
            Response.AddHeader("Access-Control-Allow-Origin", "*");
            #region 通用分页
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ass = new ArticleService();
            string url = "/wp/list/";
            string strwhere = "[sys_article]  where  article_status = 1 and article_type not in (select type_id from sys_type where type_parent = 73) ";
            if (!string.IsNullOrEmpty(Request["t"]))
            {
                SysTypeService sts = new SysTypeService();
                int tid = Convert.ToInt32(Request["t"]);

                v.Put("cur", tid);
                llm.Model.sys_type t = sts.GetModelById(tid);
                if (t != null) v.Put("t", "<li><a href='/index/list/?t=" + t.type_id + "'><i class=\"fa fa-list-ul\"></i> " + t.type_name + "</a></li>");
                v.Put("curparent", t.type_parent);
                v.Put("articl", t.type_name + " - 文章列表 - ");
                strwhere += " and article_type in (select type_id from sys_type where type_parent = " + tid + " or type_id = " + tid + ") ";
                url += "?t=" + Request["t"] + "&id=";
            }
            else { v.Put("articl", ""); v.Put("t", ""); }
            if (!string.IsNullOrEmpty(Request["tag"]))
            {
                strwhere += " and article_tag like '%" + Request["tag"] + "%' ";
                url += "?tag=" + Request["tag"] + "&id=";
                v.Put("ta", Request["tag"]);
            }
            else { v.Put("ta", ""); }
            //通用分页  
            int pageindex = 1, pagesize = 10;
            pageindex = id != null ? (int)id * pagesize : pagesize;
            /*通用型sql 分页 满足 access sql2000 sql05 sql08 
            * 创建条件sql搜索满足要求的总数量 
            * 需要传入表名 
            * 表名后可加入搜索条件
            */
            string sqlCount = PagingHelper.CreateJoinCountingSql(strwhere);
            int rows = ass.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_time desc ", "*,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count");
            //v.Put("sql", PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(1) from sys_commite where commite_article_id = art.article_id) as [content_count]"));
            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url, 1);
            IList<llm.Model.article> list = ass.GetModelListByPage2(sql);
            v.Put("pageinfo", lp.Contents);
            v.Put("list", list);
            jr.Data = list;
            return jr;
            #endregion



        }


    }
}
