using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BaseWeb.Common;
using IBatisServer; 

namespace BaseWeb.Controllers
{
    public class ApiController : Controller 
    { 
        public JsonResult Result(string method)
        {
            //Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            //Response.AddHeader("Access-Control-Allow-Origin", "http://llmztt.com");
            Response.AddHeader("Access-Control-Allow-Origin", "*");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            if (method == "typeList")
            {
                //分类列表
                jr.Data = getTypeList();
            }
            if (method == "typeLists")
            {
                //分类列表
                jr.Data = getTypeListWithListCount();
            } 
            else if (method == "getArticleList")
            {
                //获取文章列表
                jr.Data = getArticleList(Convert.ToInt32(Request["pagesize"]), Convert.ToInt32(Request["pageindex"]));
            }
            else if (method == "getArticleLists")
            {
                //获取文章列表
                jr.Data = getArticleListWithTypeList(Convert.ToInt32(Request["pagesize"]), Convert.ToInt32(Request["pageindex"]));
            }
                 
            else if (method == "getTopArticleList")
            {
                //获取置顶文章列表
                jr.Data = getTopArticleList(Convert.ToInt32(Request["pagesize"]), Convert.ToInt32(Request["pageindex"]));
            }
            else if (method == "getItem")
            {
                //文章详情
                jr.Data = View(Convert.ToInt32(Request["id"]));
            }
            else if (method == "getBlogstat")
            {
                //博客统计
                jr.Data = getBlogstat();
            }
            else if (method == "getArchive")
            {
                //文章归档
                jr.Data = getArchive();
            }
            else if (method == "getCommitelist")
            {
                //最新评论
                jr.Data = getCommiteList();
            }
            else if (method == "getTaglist")
            {
                //标签列表
                jr.Data = getTagList();
            }
            else if (method == "getLinklist")
            {
                //友情链接列表
                jr.Data = getLinkList();
            }
            else if (method == "getNearlist")
            {
                //近期文章列表
                jr.Data = getNearList();
            }
            else if (method == "getBase")
            {
                //SEO信息
                jr.Data = getBase();
            }
            else if (method == "addLike")
            {
                //喜欢 赞
                jr.Data = this.addLike(new int?(Convert.ToInt32(base.Request["id"])));
            }
            else if (method == "addCommit")
            {
                //添加评论
                jr.Data = this.addCommit();
            }
            return jr;
        }

        [HttpPost]
        public JsonResult Post(string method)
        {
            Response.AddHeader("Access-Control-Allow-Origin", "*");
            Response.AddHeader("Access-Control-Allow-Methods","DELETE, HEAD, GET, OPTIONS, POST, PUT");
            Response.AddHeader("Access-Control-Allow-Headers","Content-Type, Content-Range, Content-Disposition, Content-Description");
            //Response.AddHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,XMLHttpRequest");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet; 
            if (method == "addLike")
            {
                //喜欢 赞
                jr.Data = this.addLike(new int?(Convert.ToInt32(base.Request["id"])));
            }
            
            return jr;
        }


        public bool addCommit()
        {
            commiteService css = new commiteService();
            llm.Model.commite c = new llm.Model.commite();
            c.commite_article_id = Convert.ToInt32(Request["id"]);
            c.commite_ref_id = Convert.ToInt32(Request["commite_id"]);
            c.commite_content = Util.SQL.NoHTML(Request["content"]);
            c.commite_uname = Util.SQL.NoHTML(Request["name"]);
            c.commite_email = Util.SQL.NoHTML(Request["email"]);
            c.commite_url = Util.SQL.NoHTML(Request["site"]);
            c.commite_status = 0;
            c.commite_time = DateTime.Now; 
            c.commite_uhead = "";
            c.commite_ip = Util.getIP.GetUserIP();
            return css.Add(c) > 0;
        } 

        public bool addLike(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            art.article_like++;
            ass.UpdateLike(art);
            return true;
        }  

