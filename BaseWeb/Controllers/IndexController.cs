using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BaseWeb.Common;
using IBatisServer;


namespace BaseWeb.Controllers
{
    public class IndexController : HtmlController
    {
        // GET: /Index/
        public ActionResult Index()
        {

            if (Request.FilePath == "/" && System.IO.File.Exists(Server.MapPath("/index.html")))
            {
                v.Init("/");
                //v.Put("date", DateTime.Now.ToString());
                //做登录的时候 在HtmlController中put 登录信息参数
                //生成页面的时候登录等数不要指定
                //在判断有静态页后put 登录信息
                v.Display("index.html");
            }
            else
            {
                ArticleService ass = new ArticleService();
                IList<llm.Model.article> list = ass.GetTopModelList(10);
                v.Put("list", list);
                //SysTypeService sts = new SysTypeService();
                v.Put("cur", "");
                v.Put("pageinfo", "");
                v.Put("articl", "");
                v.Put("q", "");
                
                getParse();
                v.Display("blog.html");
            }
            return View();
        }
        // GET: /Index/List/
        public ActionResult List(int? id)
        {
            #region 通用分页
            ArticleService ass = new ArticleService();
            string url = "/index/list/";
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

            #endregion   
            getParse();
            v.Put("q", "");
            v.Display("blog.html");
            return View();
        }

        // GET: /Index/View/
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
                if (t != null)  v.Put("t", "<li><a href='/index/list/?t=" + t.type_id + "'><i class=\"fa fa-list-ul\"></i> " + t.type_name + "</a></li>");
                else v.Put("t", "");
                string tag = "";
                foreach (var item in art.article_tag.Split(','))
                {
                    tag += "<a href='/index/list/?tag=" + item + "'>" + item + "<a/>,";
                }
                tag = tag.Substring(0, tag.LastIndexOf(','));
                ArticleContentService asc = new ArticleContentService();
                IList<llm.Model.article_content> list = asc.GetModelList("content_article_id=" + art.article_id + " order by content_order asc ");
                if (list.Count==0)
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
                v.Display("item.html");
            }
            else
            {
                v.Display("error.html");
            }
           
            return View();
        }

        public ActionResult Search(string q)
        {
            Util.LuceneHelper lh = new Util.LuceneHelper(15, 1);
            lh.SearchIndex(q);
            v.Put("list", lh.list);
            v.Put("q", q);
            getParse();
            v.Display("search.html");
            return View();
        }

        public string Feedback()
        {
            string outhtml = "ok";
            commiteService cs = new commiteService();
            llm.Model.commite c = new llm.Model.commite();
            c.commite_uname = Util.SQL.NoHTML(Request["name"]);
            c.commite_content = Util.SQL.NoHTML(Request["content"]);
            c.commite_uhead = "/content/images/noavatar_default.png";
            if (!string.IsNullOrEmpty(Request["aid"])) c.commite_article_id = Convert.ToInt32(Request["aid"]);
            c.commite_time = DateTime.Now;
            c.commite_ip = Util.getIP.GetUserIP();
            c.commite_status = 0;
            c.commite_ref_id = 0;
            c.commite_uid = 0;
            cs.Add2(c);
            return outhtml;
        }

        public ActionResult Error(string q)
        {
            v.Display("404.html");
            return View();
        }
        public ActionResult Angular()
        {
            v.Display("Angularjs.htm");
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
    }
}
