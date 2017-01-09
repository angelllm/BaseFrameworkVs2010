using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BaseWeb.Common;
using IBatisServer;
using System.Runtime.Serialization; 

namespace BaseWeb.Controllers
{
    public class LandController : LandTempController
    {
        // GET: /Index/


        public ActionResult Love()
        {
            v.Display("love.htm");
            return View();
        }
        public ActionResult Bootstrap()
        {
            v.Display("bootstrap.htm");
            return View();
        }


        public ContentResult Index(int? id)
        {
            GetRightCommonData();
            if (Request.IsAjaxRequest())
            {
                v.Display("include/pjax/index-pjax.htm");
            }
            else
            {
                v.Display("index.htm");
            }
            return Content("");
        }

        public void GetRightCommonData()
        {
            commiteService cs = new commiteService();
            IList<llm.Model.commite> clist = cs.GetTopList(10);
            ArticleTagService ats = new ArticleTagService();
            IList<llm.Model.article_tag> tlist = ats.GetModelList();
            SysTypeService sts = new SysTypeService();
            IList<llm.Model.sys_type> typelist = sts.GetlListWithArticleCount("type_dict_code='article'");
            //文章归档
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> archiveslist = ass.GetArchives();
            //友情链接
            pageService ps = new pageService();
            IList<llm.Model.page> linklist = ps.GetModelListByPageUseTop(10, 10, " and page_type_id in (select type_id from sys_type where type_code='link') ");
            llm.Model.page _base = ps.GetModelByTypeCode("base");
            v.Put("base", _base);
            v.Put("archiveslist", archiveslist);
            v.Put("linklist", linklist);
            v.Put("commitelist", clist);
            v.Put("tlist", tlist);
            v.Put("typelist", typelist);
        }

        public ContentResult View(int? id)
        {
            GetRightCommonData();
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                var _split = art.article_tag.Split(',');
                string _taglist = string.Empty;
                foreach (var item in _split)
                {
                    _taglist += "<a class=\"pjax\" href=\"/land/list-0-0-0-" + item + "/\" rel=\"tag\">" + item + "</a>";
                }
                v.Put("taglist", _taglist);
                //因为用pjax会产生两个请求 
                //一个是原来的普通请求
                //第二个是通过pjax的ajax请求 
                //所以会重复ass.Update(art);
                //这样就可以防止F5刷新会更新两次的情况
                if (Request.UrlReferrer + "" == Request.Url + "")
                {
                    art.article_pv++;
                    ass.Update(art);
                }
                else
                {
                    if (Request.IsAjaxRequest())
                    {
                        art.article_pv++;
                        ass.Update(art);
                    }
                }
            }
            else
            {
                Response.Redirect("/land/error/");
            }
            Util.StringHelper sh = new Util.StringHelper();
            //设置时间
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
            art.commite_count = commiteforlist.Count;
            v.Put("commiteforlist", commiteforlist);
            v.Put("art", art);
            v.Put("prevnext", prevnext);
            v.Put("clist", clist);
            v.Put("alist", alist);
            if (Request.IsAjaxRequest())
            {
                v.Display("include/pjax/item-pjax.htm");
            }
            else
            {
                v.Display("item.htm");
            }

            return Content("");
        }