        public llm.Model.page getBase()
        {
            pageService pss = new pageService();
            llm.Model.page _base = pss.GetModelByTypeCode("base");
            return _base;
        }  

        public IList<llm.Model.article> getNearList()
        {
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> artlist = ass.GetModelListByPageUseTopForLand(5, 5 * 1, " and Article_status = 1");
            return artlist;
        } 

        public IList<llm.Model.page> getLinkList()
        {
            pageService pss = new pageService();
            IList<llm.Model.page> linklist = pss.GetModelListByPageUseTop(10, 10, " and page_type_id in (select type_id from sys_type where type_code='link') ");
            return linklist;
        }  

        
        public IList<llm.Model.article_tag> getTagList()
        {
            ArticleTagService ats = new ArticleTagService();
            IList<llm.Model.article_tag> taglist = ats.GetModelList();
            return taglist;
        }  

        public IList<llm.Model.commite> getCommiteList()
        {
            commiteService css = new commiteService();
            Util.StringHelper sh = new Util.StringHelper();
            IList<llm.Model.commite> commitelist = css.GetModelList("commite_status = 1 and commite_ref_id = 0 order by commite_id desc");
            foreach (var item in commitelist)
                item.commite_uhead = sh.TimeDifference(item.commite_time);
                //item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
            return commitelist;
        }  

        public IList<llm.Model.article> getArchive()
        {
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> archiveslist = ass.GetArchives();
            return archiveslist;
        }  

        public llm.Model.webbase getBlogstat()
        { 
            ArticleService ass = new ArticleService();
            llm.Model.webbase wb = new llm.Model.webbase();
            //网站基数
            llm.Model.article art = ass.GetLastUpdateTime();
            wb.article_count = (int)art.article_total;
            wb.commite_count = art.commite_count;
            wb.web_time = "2016-2-18";
            DateTime dt = DateTime.Now;
            wb.last_updatetime = art.article_last_time.Replace("/", "-");
            TimeSpan ts = dt - Convert.ToDateTime(wb.web_time);
            wb.web_daycount = (int)Math.Floor(ts.TotalDays) + 1;
            wb.tag_count = (int)art.article_new;
            return wb;
        }

        public IList<Object> View(int? id)
        { 
            ArticleService ass = new ArticleService();
            IList<Object> list = new List<Object>();

            var art = ass.GetModelById((int)id);
            if (art != null)
            {
                if (art.article_status != 1)
                    return list;
                art.article_pv++;
                ass.Update(art);
                Util.StringHelper sh = new Util.StringHelper();
                art.article_guid = sh.TimeDifferenceZh(art.article_time);
                ArticleContentService acs = new ArticleContentService();
                //文章分页内容
                IList<llm.Model.article_content> clist = acs.GetModelList("content_article_id = " + art.article_id + " order by content_order asc");
                //其分类下的所有文章
                IList<llm.Model.article> alist = ass.GetModelList("article_type = " + art.article_type + " and article_id != " + art.article_id + " and article_status = 1 order by article_time desc");
                //上一页下一页
                IList<llm.Model.article> prevnext = ass.GetPrevNext(art.article_id);
                //评论
                commiteService css = new commiteService();
                IList<llm.Model.commite> commiteforlist = css.GetCommiteList(art.article_id);
                //art.commite_count = commiteforlist.Count;

                list.Add(art);
                list.Add(clist);
                list.Add(alist);
                list.Add(prevnext);
                list.Add(commiteforlist);
            }
            else{

            }
            return list;
         
        }

        /// <summary>
        /// 获取置顶文章列表
        /// </summary>
        /// <returns></returns>
        public IList<llm.Model.article> getTopArticleList(int pagesize, int pageindex)
        {
            Util.StringHelper sh = new Util.StringHelper();
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> artlist = null;
            try
            {
                artlist = ass.GetModelListByPageUseTopForLand(pagesize, pageindex * pagesize, " and Article_status = 1 and Article_is_top = 1 ");
                foreach (var item in artlist) item.article_guid = sh.TimeDifferenceZh(item.article_time);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return artlist;
        }

        /// <summary>
        /// 获取文章列表
        /// </summary>
        /// <returns></returns>
        public IList<llm.Model.article> getArticleList(int pagesize,int pageindex)
        {
            Util.StringHelper sh = new Util.StringHelper();
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> artlist = null;
            string sql = "";
            try
            {
                sql = " and Article_status = 1 " + getQueryString(Request["q"], Request["tag"]);
                artlist = ass.GetModelListByPageUseTopForLand(pagesize, pageindex * pagesize, sql);
                foreach (var item in artlist) item.article_guid = sh.TimeDifferenceZh(item.article_time);
            }
            catch (Exception ex)
            {
                throw new Exception(sql + ex.Message);
            }
            return artlist;
        }

        /// <summary>
        /// 获取文章列表
        /// </summary>
        /// <returns></returns>
        public IList<llm.Model.article> getArticleListWithTypeList(int pagesize, int pageindex)
        {
            Util.StringHelper sh = new Util.StringHelper();
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> artlist = null;
            string sql = "";
            try
            {
                sql = " and Article_status = 1 " + getQueryStringWithTypeList(Request["q"], Request["tag"]);
                artlist = ass.GetModelListByPageUseTopForLand(pagesize, pageindex * pagesize, sql);
                foreach (var item in artlist) item.article_guid = sh.TimeDifferenceZh(item.article_time);
            }
            catch (Exception ex)
            {
                throw new Exception(sql + ex.Message);
            }
            return artlist;
        }

        public string getQueryStringWithTypeList(string query, string tag)
        {
            string _query = "";
            if (!string.IsNullOrEmpty(query))
            {
                if (tag == "name")
                {
                    _query += " and article_shut_title like '%|" + Util.SQL.NoHTMLSimple(query == "C" ? "C#" : query) + "%' ";
                }
                else if (tag.ToLower() == "tagname")
                {
                    _query += " and (Article_tag like '%" + Util.SQL.NoHTML_2(query) + "%' or Article_title like '%" + Util.SQL.NoHTML_2(query) + "%') ";
                }
                else if (tag.ToLower() == "archive")
                {
                    string[] _time = query.Split('-');
                    _query += " and year(Article_time) = " + _time[0] + " and month(Article_time) = " + _time[1];
                }
            }
            return _query;
        }

        public string getQueryString(string query,string tag) { 
            string _query = "";
            if (!string.IsNullOrEmpty(query))
            {
                if (tag == "name")
                {
                    _query += " and Article_type = (select type_id from sys_type where type_name = '" + Util.SQL.NoHTMLSimple(query == "C" ? "C#" : query) + "')";
                }
                else if (tag.ToLower() == "tagname")
                {
                    _query += " and (Article_tag like '%" + Util.SQL.NoHTML_2(query) + "%' or Article_title like '%" + Util.SQL.NoHTML_2(query) + "%') ";
                }
                else if (tag.ToLower() == "archive")
                {
                    string[] _time = query.Split('-');
                    _query += " and year(Article_time) = " + _time[0] + " and month(Article_time) = " + _time[1];
                }
            }
            return _query;
        }
        /// <summary>
        /// 分类列表
        /// </summary>
        /// <returns></returns>
        public IList<llm.Model.sys_type> getTypeList() {
            SysTypeService sts = new SysTypeService();
            IList<llm.Model.sys_type> typelist = sts.GetlListWithArticleCount("type_dict_code='article'");
            return typelist;
        } 
        /// <summary>
        /// 分类列表
        /// </summary>
        /// <returns></returns>
        public IList<llm.Model.sys_type> getTypeListWithListCount() {
            SysTypeService sts = new SysTypeService();
            IList<llm.Model.sys_type> typelist = sts.GetlListWithArticleTypeListCount("type_dict_code='article'");
            return typelist;
        } 
        
    }
}