        public JsonResult GetList(int pagesize, int pageindex, string w)
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            string strwhere = string.Empty;
            //if (Request.IsAjaxRequest())
            //{
            #region IsAjaxRequest
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> list = null;
            try
            {
                Util.StringHelper sh = new Util.StringHelper();

                if (!string.IsNullOrEmpty(w))
                {
                    w = Server.HtmlDecode(w);
                    string[] _split = w.Replace("/land/", "").Replace("/", "").Split('-');
                    if (w.Contains("music"))
                    {
                        strwhere = "and Article_type = (select type_id from sys_type where type_code ='music' and type_status = 1)";
                    }
                    else if (_split.Length >= 5)
                    {
                        string id = _split[1];//分页
                        string typeid = _split[2];//类别
                        string time = _split[3];//归档
                        string tag = _split[4];//tag
                        if (id != "0")
                        {
                            pageindex = Convert.ToInt32(id);
                        }
                        if (typeid != "0")
                        {
                            strwhere = "and Article_type = " + typeid;
                        }
                        if (time != "0")
                        {
                            string[] _time = time.Split('.');
                            strwhere = "and year(Article_time) = " + _time[0] + " and month(Article_time) = " + _time[1];
                        }
                        if (tag != "0")
                        {
                            strwhere = "and (Article_tag like '%" + tag + "%' or Article_title like '%" + tag + "%') ";
                        }

                    }
                    else
                    {
                        if (w != "/land/list/")
                        {
                            int _temp = 0;
                            int.TryParse(w, out _temp);
                            if (_temp != 0)
                            {
                                pageindex = _temp;
                            }
                        }

                    }
                    //strwhere = "";
                }
                list = ass.GetModelListByPageUseTopForLand(pagesize, pageindex * pagesize, " and Article_status = 1   " + strwhere);
                foreach (var item in list) item.article_guid = sh.TimeDifferenceZh(item.article_time);
            }
            catch
            {
                Response.Redirect("/land/error/");
            }
            jr.Data = list;
            #endregion
            //}
            //else {
            //    jr.Data = "臭小子，干吗，扒代码吗？no no no 这是不允许的！";
            //} 
            return jr;
        }


        //public static Object JosnToObj(String json, Type t)
        //{
        //    //System.Runtime.Serialization.data
        //    //System.Runtime.Serialization.Json.DataContractJsonSerializer s = new System.Runtime.Serialization.Json.DataContractJsonSerializer();
        //    //DataContractJsonSerializer
        //}

        public JsonResult GetTopList(int pagesize, int pageindex, string w)
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            //if (Request.IsAjaxRequest())
            //{
            #region IsAjaxRequest
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> list = null;
            try
            {
                Util.StringHelper sh = new Util.StringHelper();
                list = ass.GetModelListByPageUseTopForLand(pagesize, pageindex * pagesize, " and Article_status = 1 and Article_is_top = 1  ");
                foreach (var item in list) item.article_guid = sh.TimeDifferenceZh(item.article_time);
            }
            catch (Exception ex)
            {
                Response.Redirect("/land/error/");
            }
            jr.Data = list;
            #endregion
            //}
            //else
            //{
            //    jr.Data = "臭小子，干吗，扒代码吗？no no no 这是不允许的！";
            //}

            return jr;
        }

        public ContentResult List(int? id, int? typeid, string archiveTime, string tag)
        {
            GetRightCommonData();

            #region put title and put pageinfo url
            string _urlwithparama = "-" + (typeid == null ? 0 : typeid) + "-" + (string.IsNullOrEmpty(archiveTime) ? "0" : archiveTime) + "-" + (string.IsNullOrEmpty(tag) ? "0" : tag);
            v.Put("url", _urlwithparama);
            string path = Request.Url.LocalPath;
            v.Put("uri", Server.HtmlEncode(path));
            string _title = string.Empty;
            if (typeid != null && typeid != 0)
            {
                SysTypeService sts = new SysTypeService();
                llm.Model.sys_type st = sts.GetModelById((int)typeid);
                if (st != null)
                {
                    _title = st.type_name;
                }
            }
            else if (archiveTime != "0" && !string.IsNullOrEmpty(archiveTime))
            {
                _title = archiveTime.Replace(".", "年") + "月归档";
            }
            else if (tag != "0" && !string.IsNullOrEmpty(tag))
            {
                _title = tag;
            }
            else
            {
                _title = "文章列表";
            }
            v.Put("title", _title);

            #endregion

            if (Request.IsAjaxRequest())
            {
                v.Display("include/pjax/list-pjax.htm");
            }
            else
            {
                v.Display("list.htm");
            }
            return Content("");

        }

        public JsonResult AddLive(int? id)
        {
            JsonResult jr = new JsonResult();
            string strwhere = string.Empty;
            if (Request.IsAjaxRequest())
            {
                ArticleService ass = new ArticleService();
                try
                {
                    llm.Model.article art = ass.GetModelById((int)id);
                    if (art != null)
                    {
                        art.article_like++;
                        ass.UpdateLike(art);
                    }
                }
                catch
                {
                    Response.Redirect("/land/error/");
                }
                jr.Data = "ok";
            }
            else
            {
                jr.Data = "臭小子，干吗，扒代码吗？no no no 这是不允许的！";
            }
            //jr.Data = strwhere;
            return jr;
        }

        public JsonResult Commite(int? id)
        {
            JsonResult jr = new JsonResult();
            string strwhere = string.Empty;
            if (Request.IsAjaxRequest())
            {
                commiteService css = new commiteService();
                try
                {
                    llm.Model.commite cc = new llm.Model.commite();
                    int aid = (int)id;
                    int uid = 0;
                    int refid = Convert.ToInt32(Request["commite_ref_id"]);
                    string content = Request["comment"];
                    string uname = !string.IsNullOrEmpty(Request["commite_uname"]) ? Request["commite_uname"] : "匿名用户";
                    string commite_email = Request["commite_email"];
                    string commite_url = Request["commite_url"];
                    cc.commite_article_id = aid;
                    cc.commite_content = content;
                    cc.commite_email = commite_email;
                    cc.commite_ip = Util.getIP.GetUserIP();
                    cc.commite_ref_id = refid;
                    cc.commite_status = 0;
                    cc.commite_time = DateTime.Now;
                    cc.commite_uid = uid;
                    cc.commite_uhead = Request["commite_uhead"];
                    if (uname != "匿名用户")
                    {
                        memberService ms = new memberService();
                        llm.Model.member m = ms.GetModelByName(Util.Cookie.getUidByCookie());
                        if (m != null)
                        {
                            cc.commite_uid = m.member_id;
                            cc.commite_status = 1;
                        }
                    }

                    cc.commite_uname = uname;
                    cc.commite_url = commite_url;
                    css.Add(cc);
                }
                catch
                {
                    Response.Redirect("/land/error/");
                }
                jr.Data = "ok";
            }
            else
            {
                jr.Data = "臭小子，干吗，扒代码吗？no no no 这是不允许的！";
            }
            return jr;
        }

        public JsonResult TopList()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
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

        public JsonResult NearList()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            #region 通用分页
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ass = new ArticleService();
            jr.Data = ass.GetModelListByPageUseTopForLand(5, 1 * 5, "and article_status = 1");
            return jr;
            #endregion

        }



        public JsonResult LinkList()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            #region 通用分页
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            pageService ps = new pageService();
            jr.Data = ps.GetModelListByPageUseTop(10, 10, " and page_type_id in (select type_id from sys_type where type_code='link') ");
            return jr;
            #endregion
        }


        public JsonResult NavList()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            SysTypeService sts = new SysTypeService();
            jr.Data = sts.GetModelList("type_dict_code = 'article' and type_id != 73 ");

            return jr;
        }

        public JsonResult TypeList()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            SysTypeService sts = new SysTypeService();
            jr.Data = sts.GetlListWithArticleCount("type_dict_code='article'");

            return jr;
        }

        public JsonResult WebBase()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            llm.Model.webbase wb = new llm.Model.webbase();
            ArticleService ass = new ArticleService();
            #region 网站基数
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
            #endregion
            jr.Data = wb;

            return jr;
        }

        public JsonResult GetArchives()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ass = new ArticleService();
            jr.Data = ass.GetArchives();
            return jr;
        }

        public JsonResult ListCount()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
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
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleTagService ats = new ArticleTagService();
            IList<llm.Model.article_tag> taglist = ats.GetModelList();
            jr.Data = taglist;
            return jr;
        }

        public JsonResult CommiteList()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
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
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            ArticleService ats = new ArticleService();
            IList<llm.Model.article> list = ats.GetModelListByPage3("select top 5 *, NewID() as random,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count from sys_article where article_status = 1 order by random ");
            jr.Data = list;
            return jr;
        }

        public ContentResult About(int? id)
        {
            GetRightCommonData();
            if (Request.IsAjaxRequest())
            {
                v.Display("include/pjax/about-pjax.htm");
            }
            else
            {
                v.Display("about.htm");
            }
            return Content("");
        }

        public JsonResult Login()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            memberService mss = new memberService();

            llm.Model.member m = mss.GetModelByName(Util.SQL.NoHTML_2(Request["uname"]));
            if (m != null)
            {
                if (Util.MD5Reg.formatePwd(Request["upwd"]) == m.member_pwd)
                {
                    if (m.member_status == 1)
                    {
                        jr.Data = "[{'code':'1','uname':'" + m.member_name + "','uface':'" + m.member_face + "'}]";
                        Util.Cookie.setCode(m.member_name + "|" + m.member_face);
                    }
                    else
                    {
                        jr.Data = "[{'code':'0','msg':'账户存在异常请联系管理员'}]";
                    }

                }
                else
                {
                    jr.Data = "[{'code':'0','msg':'用户名或者密码错误'}]";
                }
            }
            else
            {
                jr.Data = "[{'code':'0','msg':'用户名不存在'}]";
            }
            //jr.Data = list;
            return jr;
        }


        public JsonResult loginout()
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            Util.Cookie.clearLogin();
            jr.Data = "[{'code':'-1','msg':'clear'}]";

            return jr;
        }

        public ContentResult Music(int? id)
        {
            GetRightCommonData();
            if (Request.IsAjaxRequest())
            {
                v.Display("include/pjax/music-pjax.htm");
            }
            else
            {
                v.Display("music.htm");
            }
            return Content("");
        }

        public ActionResult Item(int? id)
        {
            Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:9898");
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

        public ActionResult Error()
        {
            GetRightCommonData();
            v.Display("404.htm");
            return View();
        }

        public void getParse()
        {

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
