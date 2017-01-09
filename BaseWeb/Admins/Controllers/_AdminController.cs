using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Admins.Common;
using System.Collections; 
using IBatisServer;
using llm.Model;
using System.Data;
using LLM.Util.Tools;

namespace Admins.Controllers
{
    public class _AdminController : BaseController
    {
        IconService iss = null;
        SysTypeService ts = null;
        public _AdminController()
        {
            iss = new IconService();
            ts = new SysTypeService();
        }

        #region 会员管理
        /// <summary>
        /// /Admin/MemberList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult MemberList(int? id)
        {
            memberService css = new memberService();
            #region 通用分页
            string url = "/Admin/MemberList/";
            string strwhere = "[sys_member]    ";

            //通用分页  
            int pageindex = 1, pagesize = 10;
            pageindex = id != null ? (int)id * pagesize : pagesize;
            /*通用型sql 分页 满足 access sql2000 sql05 sql08 
            * 创建条件sql搜索满足要求的总数量 
            * 需要传入表名 
            * 表名后可加入搜索条件
            */
            string sqlCount = PagingHelper.CreateJoinCountingSql(strwhere);
            int rows = css.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "member_id desc", "*");
            //v.Put("sql", PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(content_id) from sys_article_content where content_article_id = article_id) as content_count"));

            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url);
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.member> list = css.GetModelListByPage(sql);
            v.Put("list", list);
            #endregion
            #region 过期的方法

            
            //int startIndex = 1, pagesize = string.IsNullOrEmpty(Request["pagesize"]) ? 10 : Convert.ToInt32(Request["pagesize"]), endIndex = pagesize;
            //if (id != null)
            //{
            //    endIndex = (int)id * pagesize;
            //    startIndex = endIndex - pagesize + 1;
            //}

            
            //string sql = " SELECT * FROM (" +
            //                 "SELECT ROW_NUMBER() OVER(" +
            //                 "order by T.member_id desc" +
            //                 ")AS Row, T.* from sys_member T LEFT JOIN UserCard as uc on T.member_id =  uc.card_mid " +
            //                 "WHERE 1 = 1 " +
            //                 //strwhere +

            //                  ") TT " +
            //                 "WHERE TT.Row between " + startIndex + " and " + endIndex + " ";

            //IList<member> list = css.GetModelListByPage(sql);
            //Util.llmPage lp = new Util.llmPage(css.GetCount(), pagesize, id == null ? 0 : (int)id, "/Admin/MemberList/");
            //v.Put("pageinfo", lp.Contents);
            //v.Put("list", list);
            #endregion

            v.Display("Manage/MemberManage/MemberList.cshtml");
            return View();

        }

        public JsonResult MemberCard(int?id) {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            UserCardService ucs = new UserCardService();
            userCard uc = ucs.GetModelByMid((int)id);
            jr.Data = uc;
            return jr;
        }

        /// <summary>
        /// /Admin/MemberList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult MemberAdd()
        {
            IList<sys_type> typelist = ts.GetModelList("type_parent = 68");
            v.Put("typelist", typelist);
            v.Display("Manage/MemberManage/MemberAdd.cshtml");
            return View();

        }

        /// <summary>
        /// /Admin/DoMemberAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string DoMemberAdd()
        {
            string html = "";
            int typeid = Convert.ToInt32(Request["typeid"]);
            sys_type st = ts.GetModelById(typeid);

            memberService ms = new memberService(); 
            UserCardService ucs = new UserCardService();
            userCard uc = new userCard();
            //add member
            member m = ms.GetModelByPhone(Request["name"]);
            if (m!=null)
            {
                html = "此账号已存在！";
                return html;
            }
            m = new member();
            m.member_level = typeid;
            m.member_name = Request["name"];
            m.member_phone = Request["phone"];
            m.member_pwd = Util.MD5Reg.formatePwd(Request["pwd"]);
            m.member_status = Convert.ToInt32(Request["status"]);
            m.member_type = st.type_name; 
            int mid = ms.Add(m);
            //add member card info
            m.member_id = mid;//设置ID 用于更新用户积分
            uc.card_mid = mid;
            
            uc.card_mname = m.member_name;
            uc.card_start_time = DateTime.Now;
            uc.card_status = 0;//0:没有领取免费权限 1:可以领取 -1:卡失效
            uc.card_type = typeid.ToString();//卡类型
            uc.card_name = st.type_name;//记录卡名
            uc.card_num = "C" + m.member_name;
            if (st.type_name == "樱花卡")
            {
                uc.card_total_count = 10;
                uc.card_is_count = 1;
                uc.card_price = 150;
            }
            else if (st.type_name == "牡丹卡")
            {
                uc.card_total_count = 20;
                uc.card_is_count = 1;
                uc.card_price = 260;
            }
            else if (st.type_name == "月卡")
            {
                uc.card_total_count = -1;
                uc.card_is_count = 0;
                uc.card_end_time = uc.card_start_time.Value.AddDays(31);
                uc.card_price = 150;
            }
            else if (st.type_name == "季度卡")
            {
                uc.card_total_count = -1;
                uc.card_is_count = 0;
                uc.card_end_time = uc.card_start_time.Value.AddDays(91);
                uc.card_price = 300;
            }
            uc.card_remark = st.type_detail;
            uc.card_count = 0;
            uc.card_ative_count = 0;
            ucs.Add(uc);
            //更新积分
            m.member_integral = int.Parse((uc.card_price / 10).ToString());
            ms.Update(m);//积分 = 充值价格 / 10  即：300块30积分 满一百沙画任选
            html = "ok";
            return html;

        }

        #endregion

        #region shop新闻
        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult NewsEditDo(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                art.article_content = Request["article_content"];
                art.article_is_top = Convert.ToBoolean(Request["article_is_top"]);
                art.article_ref_url = Request["article_ref_url"];
                art.article_remark = Request["article_remark"];
                art.article_seo_desc = Request["article_seo_desc"];
                art.article_seo_kw = Request["article_seo_kw"];
                art.article_shut_title = Request["article_shut_title"];
                art.article_source = Request["article_source"];
                int article_status = 0;
                int.TryParse(Request["article_status"], out article_status);
                art.article_status = article_status;
                art.article_summary = Request["article_summary"];
                art.article_tag = Request["article_tag"];
                art.article_title = Request["article_title"];
                string[] color_split = Request["article_title_color"].Split(',');
                art.article_title_color = color_split[0];
                //string[] type_split = Request["article_type"].Split('|');
                int article_type = 0;
                int.TryParse(Request["article_type"], out article_type);
                art.article_type = article_type;
                art.article_image = Request["hfImage"];
                //修改单篇文章
                ass.Update(art);
            }
            Response.Redirect("/Admin/NewsList/");

            return View();
        }

        [AdminLoginCheck]
        public ActionResult NewsEdit(int? id)
        {

            v.Put("list", BindlimitedClass(" type_parent = 73 "));
            initPageLeft("article");
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                v.Put("item", art);
                ArticleTagService ats = new ArticleTagService();
                IList<article_tag> taglist = ats.GetModelList();
                v.Put("taglist", taglist);
                v.Display("Manage/ArticleManage/NewsEdit.cshtml");
            }
            return View();
        }


        [AdminLoginCheck]
        public string NewsStop(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                art.article_status = 0;
                ass.Update(art);
            }
            return "ok";
        }


        [AdminLoginCheck]
        public string NewsDel(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            ass.Delete(art);
            return "ok";
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult NewsAddDo()
        {

            llm.Model.article art = new article();
            art.article_cid = 0;
            art.article_content = Request["article_content"];
            art.article_guid = Guid.NewGuid().ToString();
            art.article_html_url = "";
            art.article_image = Request["hfImage"];
            art.article_is_bold = false;
            art.article_is_italic = false;
            art.article_is_top = Convert.ToBoolean(Request["article_is_top"]);
            Random rd = new Random();
            art.article_pv = rd.Next(10,100);
            art.article_ref_url = Request["article_ref_url"];
            art.article_remark = Request["article_remark"];
            art.article_seo_desc = Request["article_seo_desc"];
            art.article_seo_kw = Request["article_seo_kw"];
            art.article_shut_title = Request["article_shut_title"];
            art.article_source = Request["article_source"];
            int article_status = 0;
            int.TryParse(Request["article_status"], out article_status);
            art.article_status = article_status;
            art.article_summary = Request["article_summary"];
            art.article_tag = Request["article_tag"];
            art.article_time = DateTime.Now;
            art.article_title = Request["article_title"];
            string[] color_split = Request["article_title_color"].Split(',');
            art.article_title_color = color_split[0];
            //string[] type_split = Request["article_type"].Split('|');
            int article_type = 0;
            int.TryParse(Request["article_type"], out article_type);
            art.article_type = article_type;

            ArticleService ass = new ArticleService();
            //添加单篇文章
            ass.Add2(art);
            Response.Redirect("/Admin/NewsList/");
            return View();
        }


        /// <summary>
        /// /Admin/ArticleAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult NewsAdd()
        {
            v.Put("list", BindlimitedClass(" type_parent = 73"));
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("sh", sh);
            initPageLeft("article");

            v.Display("Manage/ArticleManage/NewsAdd.cshtml");
            return View();
        }


        /// <summary>
        /// /Admin/ArticleManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult NewsList(int? id)
        {
            ArticleService ass = new ArticleService();
            #region 通用分页
            string url = "/Admin/NewsList/";
            string strwhere = "[sys_article] as art left join sys_type as ty on art.article_type = ty.type_id where type_parent = 73 ";
            
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
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(content_id) from sys_article_content where content_article_id = article_id) as content_count");
            //v.Put("sql", PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(content_id) from sys_article_content where content_article_id = article_id) as content_count"));

            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url);
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.article> list = ass.GetModelListByPage(sql);
            v.Put("list", list);
            #endregion
            initPageLeft("article");
            v.Display("Manage/ArticleManage/NewsList.cshtml");
            return View();

        

        }
        #endregion

        #region 评论、留言

        /// <summary>
        /// /Admin/CommiteDel/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string CommiteDel(int? id)
        {
            string outhtml = "ok";
            commiteService css = new commiteService();
            llm.Model.commite c = css.GetModelById((int)id);
            css.Delete(c);
            return outhtml;
        }

        /// <summary>
        /// /Admin/CommiteStatus/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string CommiteStatus(int? id)
        {
            string outhtml = "ok";
            commiteService css = new commiteService();
            llm.Model.commite c = css.GetModelById((int)id);
            c.commite_status = c.commite_status == 1 ? 0 : 1;
            css.Update(c);
            return outhtml;
        }

        /// <summary>
        /// /Admin/CommiteManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult CommiteReplyDo()
        {
            commiteService css = new commiteService();
            llm.Model.commite c = new commite();
            c.commite_content = Request["commite_content"];
            c.commite_ip = Util.getIP.GetUserIP();
            c.commite_ref_id = Convert.ToInt32(Request["commite_ref_id"]);
            c.commite_status = Convert.ToInt32(Request["commite_status"]);
            c.commite_time = DateTime.Now;
            c.commite_uhead = "/Template/Html/images/head.jpg";
            c.commite_uname = "";
            css.Add2(c);
            Response.Redirect("/Admin/CommiteManage/");
            return View();

        }
        /// <summary>
        /// /Admin/CommiteManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult CommiteReply(int? id)
        {
            #region 通用分页
            commiteService css = new commiteService();
            llm.Model.commite c = css.GetModelById((int)id);
            if (c != null)
            {
                v.Put("model", c);
                IList<llm.Model.commite> list = css.GetModelList(" commite_ref_id = " + c.commite_id + " order by commite_id asc");
                v.Put("list", list);
            }
            #endregion
            v.Display("Manage/CommiteManage/CommiteReply.cshtml");
            return View();

        }
        
        /// <summary>
        /// /Admin/CommiteManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult CommiteManage(int? id)
        {
            #region 通用分页
            commiteService css = new commiteService();
            string strwhere = "[sys_commite] where  commite_ref_id = 0  ";
            //通用分页  
            int pageindex = 1, pagesize = 10;
            pageindex = id != null ? (int)id * pagesize : pagesize; 
            /*通用型sql 分页 满足 access sql2000 sql05 sql08 
            * 创建条件sql搜索满足要求的总数量 
            * 需要传入表名 
            * 表名后可加入搜索条件
            */
            string sqlCount = PagingHelper.CreateCountingSql(strwhere);
            int rows = css.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "commite_id desc");
            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, "/Admin/CommiteList/");
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.commite> list = css.GetModelListByPage(sql);
            //foreach (var item in list) item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
            v.Put("clist", list);
            #endregion
            v.Display("Manage/CommiteManage/CommiteList.cshtml");
            return View();

        }
        #endregion

        #region 对话框样式
        /// <summary>
        /// /Admin/WinStyle/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string WinStyle()
        {
            string outhtml = "ok";
            string skin = Request["style"];
            configService cs = new configService();
            llm.Model.config config =  cs.GetModelByCode("skin");
            config.config_value = skin;
            cs.Update(config);
            return outhtml;
        }
        

        #endregion

        #region 索引生成与配置
        /// <summary>
        /// /Admin/SearchManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult SearchManage()
        {  
            v.Display("Manage/SearchManage/Search.cshtml");
            return View();
        }
        
        /// <summary>
        /// /Admin/SearchIndex/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string SearchIndex()
        {
            string outhtml = "ok";
            Util.LuceneHelper lh = new Util.LuceneHelper();
            lh.CreateIndex(true);
         
            return outhtml;
        }
        

        #endregion

        #region 静态化
        /// <summary>
        /// /Admin/IndexHtml/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult IndexHtml()
        { 
            IList<files> flist = new List<files>();
            string path = Server.MapPath("/index.html");
            System.IO.FileInfo info = new System.IO.FileInfo(path);
            if (info.Exists)
            {
                files f = new files();
                f.Name = info.Name;
                f.Path = "/index.html";
                f.FileSize = FileHelper.GetFileSizeByKB(info.FullName);
                f.FileType = FileHelper.GetExtension(info.FullName).Replace(".", "");
                f.Time = info.CreationTime;
                f.Modifytime = info.LastWriteTime;
                flist.Add(f);
            }  
            //目录下的文件夹包括目录下的文件
            //目录下的文件
            v.Put("flist", flist);
            v.Display("Manage/HtmlManage/IndexHtml.cshtml");

            return View();
        }
        /// <summary>
        /// /Admin/IndexHtmlFile/
        /// 生成首页静态页面/index.html
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string IndexHtmlFile()
        {
            string outhtml = "ok";
            v.Init("/Template/html/");//一定要init下 不然找不到目录很是蛋疼 - -!
            /****在这里设置页面需要的参数*****/
            //same parame
            ArticleService ass = new ArticleService();
            IList<llm.Model.article> list = ass.GetTopModelList(10);
            v.Put("list", list);
            //SysTypeService sts = new SysTypeService();
            v.Put("cur", "");
            v.Put("articl", "");
            v.Put("pageinfo", "");

            ArticleTagService ats = new ArticleTagService();
            IList<llm.Model.article_tag> taglist = ats.GetModelList();
            v.Put("taglist", taglist);

            commiteService css = new commiteService();
            IList<llm.Model.commite> clist = css.GetModelList("commite_status = 1 order by commite_id desc");
            foreach (var item in clist) item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
            v.Put("clist", clist);
            v.Put("count", clist.Count());
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("shelper", sh);

            configService cs = new configService();
            pageService ps = new pageService();
            SysTypeService ts = new SysTypeService();
            IList<llm.Model.config> cclist = cs.GetModelList("config_status = 1");
            configs config = new configs(cclist);
            IList<llm.Model.sys_type> tlist = ts.GetModelList2("type_status = 1");
            configs tconfig = new configs(tlist);
            IList<llm.Model.page> plist = ps.GetModelList("page_status = 1");
            configs pconfig = new configs(plist);
            v.Put("path", "/Template/Html");
            v.Put("json", config);
            v.Put("tjson", tconfig);
            v.Put("pjson", pconfig);
            v.Put("q", "");
            // and so so
            /********设置参数结束***********/

            v.CreateHtml("blog.html", "/", "index.html");


            return outhtml;
        }
        public class configs
        {
            IList<llm.Model.config> list;
            IList<llm.Model.page> plist;
            IList<llm.Model.sys_type> tlist;

            public IList<llm.Model.sys_type> Tlist
            {
                get { return tlist; }
                set { tlist = value; }
            }

            public IList<llm.Model.page> Plist
            {
                get { return plist; }
                set { plist = value; }
            }

            public IList<llm.Model.config> List
            {
                get { return list; }
                set { list = value; }
            }


            public configs() { }
            public configs(IList<llm.Model.config> list)
            {
                this.List = list;
            }
            public configs(IList<llm.Model.page> plist)
            {
                this.Plist = plist;
            }
            public configs(IList<llm.Model.sys_type> tlist)
            {
                this.Tlist = tlist;
            }
            public string config(string key)
            {
                string outhtml = "";
                foreach (var item in List)
                {
                    if (item.config_code == key)
                    {
                        outhtml = item.config_value; break;
                    }
                }
                return outhtml;
            }

            public IList<llm.Model.sys_type> tconfig(string key)
            {
                IList<llm.Model.sys_type> outhtml = new List<llm.Model.sys_type>();
                foreach (var item in Tlist)
                {
                    if (item.type_code == key || item.type_dict_code == key)
                    {
                        outhtml.Add(item);
                    }
                }
                return outhtml;
            }

            public IList<llm.Model.page> pconfig(int tid)
            {
                IList<llm.Model.page> outhtml = new List<llm.Model.page>();
                foreach (var item in Plist)
                {
                    if (item.page_type_id == tid)
                    {
                        outhtml.Add(item);
                    }
                }
                return outhtml;
            }
        }
        /// <summary>
        /// /Admin/HtmlManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult HtmlManage(int? id)
        { 
            IList<files> flist = new List<files>();
            configService cs = new configService();
            config config = cs.GetModelByCode("html"); 
            string path = Server.MapPath(config.config_value);
            v.Put("path", config.config_value);
            System.IO.DirectoryInfo vDirectoryInfo = new System.IO.DirectoryInfo(path);
            if (vDirectoryInfo.Exists)
            {  
                //获取文件
                string[] files = FileHelper.GetFileNames(path);
                foreach (var file in files)
                {
                    files f = getFile(config, file);
                    flist.Add(f);
                }
            }
            //目录下的文件夹包括目录下的文件
            //目录下的文件
            v.Put("flist", flist);
            v.Display("Manage/HtmlManage/HtmlList.cshtml");

            return View();
        }
        /// <summary>
        /// /Admin/ClearFile/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string ClearFile()
        {
            string outhtml = "ok";
            string path = Request["url"];
            System.IO.DirectoryInfo info = new System.IO.DirectoryInfo(Server.MapPath(path));
            if (info.Exists)
            {
                try
                {
                    foreach (var item in info.GetFiles())
                    {
                        item.Delete();
                    }
                }
                catch
                {
                    outhtml = "操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.文件正在被使用 <br>3.目录不存在,或者已被移动!";
                }
            }
            else {
                outhtml = "目录不存在,或者已被移动!" ;
            }
            
            return outhtml;
        }

        /// <summary>
        /// /Admin/MLModify/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string MLModify()
        {
            string outhtml = "ok";
            string name = Request["name"];
            configService cs = new configService();
            llm.Model.config config = cs.GetModelByCode("html");
            if (config!=null)
            {
                config.config_value = "/" + name + "/";
                cs.Update(config);
            }
            return outhtml;
        }
        
        
        #endregion

        #region 模板编辑
        //
        /// <summary>
        /// /Admin/OnlineList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult OnlineList(int? id)
        {
            if (User.Identity.Name == "llm")
            {
                IList<directories> dprelist = new List<directories>();
                IList<directories> dlist = new List<directories>();
                IList<files> flist = new List<files>();
                configService cs = new configService();
                config config = cs.GetModelByCode("prev");
                config.config_value = "/Template/";
                v.Put("path", config.config_value);
                string src = Request["src"];
                string path = Server.MapPath(config.config_value);
                string curpath = config.config_value;
                System.IO.DirectoryInfo vDirectoryInfo = new System.IO.DirectoryInfo(path);
                Util.dirHelper h = new Util.dirHelper();
                v.Put("dirlist", h.AllMl(vDirectoryInfo, 0, "", config.config_value));
                if (!string.IsNullOrEmpty(src))
                { 
                    path = Server.MapPath(src);
                    vDirectoryInfo = new System.IO.DirectoryInfo(path);
                    curpath = src;
                }
                v.Put("curpath", curpath); 
                foreach (System.IO.DirectoryInfo item in vDirectoryInfo.GetDirectories())
                {
                    directories d = getDirectory(config, item );
                    dlist.Add(d);
                }
                //获取文件
                string[] files = FileHelper.GetFileNames(path);
                foreach (var file in files)
                {
                    files f = getFile(config, file);
                    flist.Add(f);
                } 
                //目录下的文件夹包括目录下的文件
                v.Put("direct", dlist);
                //目录下的文件
                v.Put("flist", flist);
                v.Display("Manage/TempManage/OnlineList.cshtml");
            }
            else {
                Response.Redirect("/admin/login/");
            }
            return View();
        }

        

        /// <summary>
        /// /Admin/ML/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string ML()
        {
            string outhtml = "ok";
            string path = Request["url"];
            string name = Request["name"];
            System.IO.DirectoryInfo info = new System.IO.DirectoryInfo(Server.MapPath(path));
            if (info.Exists)
            {
                string savepath = path.Substring(0, path.LastIndexOf("\\") + 1) + name;
                try
                {
                    info.MoveTo(Server.MapPath(savepath));
                }
                catch
                {
                    outhtml = "操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.新命名的文件夹名字已经存在 <br>3.目录不存在,或者已被移动!";
                }
            }
            else {
                outhtml = "目录不存在,或者已被移动!" ;
            }
            
            return outhtml;
        }

        /// <summary>
        /// /Admin/ModifyFile/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string ModifyFile()
        {
            string outhtml = "ok";
            string path = Request["url"];
            string name = Request["name"];
            System.IO.FileInfo info = new System.IO.FileInfo(Server.MapPath(path));
            if (info.Exists)
            {
                string savepath = path.Substring( 0 ,path.LastIndexOf("\\") + 1) + name;
                try
                {
                    info.MoveTo(Server.MapPath(savepath));
                }
                catch
                {
                    outhtml = "操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.新命名的文件名字已经存在 <br>3.文件不存在,或者已被移动!";
                }
            }
            else {
                outhtml = "文件不存在,或者已被移动!" ;
            }
            
            return outhtml;
        }
        
         /// <summary>
        /// /Admin/AddML/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string AddML()
        {
            string outhtml = "ok";
            string name = Request["name"];
            //configService cs = new configService();
            //config config = cs.GetModelByCode("prev");
            string curpath = Request["path"];//当前要添加的目录
            string path = Server.MapPath(curpath + "/" + name);
            
            if (System.IO.Directory.Exists(path))
            {
                outhtml = "当前添加的目录已经存在!";
            }
            else
            {
                try
                {
                    System.IO.Directory.CreateDirectory(path);
                }
                catch
                {
                    outhtml = "操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.新命名的文件夹名字已经存在 <br>3.目录不存在,或者已被移动!";
                }
            }
            return outhtml;
        }
        
        /// <summary>
        /// /Admin/SaveFile/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public string SaveFile()
        {
            string outhtml = "ok";
            string path = Request["url"];
            string name = Request["name"];
            string content = Request["content"];
            System.IO.FileInfo info = new System.IO.FileInfo(Server.MapPath(path));
            if (info.Exists)
            {
                string exend = FileHelper.GetExtension(info.FullName);
                string savepath = path.Substring(0, path.LastIndexOf("\\") + 1) + name ;
                try
                {
                    FileHelper.DefaultEncoding = System.Text.Encoding.UTF8;
                    info.Delete();
                    FileHelper.WriteText(Server.MapPath(savepath), content);
                }
                catch
                {
                    outhtml = "操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.新命名的文件夹名字已经存在 <br>3.目录不存在,或者已被移动!";
                }
            }
            else
            {
                outhtml = "目录不存在,或者已被移动!";
            }

            return outhtml;
        }
        /// <summary>
        /// /Admin/GetFile/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string GetFile()
        {
            string outhtml = "";
            string path = Request["url"];

            System.IO.FileInfo info = new System.IO.FileInfo(Server.MapPath(path));
            if (info.Exists)
            {

                try
                {
                    FileHelper.DefaultEncoding = System.Text.Encoding.UTF8;
                    outhtml = FileHelper.FileToString(Server.MapPath(path));
                }
                catch
                {
                    outhtml = "error:操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.目录不存在,或者已被移动!";
                }
            }
            else {
                outhtml = "error:文件不存在,或者已被移动!";
            }
            
            return outhtml;
        }

        /// <summary>
        /// /Admin/DelFile/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string DelFile()
        {
            string outhtml = "";
            string path = Server.MapPath(Request["url"]);
            System.IO.FileInfo info = new System.IO.FileInfo(path);
            if (info.Exists)
            {
                try
                {
                    info.Delete();
                }
                catch
                {
                    outhtml = "error:操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.目录不存在,或者已被移动!";
                }
            }
            else
            {
                System.IO.DirectoryInfo dinfo = new System.IO.DirectoryInfo(path);
                if (dinfo.Exists)
                {
                    try
                    {
                        Clear(path);
                    }
                    catch
                    {
                        outhtml = "error:操作出现异常,请确认:<br>1.调用方有没有所操作的权限 <br>2.目录不存在,或者已被移动!";
                    } 
                }
                else
                {
                    outhtml = "error:文件不存在,或者已被移动!";
                } 
            }
            return outhtml;
        }

        public void Clear(string dir)
        {
            if (System.IO.Directory.Exists(dir))
            {
                foreach (string d in System.IO.Directory.GetFileSystemEntries(dir))
                {
                    if (System.IO.File.Exists(d))
                        System.IO.File.Delete(d);
                    else
                        Clear(d);
                }
                System.IO.Directory.Delete(dir);
            }
        } 

        private static directories getDirectory(config config, System.IO.DirectoryInfo item)
        {
            directories d = new directories();
            d.Name = item.Name;
            d.Path = item.FullName.Substring(item.FullName.IndexOf(config.config_value.Replace("/", "\\")));
            //d.Path = item.FullName;
            d.Time = item.CreationTime; 
            d.Modifytime = item.LastWriteTime;
            d.Filelist = new List<files>();
            foreach (var file in FileHelper.GetFileNames(item.FullName))
            {
                files f = getFile(config, file);
                d.Filelist.Add(f);
                
            }
            return d;
        }

        private static files getFile(config config, string file)
        {
            System.IO.FileInfo FileInfo = new System.IO.FileInfo(file);
            files f = new files();
            f.Name = FileInfo.Name;
            f.Path = FileInfo.FullName.Substring(FileInfo.FullName.IndexOf(config.config_value.Replace("/", "\\")));
            f.FileSize = FileHelper.GetFileSizeByKB(FileInfo.FullName);
            f.FileType = FileHelper.GetExtension(FileInfo.FullName).Replace(".", "");
            f.Time = FileInfo.CreationTime;
            f.Modifytime = FileInfo.LastWriteTime;
            return f;
        }

        #region 文件 文件夹model 
        public class directories {
            private string name;

            public string Name
            {
                get { return name; }
                set { name = value; }
            }
            private string path;

            public string Path
            {
                get { return path; }
                set { path = value; }
            }
            private int isHasDirect;

            public int IsHasDirect
            {
                get { return isHasDirect; }
                set { isHasDirect = value; }
            }
            private int isHasFile;

            public int IsHasFile
            {
                get { return isHasFile; }
                set { isHasFile = value; }
            }

            private DateTime time;

            public DateTime Time
            {
                get { return time; }
                set { time = value; }
            }
            private DateTime modifytime;

            public DateTime Modifytime
            {
                get { return modifytime; }
                set { modifytime = value; }
            }

            private IList<files> filelist;

            public IList<files> Filelist
            {
                get { return filelist; }
                set { filelist = value; }
            }

            private int depth;

            public int Depth
            {
                get { return depth; }
                set { depth = value; }
            }
        }

        public class files
        {
            private string name;

            public string Name
            {
                get { return name; }
                set { name = value; }
            }
            private string path;

            public string Path
            {
                get { return path; }
                set { path = value; }
            }
            private string fileType;

            public string FileType
            {
                get { return fileType; }
                set { fileType = value; }
            }
            private string fileSize;

            public string FileSize
            {
                get { return fileSize; }
                set { fileSize = value; }
            }

            private DateTime time;

            public DateTime Time
            {
                get { return time; }
                set { time = value; }
            }
            private DateTime modifytime;

            public DateTime Modifytime
            {
                get { return modifytime; }
                set { modifytime = value; }
            }
            
        }
        #endregion

        #endregion

        #region 页面设置

        /// <summary>
        /// /Admin/PageList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult PageList(int? id)
        { 
            pageService pss = new pageService();
             
            #region 通用分页 
            string url = "/Admin/PageList/";
            string strwhere = "[sys_page] where 1=1 ";
            if (!string.IsNullOrEmpty(Request["t"]))
            {
                strwhere += " and page_type_id = " + Convert.ToInt32(Request["t"]);
                url += "?t=" + Request["t"] + "&id=";
                llm.Model.sys_type st = ts.GetModelById(Convert.ToInt32(Request["t"]));
                v.Put("st", st);
            }
            //通用分页  
            int pageindex = 1, pagesize = 10;
            pageindex = id != null ? (int)id * pagesize : pagesize;
            /*通用型sql 分页 满足 access sql2000 sql05 sql08 
            * 创建条件sql搜索满足要求的总数量 
            * 需要传入表名 
            * 表名后可加入搜索条件
            */
            string sqlCount = PagingHelper.CreateCountingSql(strwhere);
            int rows = pss.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "page_order asc,page_id desc");
            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url);
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.page> list = pss.GetModelListByPage(sql);
            v.Put("list", list);
            #endregion 
            
            initPageLeft("page");
            v.Put("id", id);
            v.Display("Manage/PageManage/PageList.cshtml");
            return View();
        }

        public void initPageLeft(string type_dict_code)
        {
            IList<llm.Model.sys_type> typelist = ts.GetModelList("type_dict_code = '" + type_dict_code + "' and type_status = 1 ");
            v.Put("typelist", typelist);
        }
        /// <summary>
        /// /Admin/PageAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult PageAdd(int? id)
        {
             
            if (id != null)
            {
                v.Put("id", id + "/");
                llm.Model.sys_type st = ts.GetModelById((int)id);
                if (st != null)
                {
                    v.Put("val", st.type_id + "|" + st.type_position);
                    v.Put("ty", st);
                }
            }
            v.Put("model", new llm.Model.page());
            initPageLeft("page");
            v.Display("Manage/PageManage/PageAdd.cshtml");
            return View();
        }
        /// <summary>
        /// /Admin/PageEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult PageEdit(int? id)
        {  
            pageService pss = new pageService();
            llm.Model.page page =null;
            if (id!=null)
            {
                page = pss.GetModelById((int)id);
            }
            else if (!string.IsNullOrEmpty(Request["t"])) {
                IList<llm.Model.page> pagelist = pss.GetModelList("page_type_id=" + Request["t"]);
                if (pagelist.Count > 0)
                {
                    page = pagelist[0];
                }
            } 
            if (page != null)
            {
                v.Put("id", page.page_type_id + "/");
                llm.Model.sys_type st = ts.GetModelById((int)page.page_type_id);
                if (st != null)
                {
                    v.Put("val", st.type_id + "|" + st.type_position);
                    v.Put("ty", st);
                }
                v.Put("model", page);
            }
            initPageLeft("page");
            v.Display("Manage/PageManage/PageEdit.cshtml");
            return View();
        }
        /// <summary>
        /// /Admin/PageEditDo/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void PageEditDo(int? id)
        {
            int tid = Convert.ToInt32(Request["page_type_id"]);
            pageService pss = new pageService();
            llm.Model.page page = pss.GetModelById(Convert.ToInt32(Request["page_id"]));
            page.page_type_id = tid;
            page.page_name = Request["page_name"];
            page.page_content = Request["page_content"];
            page.page_image = Request["hfImage"];
            page.page_remark = Request["page_remark"];
            int page_order = 0;
            int.TryParse(Request["page_order"], out page_order);
            page.page_order = page_order;
            if (!string.IsNullOrEmpty(Request["page_status"]))
                page.page_status = Convert.ToInt32(Request["page_status"]);
            page.page_title = Request["page_title"];
            page.page_description = Request["page_description"];
            page.page_keywords = Request["page_keywords"];
            page.page_url = Request["page_url"];
            if (!string.IsNullOrEmpty(Request["page_url_type"]))
                page.page_url_type = Request["page_url_type"] == "0" ? "_self" : "_blank";

            pss.Update(page);
            Response.Redirect("/Admin/PageList/?t=" + page.page_type_id);
        }
       
        /// <summary>
        /// /Admin/PageStatus/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void PageStatus(int? id)
        {
            pageService pss = new pageService();
            llm.Model.page page = pss.GetModelById(Convert.ToInt32(id));
            if (page != null)
            {
                if (!string.IsNullOrEmpty(Request["type"]))
                    page.page_url_type = page.page_url_type == "_blank" ? "_self" : "_blank";
                else { page.page_status = page.page_status == 0 ? 1 : 0; }

                pss.Update(page);
            }
        }
        /// <summary>
        /// /Admin/PageDel/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void PageDel(int? id)
        {
            string outhtml = "";
            pageService pss = new pageService();
            llm.Model.page page = pss.GetModelById(Convert.ToInt32(id));
            if (page != null)
            {
                llm.Model.sys_type st = ts.GetModelById((int)page.page_type_id);
                if (st.type_dict_code == "page" && st.type_role == "llm" && st.IsSigle == 1)
                {
                    outhtml = "<p>当前分类设置的所属分类[<span style='color:#ff0000;'>" + st.type_name + "</span>] 为系统定义,需要删除请联系管理员!</p>";
                }
                else
                {
                    pss.Delete(page);
                    outhtml = "ok";
                    try
                    {
                        if (page.page_image != "")
                        {
                            string path = Server.MapPath(page.page_image);
                            if (System.IO.File.Exists(path))
                            {
                                System.IO.File.Delete(path);
                            }
                            path = Server.MapPath(page.page_image.Replace("thumb", "source"));
                            if (System.IO.File.Exists(path))
                            {
                                System.IO.File.Delete(path);
                            }
                        }
                    }
                    catch{}
                }
            }
            Response.Write(outhtml);
        }
        /// <summary>
        /// /Admin/PageDel2/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void PageDel2(int? id)
        {
            string outhtml = "ok";
            pageService pss = new pageService();
            llm.Model.page page = pss.GetModelById(Convert.ToInt32(id));
            if (page != null)
            {
                pss.Delete(page);
            }
            Response.Write(outhtml);
        }
        /// <summary>
        /// /Admin/PageAddDo/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void PageAddDo()
        {
            int tid = Convert.ToInt32(Request["page_type_id"]);
            pageService pss = new pageService();
            llm.Model.page page = new llm.Model.page();
            page.page_content = Request["page_content"];
            page.page_image = Request["hfImage"];
            page.page_name = Request["page_name"];
            int page_order = 0;
            int.TryParse(Request["page_order"], out page_order);
            page.page_order = page_order;
            page.page_remark = Request["page_remark"];
            page.page_status = Convert.ToInt32(Request["page_status"]);
            page.page_title = Request["page_title"];
            page.page_description = Request["page_description"];
            page.page_keywords = Request["page_keywords"];
            page.page_type_id = tid;
            page.page_url = Request["page_url"];
            page.page_url_type = Request["page_url_type"] == "0" ? "_self" : "_blank";
            pss.Add2(page);
            Response.Redirect("/Admin/PageList/?t=" + page.page_type_id);
        }



        /// <summary>
        /// /Admin/PageCheck/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void PageCheck(int? id)
        {
            pageService pss = new pageService();
            IList<llm.Model.page> list = pss.GetModelList("page_type_id=" + id);
            Response.Write(list.Count == 0 ? "ok" : "no");
        }


        #endregion
         
        #region shop 

        #region 相册管理

        /// <summary>
        /// /Admin/PhotoManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult PhotoManage(int? id)
        {
            IList<llm.Model.sys_type> photolist = ts.GetModelListWithPhotoWhere(" type_cid = 110  order by type_order asc ");
            v.Put("list", photolist);
            v.Display("Manage/PhotoManage/PhotoList.cshtml");
            return View();
        }

        /// <summary>
        /// /Admin/PhotoList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult PhotoList(int? id)
        {
            photoService ps = new photoService();
            IList<llm.Model.photo> photolist = ps.GetModelList(" photo_type_id = " + id + "  order by photo_order asc ");
            v.Put("list", photolist);
            v.Put("typeid", id);
            
            v.Display("Manage/PhotoManage/PhotoImageList.cshtml");
            return View();
        }

        
        /// <summary>
        /// /Admin/PhotoAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void PhotoAdd()
        {
           
        }
        /// <summary>
        /// /Admin/PhotoEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void PhotoEdit(int? id)
        {
            if (id != null)
            {
                photoService ps = new photoService();
                photo photo = ps.GetModelById((int)id);
                photo.photo_title = Request["title"];
                ps.Update(photo);
            }

        } 
        
        /// <summary>
        /// /Admin/PhotoTypeAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck] 
        public string PhotoTypeAdd()
        {
            string error = "ok";

            try
            {
                llm.Model.sys_type type = new sys_type();
                string[] dict = "110|相册类型".Split('|');
                type.type_cid_name = dict[1].Replace("├", "").Replace("─", "");
                type.type_cid = Convert.ToInt32(dict[0]);
                type.type_depth = 0;
                type.type_detail = "";
                type.type_guid = Guid.NewGuid().ToString();
                type.type_image = Request["type_image"];
                type.type_content = "";
                type.type_name = Request["type_name"];
                type.type_order = Convert.ToInt32(Request["type_order"]);
                type.type_parent = 0;
                type.type_parent_name = "";
                type.type_status = 1;
                type.type_summary = Request["type_summary"];
                type.type_position = Request["type_position"];
                type.type_time = DateTime.Now;
                type.type_url = "";
                ts.Add(type);
                type = ts.GetModelList("type_guid='" + type.type_guid + "'")[0];

                if (type.type_parent != 0)
                {
                    llm.Model.sys_type _type = ts.GetModelById((int)type.type_parent);
                    if (_type != null)
                    {
                        type.type_path = _type.type_path + type.type_id + "|";
                    }
                }
                else
                {
                    type.type_path = "|" + type.type_id + "|";
                }
                ts.Update(type);

            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }

        /// <summary>
        /// /Admin/PhotoTypeModify/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string PhotoTypeModify()
        {
            string error = "ok";

            try
            {
                llm.Model.sys_type type = ts.GetModelById(Convert.ToInt32(Request["type_id"]));
                if (type != null)
                {
                    type.type_image = Request["type_image"];
                    type.type_name = Request["type_name"];
                    type.type_order = Convert.ToInt32(Request["type_order"]);
                    type.type_summary = Request["type_summary"];
                    type.type_position = Request["type_position"];
                    ts.Update(type);
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }

        #endregion 

        #region 商品管理

        /// <summary>
        /// /Admin/ProductDel/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string ProductDel(int? id)
        {
            ProductService ps = new ProductService();
            product pro = ps.GetModelById((int)id);
            ps.Delete(pro);
            return "ok";
        }

        /// <summary>
        /// /Admin/AddTag/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string AddTag()
        {
            ArticleTagService ps = new ArticleTagService();
            article_tag tag = new article_tag();
            tag.tag_name = Request["name"];
            ps.Add2(tag);
            return "ok";
        }

        /// <summary>
        /// /Admin/DelTag/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string DelTag(int? id)
        {
            ArticleTagService ps = new ArticleTagService();
            article_tag tag = ps.GetModelById((int)id);
            ps.Delete(tag);
            return "ok";
        }
        

        /// <summary>
        /// /Admin/ProductEditDo/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void ProductAdvEditDo()
        {
            //string outhtml = "";
            string json = Request["product_sku"];

            //product_sku pro_sku = null;
            //product_sku_value pro_sku_val = null;
            product_param pro_param = null;
            ProductService ps = new ProductService();
            ProductSkuService pss = new ProductSkuService();
            ProductSkuValueService psvs = new ProductSkuValueService();
            ProductParamService pps = new ProductParamService();
            ProductImageService pis = new ProductImageService();
            product_image pro_image = null;

            product pro = ps.GetModelById(Convert.ToInt32(Request["product_id"]));
            pro.product_name = Request["product_name"];
            pro.product_type_id = Convert.ToInt32(Request["product_type_id"]);
            pro.product_color = Request["product_color"];
            pro.product_content = Request["product_content"];
            pro.product_param = Request["product_param"];
            pro.product_size = Request["product_size"];
            pro.product_price_sku = Request["product_price_sku"];
            try
            {
                string _price = Request["product_price"];
                string[] split = _price.Split('|');
                pro.product_price = Convert.ToDecimal(split[0]);
                pro.product_min_price = Convert.ToDecimal(split[0]);
                pro.product_max_price = Convert.ToDecimal(split[1]);
            }
            catch
            {

            }
            pro.product_image_list = Request["product_image"];
            pro.product_guid = Guid.NewGuid().ToString();
            pro.product_sn = "";
            pro.product_sku_path = json;
            pro.product_status = Convert.ToInt32(Request["product_status"]);
            int rows = pro.product_id;
            //delete image
            IList<product_image> imagelist = pis.GetModelList("param_product_id=" + rows);
            foreach (var item in imagelist) pis.Delete(item);

            string pimage = "";
            #region image
            if (pro.product_image_list != "")
            {
                Newtonsoft.Json.Linq.JObject _image_list = Newtonsoft.Json.Linq.JObject.Parse(pro.product_image_list);
                string[] _image_list_obj = _image_list.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_image_list_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _image_list_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_image_list_obj[0]);
                    for (int j = 0; j < _image_list_array.Count; j++)
                    {
                        //pro main image
                        if (j == 0) pimage = _image_list_array[j]["src"].ToString();

                        pro_image = new product_image();
                        pro_image.image_order = Convert.ToInt32(_image_list_array[j]["order"].ToString());
                        pro_image.image_path = _image_list_array[j]["src"].ToString();
                        pro_image.image_title = _image_list_array[j]["title"].ToString() == "请输入标题说明" ? "" : _image_list_array[j]["title"].ToString();
                        pro_image.param_product_id = rows;
                        pis.Add(pro_image);
                    }
                }
            }
            #endregion
            if (pimage != "")
            {
                pro.product_image = pimage;
            }
            ps.Update(pro);

            #region param

            //delete param list
            IList<product_param> paramlist = pps.GetModelList("param_product_id =" + rows);
            foreach (var item in paramlist) pps.Delete(item);

            if (pro.product_param != "")
            {
                Newtonsoft.Json.Linq.JObject _param = Newtonsoft.Json.Linq.JObject.Parse(pro.product_param);
                string[] _param_obj = _param.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_param_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _param_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_param_obj[0]);
                    for (int j = 0; j < _param_array.Count; j++)
                    {
                        pro_param = new product_param();
                        pro_param.param_name = _param_array[j]["param_name"].ToString();
                        pro_param.param_product_id = rows;
                        pro_param.param_value = _param_array[j]["param_id"] + "|" + _param_array[j]["param_value"];
                        pps.Add(pro_param);
                    }
                }
            }
            #endregion


            Response.Write("ok");
        }

        /// <summary>
        /// /Admin/ProductAdvEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ProductAdvEdit(int? id)
        {
            ProductService ps = new ProductService();
            product pro = ps.GetModelById((int)id);
            ProductTypeAttrServices ptas = new ProductTypeAttrServices();
            IList<product_type_attr> list = ptas.GetModelList("attr_product_type_id=" + pro.product_type_id);
            v.Put("model", pro);
            products p = new products();
            v.Put("p", p);
            v.Put("list", list);
            ProductSkuParamService psps = new ProductSkuParamService();
            IList<product_sku_param> skulist = psps.GetModelList("param_product_type_id=" + pro.product_type_id);
            v.Put("skulist", skulist);
            v.Display("Manage/ProductManage/ProductAdvEdit.cshtml");
            return View();
        }

        /// <summary>
        /// /Admin/ProductEditDo/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void ProductEditDo()
        {
            //string outhtml = "";
            string json = Request["product_sku"];
           
            //product_sku pro_sku = null;
            //product_sku_value pro_sku_val = null;
            product_param pro_param = null;
            ProductService ps = new ProductService();
            ProductSkuService pss = new ProductSkuService();
            ProductSkuValueService psvs = new ProductSkuValueService();
            ProductParamService pps = new ProductParamService();
            ProductImageService pis = new ProductImageService();
            product_image pro_image = null;

            product pro = ps.GetModelById(Convert.ToInt32(Request["product_id"]));
            pro.product_name = Request["product_name"];
            pro.product_type_id = Convert.ToInt32(Request["product_type_id"]);
            //pro.product_store = Convert.ToInt32(Request["product_store"]);
            pro.product_color = Request["product_color"];
            pro.product_content = Request["product_content"];
            pro.product_param = Request["product_param"];
            pro.product_size = Request["product_size"];
            pro.product_price_sku = Request["product_price_sku"];
            try
            {
                string _price = Request["product_price"];
                string[] split = _price.Split('|');
                pro.product_price = Convert.ToDecimal(split[0]);
                pro.product_min_price = Convert.ToDecimal(split[0]);
                pro.product_max_price = Convert.ToDecimal(split[1]);
            }
            catch
            {
                
            }
            pro.product_image_list = Request["product_image"];
            pro.product_guid = Guid.NewGuid().ToString();
            pro.product_sn = "";
            pro.product_sku_path = json;
            pro.product_status = Convert.ToInt32(Request["product_status"]);
            int rows = pro.product_id;
            //delete image
            IList<product_image> imagelist = pis.GetModelList("param_product_id=" + rows);
            foreach (var item in imagelist)  pis.Delete(item);

            string pimage = "";
            #region image
            if (pro.product_image_list != "")
            {
                Newtonsoft.Json.Linq.JObject _image_list = Newtonsoft.Json.Linq.JObject.Parse(pro.product_image_list);
                string[] _image_list_obj = _image_list.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_image_list_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _image_list_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_image_list_obj[0]);
                    for (int j = 0; j < _image_list_array.Count; j++)
                    {
                        //pro main image
                        if (j == 0) pimage = _image_list_array[j]["src"].ToString();
                        
                        pro_image = new product_image();
                        pro_image.image_order = Convert.ToInt32(_image_list_array[j]["order"].ToString());
                        pro_image.image_path = _image_list_array[j]["src"].ToString();
                        pro_image.image_title = _image_list_array[j]["title"].ToString() == "请输入标题说明" ? "" : _image_list_array[j]["title"].ToString();
                        pro_image.param_product_id = rows;
                        pis.Add(pro_image);
                    }
                }
            }
            #endregion
            if (pimage != "")
            {
                pro.product_image = pimage;
            }
            ps.Update(pro);

            #region param
            if (pro.product_param != "" && pro.product_param != "]}")
            {
                //delete param list
                IList<product_param> paramlist = pps.GetModelList("param_product_id =" + rows);
                foreach (var item in paramlist) pps.Delete(item);

                if (pro.product_param != "")
                {
                    Newtonsoft.Json.Linq.JObject _param = Newtonsoft.Json.Linq.JObject.Parse(pro.product_param);
                    string[] _param_obj = _param.Properties().Select(item => item.Value.ToString()).ToArray();
                    if (_param_obj.Length > 0)
                    {
                        Newtonsoft.Json.Linq.JArray _param_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_param_obj[0]);
                        for (int j = 0; j < _param_array.Count; j++)
                        {
                            pro_param = new product_param();
                            pro_param.param_name = _param_array[j]["param_name"].ToString();
                            pro_param.param_product_id = rows;
                            pro_param.param_value = _param_array[j]["param_id"] + "|" + _param_array[j]["param_value"];
                            pps.Add(pro_param);
                        }
                    }
                }
            }
            #endregion

            Response.Write("ok");
        }

        /// <summary>
        /// /Admin/ProductEditDo2/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void ProductEditDo2()
        {
            //string outhtml = "";
            string json = Request["product_sku"];

            product_sku pro_sku = null;
            product_sku_value pro_sku_val = null;
            product_param pro_param = null;
            ProductService ps = new ProductService();
            ProductSkuService pss = new ProductSkuService();
            ProductSkuValueService psvs = new ProductSkuValueService();
            ProductParamService pps = new ProductParamService();
            ProductImageService pis = new ProductImageService();
            product_image pro_image = null;

            product pro = ps.GetModelById(Convert.ToInt32(Request["product_id"]));
            pro.product_name = Request["product_name"];
            pro.product_type_id = Convert.ToInt32(Request["product_type_id"]);
            pro.product_color = Request["product_color"];
            pro.product_content = Request["product_content"];
            pro.product_param = Request["product_param"];
            pro.product_size = Request["product_size"];
            pro.product_price_sku = Request["product_price_sku"];
            try
            {
                string _price = Request["product_price"];
                string[] split = _price.Split('|');
                pro.product_price = Convert.ToDecimal(split[0]);
                pro.product_min_price = Convert.ToDecimal(split[0]);
                pro.product_max_price = Convert.ToDecimal(split[1]);
            }
            catch
            {

            }
            pro.product_image_list = Request["product_image"];
            pro.product_guid = Guid.NewGuid().ToString();
            pro.product_sn = "";
            pro.product_sku_path = json;
            pro.product_status = Convert.ToInt32(Request["product_status"]);
            int rows = pro.product_id;
            //delete image
            IList<product_image> imagelist = pis.GetModelList("param_product_id=" + rows);
            foreach (var item in imagelist) pis.Delete(item);

            string pimage = "";
            #region image
            if (pro.product_image_list != "")
            {
                Newtonsoft.Json.Linq.JObject _image_list = Newtonsoft.Json.Linq.JObject.Parse(pro.product_image_list);
                string[] _image_list_obj = _image_list.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_image_list_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _image_list_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_image_list_obj[0]);
                    for (int j = 0; j < _image_list_array.Count; j++)
                    {
                        //pro main image
                        if (j == 0) pimage = _image_list_array[j]["src"].ToString();

                        pro_image = new product_image();
                        pro_image.image_order = Convert.ToInt32(_image_list_array[j]["order"].ToString());
                        pro_image.image_path = _image_list_array[j]["src"].ToString();
                        pro_image.image_title = _image_list_array[j]["title"].ToString() == "请输入标题说明" ? "" : _image_list_array[j]["title"].ToString();
                        pro_image.param_product_id = rows;
                        pis.Add(pro_image);
                    }
                }
            }
            #endregion
            if (pimage != "")
            {
                pro.product_image = pimage;
            }
            ps.Update(pro);

            #region param

            //delete param list
            IList<product_param> paramlist = pps.GetModelList("param_product_id =" + rows);
            foreach (var item in paramlist) pps.Delete(item);

            if (pro.product_param != "")
            {
                Newtonsoft.Json.Linq.JObject _param = Newtonsoft.Json.Linq.JObject.Parse(pro.product_param);
                string[] _param_obj = _param.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_param_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _param_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_param_obj[0]);
                    for (int j = 0; j < _param_array.Count; j++)
                    {
                        pro_param = new product_param();
                        pro_param.param_name = _param_array[j]["param_name"].ToString();
                        pro_param.param_product_id = rows;
                        pro_param.param_value = _param_array[j]["param_id"] + "|" + _param_array[j]["param_value"];
                        pps.Add(pro_param);
                    }
                }
            }
            #endregion

            #region sku
            //delete sku and sku value
            IList<product_sku> skulist = pss.GetModelList("sku_product_id=" + rows);
            foreach (var item in skulist)
            {
                product_sku_value psv = psvs.GetModelBySkuId(item.sku_id);
                psvs.Delete(psv);
                pss.Delete(item);
            }
            Newtonsoft.Json.Linq.JObject jo = Newtonsoft.Json.Linq.JObject.Parse(json);
            string[] ja = jo.Properties().Select(item => item.Value.ToString()).ToArray();
            if (ja.Length > 0)
            {
                for (int j = 0; j < ja.Length; j++)
                {
                    Newtonsoft.Json.Linq.JArray jarr = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(ja[j]);
                    for (int i = 0; i < jarr.Count; i++)
                    {
                        var color_name = jarr[i]["color_name"];
                        var color_class = jarr[i]["color_class"];
                        var color_img = jarr[i]["color_img"];
                        var color_id = jarr[i]["color_id"];
                        //outhtml += "color_name:" + color_name + "--color_class:" + color_class ;
                        Newtonsoft.Json.Linq.JArray size_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(jarr[i]["size"].ToString());
                        for (int k = 0; k < size_array.ToArray().Length; k++)
                        {
                            var size_name = size_array[k]["size_name"];
                            var size_class = size_array[k]["size_class"];
                            var size_data = size_array[k]["size_data"];
                            var price = size_array[k]["price"];
                            var count = size_array[k]["count"];
                            var sn = size_array[k]["sn"];

                            pro_sku = new product_sku();
                            pro_sku.sku_code = color_id + "." + size_data + "." + price + "." + count;
                            pro_sku.sku_count = Convert.ToInt32(count);
                            pro_sku.sku_name = sn.ToString();
                            pro_sku.sku_path = "{'color_name':'" + color_name + "','color_class':'" + color_class + "','size_name':'" + size_name + "','size_class':'" + size_class + "','size_data':'" + size_data + "','color_id':'" + color_id + "'}";
                            pro_sku.sku_price = Convert.ToDecimal(price);
                            pro_sku.sku_product_id = pro.product_id;
                            pro_sku.sku_status = 1;
                            int sku_rows = pss.Add(pro_sku);
                            pro_sku_val = new product_sku_value();
                            pro_sku_val.value_sku_id = sku_rows;
                            pro_sku_val.value_def_value_id = color_class.ToString().Replace("em", "");
                            pro_sku_val.value_image = color_img.ToString();
                            int pro_sku_val_rows = psvs.Add(pro_sku_val);
                        }
                    }
                }
            }
            #endregion

            Response.Write(pro.product_sku_path);
        }
        /// <summary>
        /// /Admin/ProductEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck] 
        public ActionResult ProductEdit(int? id)
        {
            ProductService ps = new ProductService();
            product pro = ps.GetModelById((int)id);
            ProductTypeAttrServices ptas = new ProductTypeAttrServices();
            IList<product_type_attr> list = ptas.GetModelList( "attr_product_type_id=" + pro.product_type_id);
            v.Put("model", pro);
            products p = new products();
            v.Put("p", p);
            v.Put("list", list);
            ProductSkuParamService psps = new ProductSkuParamService();
            IList<product_sku_param> skulist = psps.GetModelList("param_product_type_id=" + pro.product_type_id);
            v.Put("skulist", skulist);
            ArticleTagService ats = new ArticleTagService();
            IList<article_tag> taglist = ats.GetModelList();
            v.Put("taglist", taglist);
            v.Display("Manage/ProductManage/ProductEdit.cshtml");
            return View();
        }


        /// <summary>
        /// /Admin/ProductAddDo/
        /// </summary>
        /// <returns></returns> 
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void ProductAddDo()
        {
            //string outhtml = "";
            string json = Request["product_sku"];
            product pro = new product();
            //product_sku pro_sku = null;
            //product_sku_value pro_sku_val = null;
            product_param pro_param = null;
            ProductService ps = new ProductService();
            ProductSkuService pss = new ProductSkuService();
            ProductSkuValueService psvs = new ProductSkuValueService();
            ProductParamService pps = new ProductParamService();
            ProductImageService pis = new ProductImageService();
            product_image pro_image = null;
            pro.product_price_sku = Request["product_price_sku"];
            //pro.product_store = Convert.ToInt32(Request["product_store"]);
            string _price = Request["product_price"];
            string[] split = _price.Split('|');
            pro.product_price = Convert.ToDecimal(split[0]);
            pro.product_min_price = Convert.ToDecimal(split[0]);
            pro.product_max_price = Convert.ToDecimal(split[1]);
            pro.product_name = Request["product_name"];
            pro.product_type_id = Convert.ToInt32(Request["product_type_id"]);
            pro.product_color = Request["product_color"];
            pro.product_content = Request["product_content"];
            pro.product_param = Request["product_param"];
            pro.product_size = Request["product_size"];
            pro.product_image_list = Request["product_image"];
            pro.product_guid = Guid.NewGuid().ToString();
            pro.product_sn = "";
            pro.product_time = DateTime.Now;
            pro.product_sku_path = json;
            pro.product_status = Convert.ToInt32(Request["product_status"]);
            sys_type type = ts.GetModelById((int)pro.product_type_id);
            pro.product_type_name = type == null ? "" : type.type_name;
            int rows = ps.Add(pro);

            string pimage = "";
            #region image
            if (pro.product_image_list != "")
            {
                Newtonsoft.Json.Linq.JObject _image_list = Newtonsoft.Json.Linq.JObject.Parse(pro.product_image_list);
                string[] _image_list_obj = _image_list.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_image_list_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _image_list_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_image_list_obj[0]);
                    for (int j = 0; j < _image_list_array.Count; j++)
                    {
                        //pro main image
                        if (j == 0) pimage = _image_list_array[j]["src"].ToString();
                        pro_image = new product_image();
                        pro_image.image_order = Convert.ToInt32(_image_list_array[j]["order"].ToString());
                        pro_image.image_path = _image_list_array[j]["src"].ToString();
                        pro_image.image_title = _image_list_array[j]["title"].ToString() == "请输入标题说明" ? "" : _image_list_array[j]["title"].ToString();
                        pro_image.param_product_id = rows;
                        pis.Add(pro_image);
                    }
                }
            }
            #endregion
            if (pimage != "")
            {
                pro = ps.GetModelById(rows);
                pro.product_image = pimage;
                ps.Update(pro);
            }
            #region param
            if (pro.product_param != "")
            {
                Newtonsoft.Json.Linq.JObject _param = Newtonsoft.Json.Linq.JObject.Parse(pro.product_param);
                string[] _param_obj = _param.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_param_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _param_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_param_obj[0]);
                    for (int j = 0; j < _param_array.Count; j++)
                    {
                        pro_param = new product_param();
                        pro_param.param_name = _param_array[j]["param_name"].ToString();
                        pro_param.param_product_id = rows;
                        pro_param.param_value = _param_array[j]["param_id"] + "|" + _param_array[j]["param_value"];
                        pps.Add(pro_param);
                    }
                }
            }
            #endregion

            Response.Write("ok");
        }

        
        /// <summary>
        /// /Admin/productAdvAddDo/
        /// </summary>
        /// <returns></returns> 
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void productAdvAddDo()
        {
            string json = Request["product_sku"]; 
            product pro = new product();
            //product_sku pro_sku = null;
            //product_sku_value pro_sku_val = null;
            product_param pro_param = null;
            ProductService ps = new ProductService();
            ProductSkuService pss = new ProductSkuService();
            ProductSkuValueService psvs = new ProductSkuValueService();
            ProductParamService pps = new ProductParamService();
            ProductImageService pis = new ProductImageService();
            product_image pro_image = null;
            pro.product_price_sku = Request["product_price_sku"];
            string _price = Request["product_price"];
            string[] split = _price.Split('|');
            pro.product_price = Convert.ToDecimal(split[0]);
            pro.product_min_price = Convert.ToDecimal(split[0]);
            pro.product_max_price = Convert.ToDecimal(split[1]);
            pro.product_name = Request["product_name"];
            pro.product_type_id = Convert.ToInt32(Request["product_type_id"]);
            pro.product_color = Request["product_color"];
            pro.product_content = Request["product_content"];
            pro.product_param = Request["product_param"];
            pro.product_size = Request["product_size"];
            pro.product_image_list = Request["product_image"];
            pro.product_guid = Guid.NewGuid().ToString();
            pro.product_sn = "";
            pro.product_time = DateTime.Now;
            pro.product_sku_path = json;
            pro.product_status = Convert.ToInt32(Request["product_status"]);
            sys_type type = ts.GetModelById((int)pro.product_type_id);
            pro.product_type_name = type == null ? "" : type.type_name;
            int rows = ps.Add(pro);

            string pimage = ""; 
            #region image
            if (pro.product_image_list != "")
            {
                Newtonsoft.Json.Linq.JObject _image_list = Newtonsoft.Json.Linq.JObject.Parse(pro.product_image_list);
                string[] _image_list_obj = _image_list.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_image_list_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _image_list_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_image_list_obj[0]);
                    for (int j = 0; j < _image_list_array.Count; j++)
                    {
                        //pro main image
                        if (j == 0) pimage = _image_list_array[j]["src"].ToString();
                        pro_image = new product_image();
                        pro_image.image_order = Convert.ToInt32(_image_list_array[j]["order"].ToString());
                        pro_image.image_path = _image_list_array[j]["src"].ToString();
                        pro_image.image_title = _image_list_array[j]["title"].ToString() == "请输入标题说明" ? "" : _image_list_array[j]["title"].ToString();
                        pro_image.param_product_id = rows;
                        pis.Add(pro_image);
                    }
                }
            }
            #endregion
            if (pimage != "")
            {
                pro = ps.GetModelById(rows);
                pro.product_image = pimage;
                ps.Update(pro);
            }
            #region param
            if (pro.product_param != "")
            {
                Newtonsoft.Json.Linq.JObject _param = Newtonsoft.Json.Linq.JObject.Parse(pro.product_param);
                string[] _param_obj = _param.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_param_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _param_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_param_obj[0]);
                    for (int j = 0; j < _param_array.Count; j++)
                    {
                        pro_param = new product_param();
                        pro_param.param_name = _param_array[j]["param_name"].ToString();
                        pro_param.param_product_id = rows;
                        pro_param.param_value = _param_array[j]["param_id"] + "|" + _param_array[j]["param_value"];
                        pps.Add(pro_param);
                        
                    }
                }
            }
            #endregion

            /*
            #region sku
            string price_json = pro.product_price_sku;
            Newtonsoft.Json.Linq.JObject jo = Newtonsoft.Json.Linq.JObject.Parse(price_json);
            string[] _price_obj = jo.Properties().Select(item => item.Value.ToString()).ToArray();
            foreach (var item in _price_obj)
            {
                Newtonsoft.Json.Linq.JArray _price_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(item);
                 for (int j = 0; j < _price_array.Count; j++)
                 {
                     pro_sku = new product_sku();
                     pro_sku.sku_code = _price_array[j].ToString();
                     pro_sku.sku_count = Convert.ToInt32(_price_array[j]["count"]);
                     pro_sku.sku_name = _price_array[j]["sn"].ToString();
                     pro_sku.sku_path = "";
                     pro_sku.sku_price = Convert.ToDecimal(_price_array[j]["price"]);
                     pro_sku.sku_product_id = pro.product_id;
                     pro_sku.sku_status = 1;
                     int sku_rows = pss.Add(pro_sku);
                 }
            }
            #endregion
            */
            Response.Write("ok");
        }

        /// <summary>
        /// /Admin/ProductAddDo2/
        /// </summary>
        /// <returns></returns> 
        [AdminLoginCheck]
        [ValidateInput(false)]
        public void ProductAddDo2()
        {
            //string outhtml = "";
            string json = Request["product_sku"]; 
            product pro = new product();
            product_sku pro_sku = null;
            product_sku_value pro_sku_val = null;
            product_param pro_param = null;
            ProductService ps = new ProductService();
            ProductSkuService pss = new ProductSkuService();
            ProductSkuValueService psvs = new ProductSkuValueService();
            ProductParamService pps = new ProductParamService();
            ProductImageService pis = new ProductImageService();
            product_image pro_image = null;
            pro.product_price_sku = Request["product_price_sku"];
            string _price = Request["product_price"];
            string[] split = _price.Split('|');
            pro.product_price = Convert.ToDecimal(split[0]);
            pro.product_min_price = Convert.ToDecimal(split[0]);
            pro.product_max_price = Convert.ToDecimal(split[1]);
            pro.product_name = Request["product_name"];
            pro.product_type_id = Convert.ToInt32(Request["product_type_id"]);
            pro.product_color = Request["product_color"];
            pro.product_content = Request["product_content"];
            pro.product_param = Request["product_param"];
            pro.product_size = Request["product_size"];
            pro.product_image_list = Request["product_image"];
            pro.product_guid = Guid.NewGuid().ToString();
            pro.product_sn = "";
            pro.product_time = DateTime.Now;
            pro.product_sku_path = json;
            pro.product_status = Convert.ToInt32(Request["product_status"]);
            sys_type type = ts.GetModelById((int)pro.product_type_id);
            pro.product_type_name = type == null ? "" : type.type_name;
            int rows = ps.Add(pro);

            string pimage = ""; 
            #region image
            if (pro.product_image_list != "")
            {
                Newtonsoft.Json.Linq.JObject _image_list = Newtonsoft.Json.Linq.JObject.Parse(pro.product_image_list);
                string[] _image_list_obj = _image_list.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_image_list_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _image_list_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_image_list_obj[0]);
                    for (int j = 0; j < _image_list_array.Count; j++)
                    {
                        //pro main image
                        if (j == 0) pimage = _image_list_array[j]["src"].ToString();
                        pro_image = new product_image();
                        pro_image.image_order = Convert.ToInt32(_image_list_array[j]["order"].ToString());
                        pro_image.image_path = _image_list_array[j]["src"].ToString();
                        pro_image.image_title = _image_list_array[j]["title"].ToString() == "请输入标题说明" ? "" : _image_list_array[j]["title"].ToString();
                        pro_image.param_product_id = rows;
                        pis.Add(pro_image);
                    }
                }
            }
            #endregion
            if (pimage != "")
            {
                pro = ps.GetModelById(rows);
                pro.product_image = pimage;
                ps.Update(pro);
            }
            #region param
            if (pro.product_param != "")
            {
                Newtonsoft.Json.Linq.JObject _param = Newtonsoft.Json.Linq.JObject.Parse(pro.product_param);
                string[] _param_obj = _param.Properties().Select(item => item.Value.ToString()).ToArray();
                if (_param_obj.Length > 0)
                {
                    Newtonsoft.Json.Linq.JArray _param_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(_param_obj[0]);
                    for (int j = 0; j < _param_array.Count; j++)
                    {
                        pro_param = new product_param();
                        pro_param.param_name = _param_array[j]["param_name"].ToString();
                        pro_param.param_product_id = rows;
                        pro_param.param_value = _param_array[j]["param_id"] + "|" + _param_array[j]["param_value"];
                        pps.Add(pro_param);
                    }
                }
            }
            #endregion


            #region sku
            Newtonsoft.Json.Linq.JObject jo = Newtonsoft.Json.Linq.JObject.Parse(json);
            string[] ja = jo.Properties().Select(item => item.Value.ToString()).ToArray();
            if (ja.Length > 0)
            {
                for (int j = 0; j < ja.Length; j++)
                {
                    Newtonsoft.Json.Linq.JArray jarr = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(ja[j]);
                    for (int i = 0; i < jarr.Count; i++)
                    {
                        var color_name = jarr[i]["color_name"];
                        var color_class = jarr[i]["color_class"];
                        var color_img = jarr[i]["color_img"];
                        //outhtml += "color_name:" + color_name + "--color_class:" + color_class ;
                        Newtonsoft.Json.Linq.JArray size_array = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(jarr[i]["size"].ToString());
                        for (int k = 0; k < size_array.ToArray().Length; k++)
                        {
                            var size_name = size_array[k]["size_name"];
                            var size_class = size_array[k]["size_class"];
                            var price = size_array[k]["price"];
                            var count = size_array[k]["count"];
                            var sn = size_array[k]["sn"];

                            pro_sku = new product_sku();
                            pro_sku.sku_code = color_name + "-" + color_class + "|" + size_name + "-" + size_class;
                            pro_sku.sku_count = Convert.ToInt32(count);
                            pro_sku.sku_name = sn.ToString();
                            pro_sku.sku_path = "{'color_name':'" + color_name + "','color_class':'" + color_class + "','size_name':'" + size_name + "','size_class':'" + size_class + "'}";
                            pro_sku.sku_price = Convert.ToDecimal(price);
                            pro_sku.sku_product_id = pro.product_id;
                            pro_sku.sku_status = 1;
                            int sku_rows = pss.Add(pro_sku);
                            pro_sku_val = new product_sku_value();
                            pro_sku_val.value_sku_id = sku_rows;
                            pro_sku_val.value_def_value_id = color_class.ToString().Replace("em", "");
                            pro_sku_val.value_image = color_img.ToString();
                            int pro_sku_val_rows = psvs.Add(pro_sku_val);
                            //outhtml += "--size_name--" + size_name + "--color_img--" + color_img+"--size_class:" + size_class + "--price:" + price + "--count--" + count;
                            //outhtml += "--sn:" + sn;
                        }
                        
                       
                    }
                }
            }
            #endregion

            Response.Write("ok");
        }
        /// <summary>
        /// /Admin/ProductAdvAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ProductAdvAdd(int? id)
        {
            ProductTypeAttrServices ptas = new ProductTypeAttrServices();
            IList<product_type_attr> list = ptas.GetModelList(id == null ? "1=1" : "attr_product_type_id=" + id);
            products p = new products();
            v.Put("product_type_id", id);
            v.Put("p", p);
            v.Put("list", list);
            ProductSkuParamService psps = new ProductSkuParamService();
            IList<product_sku_param> skulist = psps.GetModelList("param_product_type_id=" + id);
            v.Put("skulist", skulist);
            v.Display("Manage/ProductManage/ProductAdvAdd.cshtml");
            return View();
        }
         

        /// <summary>
        /// /Admin/ProductAdd2/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ProductAdd2(int? id)
        {
            ProductTypeAttrServices ptas = new ProductTypeAttrServices();
            IList<product_type_attr> list = ptas.GetModelList(id == null ? "1=1" : "attr_product_type_id=" + id);
            products p = new products();
            v.Put("product_type_id", id);
            v.Put("p",p);
            v.Put("list", list);
            ProductSkuParamService psps = new ProductSkuParamService();
            IList<product_sku_param> skulist = psps.GetModelList("param_product_type_id=" + id);
            v.Put("skulist", skulist);
            v.Display("Manage/ProductManage/ProductAdd.cshtml");
            return View();
        }

        /// <summary>
        /// /Admin/ProductAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ProductAdd(int? id)
        {
            ProductTypeAttrServices ptas = new ProductTypeAttrServices();
            IList<product_type_attr> list = ptas.GetModelList(id == null ? "1=1" : "attr_product_type_id=" + id);
            products p = new products();
            v.Put("product_type_id", id);
            v.Put("p", p);
            v.Put("list", list);
            ProductSkuParamService psps = new ProductSkuParamService();
            IList<product_sku_param> skulist = psps.GetModelList("param_product_type_id=" + id);
            v.Put("skulist", skulist);
            ArticleTagService ats = new ArticleTagService();
            IList<article_tag> taglist = ats.GetModelList();
            v.Put("taglist", taglist);

            v.Display("Manage/ProductManage/ProductAdd.cshtml");
            return View();
        }

        /// <summary>
        /// /Admin/ProductTypeSelect/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ProductTypeSelect()
        {
            IList<sys_type> list = ts.GetModelList(" type_parent = 0 and type_cid_name ='产品类型' ");
            v.Put("list", list);
            v.Display("Manage/ProductManage/ProductTypeSelect.cshtml");
            return View();
        }
        /// <summary>
        /// /Admin/ProductTypeSelect/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void ProductAddTrus(int? id)
        {
            //id = select type id
            string url = "";
            ProductSkuParamService psps = new ProductSkuParamService();
            IList<product_sku_param> skulist = psps.GetModelList("param_product_type_id=" + id);
            if (skulist.Count == 1)
                url = "/Admin/ProductAdd/" + id;
            else if (skulist.Count == 3)
                url = "/Admin/ProductAdvAdd/" + id;
            Response.Redirect(url);
        }
        

         /// <summary>
        /// /Admin/ProductTypeSelect/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public JsonResult GetProductType(int? id)
        {
            IList<sys_type> list = null;
            if (id == null)
            {
                list = new List<sys_type>();
            }
            else { list = ts.GetModelList(" type_parent =  " + id); }

            JsonResult jr = new JsonResult();
            jr.Data = list;
            return jr;
        }
        

        public class products
        {
            public products() { }
            public IList<product_type_attr_def_value> getDefList(int attr_id)
            {
                ProductTypeAttrDefValueService ptadvs = new ProductTypeAttrDefValueService();
                IList<product_type_attr_def_value> deflist = ptadvs.GetModelList("value_attr_id = " + attr_id);
                return deflist;
            }

            public IList<product_sku_param_list> getSkuList(int param_id)
            {
                ProductSkuParamListService ptadvs = new ProductSkuParamListService();
                IList<product_sku_param_list> deflist = ptadvs.GetModelList("list_param_id = " + param_id);
                return deflist;
            }

        }
     

        /// <summary>
        /// /Admin/ProductManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ProductManage(int? id)
        {

            #region 通用分页
            ProductService ass = new ProductService();
            string url = "/Admin/ProductManage/";
            string strwhere = "[sys_Product] where 1=1 ";
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
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "product_id desc", "*");
            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url);
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.product> list = ass.GetModelListByPage(sql);
            v.Put("list", list);
            #endregion  

            v.Display("Manage/ProductManage/ProductList.cshtml");
            return View();
        }

        #endregion

        #region Sku参数管理
        /// <summary>
        ////Admin/TypeSkuParamListModify/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public int TypeSkuParamListModify(int? id)
        {
            ProductSkuParamListService pts = new ProductSkuParamListService();
            product_sku_param_list attr = pts.GetModelById((int)id);
            attr.list_name = Request["name"];
            pts.Update(attr);
            return 1;
        }

        [AdminLoginCheck]
        public int TypeSkuParamModify(int? id)
        {
            ProductSkuParamService pts = new ProductSkuParamService();
            product_sku_param attr = pts.GetModelById((int)id);
            attr.param_name = Request["name"];
            pts.Update(attr);
            return 1;
        }

        /// <summary>
        ////Admin/TypeSkuParamDel/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public int TypeSkuParamDel(int? id)
        {
            ProductSkuParamService pts = new ProductSkuParamService();
            product_sku_param param = pts.GetModelById((int)id);
            pts.Delete(param);
            return 1;
        }
        /// <summary>
        ////Admin/TypeSkuParamCopy/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public int TypeSkuParamCopy(int? id)
        {   
            ProductSkuParamListService ptds = new ProductSkuParamListService();
            ProductSkuParamService pts = new ProductSkuParamService();
            IList<product_sku_param> typeSkuList = pts.GetModelList("param_product_type_id = " + id);
            int curid = Convert.ToInt32(Request["curid"]);//需要添加SKU属性的分类ID
            foreach (var item in typeSkuList)
            {
                int _curid = item.param_id;//被复制的SKU属性列表项中的参数ID
                item.param_product_type_id = curid;
                item.param_guid = Guid.NewGuid().ToString();
                pts.Add(item);//add方法好 param_id被重新填充为 当前添加的ID 类似 int rows =  pts.Add(item); 取rows
                product_sku_param _item = pts.GetModelById(item.param_id);//查找当前添加的ID 其实可以直接调用 item.param_id
                IList<product_sku_param_list> deflist = ptds.GetModelList("list_param_id = " + _curid);
                foreach (var val in deflist)
                {
                    val.list_param_id = _item.param_id;
                    ptds.Add(val);
                }
            } 
            return 1; 
        }

        /// <summary>
        ////Admin/TypeSkuParamListDel/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public int TypeSkuParamListDel(int? id)
        {
            ProductSkuParamListService ptds = new ProductSkuParamListService();
            product_sku_param_list val = ptds.GetModelById((int)id);
            ptds.Delete(val);
            return 1;
        }

        /// <summary>
        ////Admin/TypeSkuParamListAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public void TypeSkuParamListAdd()
        {
            ProductSkuParamListService ptds = new ProductSkuParamListService();
            int id = 0;
            int.TryParse(Request["id"], out id);
            product_sku_param_list val = new product_sku_param_list();
            val.list_param_id = id;
            val.list_name = Request["name"];
            int rows = ptds.Add(val);
            Response.Write(rows);
        } 

        /// <summary>
        ////Admin/TypeSkuParamEditDo/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string TypeSkuParamEditDo()
        {
            ProductSkuParamService pts = new ProductSkuParamService();
            int id = 0;
            int.TryParse(Request["id"], out id);
            product_sku_param pta = pts.GetModelById(id);
            pta.param_name = Request["param_name"];
            pta.param_product_type_id = Convert.ToInt32(Request["param_product_type_id"]);
            pta.param_code_name = Request["param_code_name"];
            pta.param_status = Convert.ToInt32(Request["param_status"]);
            pta.param_type = Convert.ToInt32(Request["param_type"]);
            pts.Update(pta);
            return "ok";
        }

        /// <summary>
        ////Admin/TypeSkuParamEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult TypeSkuParamEdit(int? id)
        {
            ProductSkuParamService pts = new ProductSkuParamService();
            product_sku_param pta = pts.GetModelById((int)id); 
            var res = new JsonResult();
            res.Data = pta;
            return res;
        }

        /// <summary>
        ////Admin/TypeSkuAddDo/
        /// </summary>
        /// <returns>html</returns>
        [AdminLoginCheck]
        public string TypeSkuAddDo()
        {
            ProductSkuParamService pts = new ProductSkuParamService();
            product_sku_param pta = new product_sku_param();
            pta.param_name = Request["param_name"];
            pta.param_guid = Guid.NewGuid().ToString();
            pta.param_product_type_id = Convert.ToInt32(Request["param_product_type_id"]);
            pta.param_remark = "";
            pta.param_code_name = Request["param_code_name"];
            pta.param_status = Convert.ToInt32(Request["param_status"]);
            pta.param_type = Convert.ToInt32(Request["param_type"]);
            int rows = pts.Add(pta);
            pta = pts.GetModelById(rows);
            string html = "ok";
            if (pta != null)
            {
                html = rows.ToString();
            }
            return html;
        }

        /// <summary>
        ////Admin/TypeSkuParamAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult TypeSkuParamAdd(int? id)
        {
            sys_type st = ts.GetModelById((int)id);
            if (st == null) st = new sys_type();
            v.Put("model", st);
            //
            ProductSkuParamService pts = new ProductSkuParamService();
            IList<product_sku_param> list = pts.GetModelList("param_product_type_id=" + id + " order by param_id desc ");
            v.Put("list", list);
            SkuValue sv = new SkuValue();
            v.Put("sv", sv);
            IList<sys_type> typelist = ts.GetModelList(" type_parent =" + st.type_parent + " and type_id <>" + st.type_id);
            v.Put("typelist", typelist);
            v.Display("Manage/TypeAttrManage/TypeSkuParamAdd.cshtml");
            return View();
        }


        public class SkuValue
        {
            public IList<product_sku_param_list> getSkuValue(object id)
            {
                IList<product_sku_param_list> list = null;
                ProductSkuParamListService ptds = new ProductSkuParamListService();
                list = ptds.GetModelList("list_param_id=" + id + " order by list_id desc");
                return list;
            }

        }

        #endregion

        #region 属性管理

        [AdminLoginCheck]
        public int TypeAttrDefModify(int? id)
        {
            ProductTypeAttrDefValueService pts = new ProductTypeAttrDefValueService();
            product_type_attr_def_value attr = pts.GetModelById((int)id);
            attr.value_name = Request["name"];
            pts.Update(attr);
            return 1;
        }
        
        [AdminLoginCheck]
        public int TypeAttrModify(int? id)
        {
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            product_type_attr attr = pts.GetModelById((int)id);
            attr.attr_name = Request["name"];
            pts.Update(attr);
            return 1;
        }


        [AdminLoginCheck]
        public int TypeAttrDel(int? id)
        {
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            product_type_attr attr = pts.GetModelById((int)id);
            pts.Delete(attr);
            return 1;
        }

        [AdminLoginCheck]
        public int TypeAttrCopy(int? id)
        {
            ProductTypeAttrDefValueService ptds = new ProductTypeAttrDefValueService();
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            IList<product_type_attr> typeAttrList = pts.GetModelList("attr_product_type_id=" + id);
            int curid = Convert.ToInt32(Request["curid"]);
            foreach (var item in typeAttrList)
            {
                int _curid = item.attr_id;
                item.attr_product_type_id = curid;
                item.attr_guid = Guid.NewGuid().ToString();
                pts.Add(item);//添加后item的attr_id 变成了刚刚添加的attr_id 会自动查询??? 好奇怪!!

                product_type_attr _item = pts.GetModelByAttrGuid(item.attr_guid);
                IList<product_type_attr_def_value> deflist = ptds.GetModelList("value_attr_id=" + _curid);
                foreach (var val in deflist)
                {
                    val.value_attr_id = _item.attr_id;
                    ptds.Add(val);
                }
            }
           
            return 1; 

        }


        [AdminLoginCheck]
        public int TypeAttrDefValueDel(int ?id)
        {
            ProductTypeAttrDefValueService ptds = new ProductTypeAttrDefValueService();
            product_type_attr_def_value val = ptds.GetModelById((int)id);
            ptds.Delete(val);
            return 1;
        }

        [AdminLoginCheck]
        public int TypeAttrDefValueAdd()
        {
            ProductTypeAttrDefValueService ptds = new ProductTypeAttrDefValueService();
            int id = 0;
            int.TryParse(Request["id"],out id);
            product_type_attr_def_value val = new product_type_attr_def_value();
            val.value_attr_id = id;
            val.value_name = Request["name"];
            ptds.Add(val);
            id = ptds.GetMaxvalue_id();

            return id;
        }


        

        [AdminLoginCheck]
        public string TypeAttrEditDo()
        {
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            int id = 0;
            int.TryParse(Request["id"],out id);
            product_type_attr pta = pts.GetModelById(id);
            pta.attr_name = Request["attr_name"];
            pta.attr_guid = Guid.NewGuid().ToString();
            pta.attr_product_type_id = Convert.ToInt32(Request["type_id"]);
           
            pta.attr_code_name = Request["attr_code_name"];
            pta.attr_status = Convert.ToInt32(Request["att_status"]);
            pta.attr_type = Convert.ToInt32(Request["attr_type"]);
            pts.Update(pta);
           
            return "ok";
        }

        /// <summary>
        ////Admin/TypeAttrEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult TypeAttrEdit(int? id)
        {
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            product_type_attr pta = pts.GetModelById((int)id);
            var res = new JsonResult();
            res.Data = pta;
            return res;
        }




        [AdminLoginCheck]
        public string TypeAttrAddDo()
        {
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            product_type_attr pta = new product_type_attr();
            pta.attr_name = Request["attr_name"];
            pta.attr_guid = Guid.NewGuid().ToString();
            pta.attr_product_type_id = Convert.ToInt32(Request["type_id"]);
            pta.attr_remark = "";
            pta.attr_code_name = Request["attr_code_name"];
            pta.attr_status = Convert.ToInt32(Request["att_status"]);
            pta.attr_type = Convert.ToInt32(Request["attr_type"]);
            pts.Add(pta);

            pta = pts.GetModelByAttrGuid(pta.attr_guid);
            string html = "ok";
            if (pta != null)
            {
                html = pta.attr_id.ToString();
            }
            return html;
        }

        /// <summary>
        ////Admin/TypeAttrAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult TypeAttrAdd(int? id)
        {
            sys_type st = ts.GetModelById((int)id);
            if (st == null) st = new sys_type();
            v.Put("model", st);
            //
            ProductTypeAttrServices pts = new ProductTypeAttrServices();
            IList<product_type_attr> list = pts.GetModelList("attr_product_type_id=" + id + " order by attr_id desc ");
            v.Put("list", list);
            getAttrValue gv = new getAttrValue();
            v.Put("gv", gv);
            IList<sys_type> typelist = ts.GetModelList(" type_parent =" + st.type_parent + " and type_id <>" + st.type_id);
            v.Put("typelist", typelist);
            v.Display("Manage/TypeAttrManage/TypeAttrAdd.cshtml");
            return View();
        }


        public class getAttrValue{

            public IList<product_type_attr_def_value> getAttrValues(object id)
            {
                IList<product_type_attr_def_value> list = null;
                ProductTypeAttrDefValueService ptds = new ProductTypeAttrDefValueService();
                list = ptds.GetModelList("value_attr_id=" + id + " order by value_id desc");
                return list;
            }   
        
        }

        #endregion

        #endregion

        #region 文章管理

        [AdminLoginCheck]
        public string ArticleContentOrderModify()
        {
            ArticleContentService acs = new ArticleContentService();
            article_content article_content = acs.GetModelById(Convert.ToInt32(Request["id"]));
            article_content.content_order = Convert.ToInt32(Request["order"]);
            acs.Update(article_content);
            return "ok";
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public string ArticleContentModify()
        {
            ArticleContentService acs = new ArticleContentService();
            article_content article_content = acs.GetModelById(Convert.ToInt32(Request["id"]));
            article_content.content_content = Request["c"];
            article_content.content_title = Request["title"];
            acs.Update(article_content);

            return "ok";
        }

        public string ArticleContentDelete(int? id)
        {
            ArticleContentService acs = new ArticleContentService();
            llm.Model.article_content art = acs.GetModelById((int)id);
            if (art != null)
            {
                acs.Delete(art);
            }
            return "ok";
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public string ArticleContentAdd()
        {
            ArticleContentService acs = new ArticleContentService();
            IList<article_content> list = acs.GetModelList("content_article_id=" + Convert.ToInt32(Request["aid"]) + " order by content_order desc ");
            article_content article_content = new llm.Model.article_content();
            article_content.content_article_id = Convert.ToInt32(Request["aid"]);
            article_content.content_content = Request["c"];
            article_content.content_order = list.Count + 1;
            article_content.content_title = Request["title"];
            acs.Add2(article_content);


            return "ok";
        }


        [AdminLoginCheck]
        public ActionResult ArticleContent(int? id)
        {
            ArticleService ass = new ArticleService();
            article art = ass.GetModelById((int)id); 
            v.Put("item", art);
            ArticleContentService acs = new ArticleContentService();
            IList<article_content> list = acs.GetModelList("content_article_id=" + id + " order by content_order asc ");
            v.Put("list", list);
            v.Display("Manage/ArticleManage/ArticleContent.cshtml");

            return View();
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult ArticleEditDo(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                art.article_content = Request["article_content"];
                art.article_is_top = Convert.ToBoolean(Request["article_is_top"]);
                art.article_ref_url = Request["article_ref_url"];
                art.article_remark = Request["article_remark"];
                art.article_seo_desc = Request["article_seo_desc"];
                art.article_seo_kw = Request["article_seo_kw"];
                art.article_shut_title = Request["article_shut_title"];
                art.article_source = Request["article_source"];
                int article_status = 0;
                int.TryParse(Request["article_status"], out article_status);
                art.article_status = article_status;
                art.article_summary = Request["article_summary"];
                art.article_tag = Request["article_tag"];
                art.article_title = Request["article_title"];
                string[] color_split = Request["article_title_color"].Split(',');
                art.article_title_color = color_split[0];
                //string[] type_split = Request["article_type"].Split('|');
                int article_type = 0;
                int.TryParse(Request["article_type"], out article_type);
                art.article_type = article_type;
                art.article_image = Request["hfImage"];
                //修改单篇文章
                ass.Update(art);
            }
            Response.Redirect("/Admin/ArticleManage/");

            return View();
        }

        [AdminLoginCheck]
        public ActionResult ArticleEdit(int? id)
        {

            v.Put("list", BindlimitedClass("type_code <> 'news' and type_dict_code = 'article'"));
            initPageLeft("article");
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                v.Put("item", art);
                ArticleTagService ats = new ArticleTagService();
                IList<article_tag> taglist = ats.GetModelList();
                v.Put("taglist", taglist);
                v.Display("Manage/ArticleManage/ArticleEdit.cshtml");
            }
            return View();
        }

        public string ArticleStatus(int? id)
        {
            string outhtml = "ok";
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                string type = Request["type"];
                //静态化名称
                string filename = "article-item-" + art.article_id + ".html";
                switch (type)
                {
                    case "status": art.article_status = art.article_status == 1 ? 0 : 1; break;
                    case "top": art.article_is_top = art.article_is_top == true ? false : true; break;
                    case "html":
                        #region 静态化设置
                        //读取静态化配置
                        configService cs = new configService();
                        config config = cs.GetModelByCode("html");
                        config tmp = cs.GetModelByCode("tmp");
                        
                        if (config != null && tmp != null && config.config_status == 1 && tmp.config_status == 1)
                        {
                            if (art.article_html_url != "")
                            {
                                art.article_html_url = "";
                                string path = Server.MapPath(config.config_value) + filename;
                                if (System.IO.File.Exists(path)) try{ System.IO.File.Delete(path); }catch { }
                            }
                            else
                            {
                                //静态化模板目录
                                config ml = cs.GetModelByCode("prev");
                                if (ml == null) outhtml = "\"静态化模板前缀\"没有实例或者没有被启用!";
                                else
                                {
                                    v.Init("/Template/html/");//一定要init下 不然找不到目录很是蛋疼 - -!
                                    /****在这里设置页面需要的参数*****/
                                    //same parame 
                                    ArticleTagService ats = new ArticleTagService();
                                    IList<llm.Model.article_tag> taglist = ats.GetModelList();
                                    v.Put("taglist", taglist);

                                    commiteService css = new commiteService();
                                    IList<llm.Model.commite> clist = css.GetModelList("commite_status = 1 and commite_article_id=" + art.article_id + " order by commite_id desc");
                                    foreach (var item in clist) item.List = css.GetModelList("commite_status = 1 and commite_ref_id = " + item.commite_id + " order by commite_id asc");
                                    v.Put("clist", clist);
                                    v.Put("count", clist.Count());
                                    Util.StringHelper sh = new Util.StringHelper();
                                    v.Put("shelper", sh);
                                    v.Put("aid", art.article_id);

                                    pageService ps = new pageService();
                                    SysTypeService ts = new SysTypeService();
                                    IList<llm.Model.config> cclist = cs.GetModelList("config_status = 1");
                                    configs configs = new configs(cclist);
                                    IList<llm.Model.sys_type> tlist = ts.GetModelList2("type_status = 1");
                                    configs tconfig = new configs(tlist);
                                    IList<llm.Model.page> plist = ps.GetModelList("page_status = 1");
                                    configs pconfig = new configs(plist);
                                    v.Put("path", "/Template/Html");
                                    v.Put("json", configs);
                                    v.Put("tjson", tconfig);
                                    v.Put("pjson", pconfig);
                                    v.Put("q", "");
                                     

                                    v.Put("art", art); 
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
                                    IList<llm.Model.article_content> list = asc.GetModelList("content_article_id=" + art.article_id);
                                    if (list.Count == 0)
                                    {
                                        llm.Model.article_content c = new llm.Model.article_content();
                                        c.content_article_id = art.article_id;
                                        c.content_content = art.article_content;
                                        c.content_title = art.article_title;
                                        list.Add(c);
                                    }
                                     
                                    v.Put("count", css.GetCount((int)art.article_id).ToString());
                                    v.Put("list", list);
                                    v.Put("tag", tag);
                                  
                                    // and so so
                                    /********设置参数结束***********/

                                    art.article_html_url = filename;
                                    string dpath = Server.MapPath(config.config_value);
                                    System.IO.DirectoryInfo info = new System.IO.DirectoryInfo(dpath);
                                    if (!info.Exists) System.IO.Directory.CreateDirectory(dpath);
                                    v.CreateHtml(tmp.config_value, config.config_value, filename);
                                }
                            }
                        }
                        else { outhtml = "\"静态化路径配置\"或者\"静态化模板地址\"没有被启用!"; }
                        #endregion
                        break;
                    default: art.article_status = art.article_status == 1 ? 0 : 1; break;
                }
                
                ass.Update(art);
            }
            return outhtml;
        }

        [AdminLoginCheck]
        public string ArticleStop(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            if (art != null)
            {
                art.article_status = 0;
                ass.Update(art);
            }
            return "ok";
        }


        [AdminLoginCheck]
        public string ArticleDel(int? id)
        {
            ArticleService ass = new ArticleService();
            llm.Model.article art = ass.GetModelById((int)id);
            ass.Delete(art);
            return "ok";
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult ArticleAddDo()
        {

            llm.Model.article art = new article();
            art.article_cid = 0;
            art.article_content = Request["article_content"];
            art.article_guid = Guid.NewGuid().ToString();
            art.article_html_url = "";
            art.article_image = Request["hfImage"];
            art.article_is_bold = false;
            art.article_is_italic = false;
            art.article_is_top = Convert.ToBoolean(Request["article_is_top"]);
            art.article_pv = 0;
            art.article_ref_url = Request["article_ref_url"];
            art.article_remark = Request["article_remark"];
            art.article_seo_desc = Request["article_seo_desc"];
            art.article_seo_kw = Request["article_seo_kw"];
            art.article_shut_title = Request["article_shut_title"];
            art.article_source = Request["article_source"];
            int article_status = 0;
            int.TryParse(Request["article_status"], out article_status);
            art.article_status = article_status;
            art.article_summary = Request["article_summary"];
            art.article_tag = Request["article_tag"];
            art.article_time = DateTime.Now;
            art.article_title = Request["article_title"];
            string[] color_split = Request["article_title_color"].Split(',');
            art.article_title_color = color_split[0];
            //string[] type_split = Request["article_type"].Split('|');
            int article_type = 0;
            int.TryParse(Request["article_type"], out article_type);
            art.article_type = article_type;

            ArticleService ass = new ArticleService();
            //添加单篇文章
            int rows = 0;
            ass.Add2(art);
            
            //hfSaveType 判断是否需要添加分页
            string hfSaveType = Request["hfSaveType"];
            //添加后的URL跳转
            //string url = "";
            if (hfSaveType == "0") Response.Redirect("/Admin/ArticleManage/");
            else if (hfSaveType == "1") {
                IList<llm.Model.article> list = ass.GetModelList("article_guid='" + art.article_guid + "'");
                if (list.Count != 0)
                    rows = list[0].article_id;
                Response.Redirect("/Admin/ArticleContent/" + rows);  
            }

            //v.Display(url);
            return View();
        }


        /// <summary>
        /// /Admin/ArticleAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ArticleAdd()
        {
            v.Put("list", BindlimitedClass("type_code <> 'news' and type_dict_code = 'article' "));
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("sh", sh);
            initPageLeft("article");
            ArticleTagService ats = new ArticleTagService();
            IList<article_tag> taglist = ats.GetModelList();
            v.Put("taglist", taglist);

            v.Display("Manage/ArticleManage/ArticleAdd.cshtml");
            return View();
        }


        /// <summary>
        /// /Admin/ArticleManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult ArticleManage(int? id)
        {
            ArticleService ass = new ArticleService();
            #region 通用分页
            string url = "/Admin/ArticleManage/";
            string strwhere = "[sys_article] as art left join sys_type as ty on art.article_type = ty.type_id where 1=1 ";
            if (!string.IsNullOrEmpty(Request["t"]))
            {
                int tid = Convert.ToInt32(Request["t"]);
                strwhere += " and article_type in (select type_id from sys_type where type_parent = " + tid + " or type_id = " + tid + ") ";
                url += "?t=" + Request["t"] + "&id="; 
            }
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
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(content_id) from sys_article_content where content_article_id = article_id) as content_count");
            //v.Put("sql", PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "article_id desc", "*,(select count(content_id) from sys_article_content where content_article_id = article_id) as content_count"));

            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, url);
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.article> list = ass.GetModelListByPage(sql);
            v.Put("list", list);
            #endregion 
            initPageLeft("article");
            v.Display("Manage/ArticleManage/ArticleList.cshtml");
            return View();

            #region sql 以前2000 05 08的分页   
            //System.Text.StringBuilder strSql = new System.Text.StringBuilder();
            //int startIndex = 1, pagesize = 15, endIndex = pagesize;
            //if (id != null)
            //{
            //    //sql2000分页
            //    strSql.Append("SELECT top " + pagesize + "  *, ty.type_name FROM sys_article left join sys_type as ty on  article_type = ty.type_id where  article_id not in (select top " + (id * pagesize) + " article_id from  sys_article where 1=1 order by  article_time desc   )  order by  article_time desc");
            //    endIndex = (int)id * pagesize;
            //    startIndex = endIndex - pagesize + 1;// 起始数加1 采用 between and 分页  between 1 and 10 前十条  前十条到前二十条则  between 11 and 20
            //}
            //else {
            //    //sql2000分页
            //    strSql.Append("SELECT top " + pagesize + " * , ty.type_name FROM sys_article  left join sys_type as ty on article_type = ty.type_id  where 1=1 order by article_time desc  ");
            //}

            //Util.llmPage lp = new Util.llmPage(ass.GetCount(), pagesize, id == null ? 0 : (int)id, "/Admin/ArticleManage/");
            //v.Put("pageinfo", lp.Contents);
            //sql2005分页
            //strSql.Append("SELECT * FROM ( ");
            //strSql.Append(" SELECT ROW_NUMBER() OVER (");
            //strSql.Append("order by T.article_time desc");
            //strSql.Append(")AS Row, T.* , ty.type_name  from sys_article T  left join sys_type as ty on T.article_type = ty.type_id where 1=1 ");
            //strSql.Append(" ) TT");
            //strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            //IList<llm.Model.article> list = ass.GetListByPage(strSql.ToString());
            //v.Put("list", list);
            #endregion
            
        }

      

        #endregion

        #region 分类管理


        [AdminLoginCheck]
        public string TypeDel(int? id)
        {
            llm.Model.sys_type t = ts.GetModelById((int)id);
            ts.Delete(t);
            return "ok";
        }
        /// <summary>
        /// /Admin/TypeStatus/
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AdminLoginCheck]
        public string TypeStatus(int? id)
        {
            llm.Model.sys_type t = ts.GetModelById((int)id);
            if (t!=null)
            {
                t.type_status = t.type_status == 1 ? 0 : 1;
                ts.Update(t);
            } 
            return "ok";
        }
        
        /// <summary>
        /// /Admin/TypeModify/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public string TypeModify()
        {
            string error = "ok";

            try
            {
                llm.Model.sys_type type = ts.GetModelById(Convert.ToInt32(Request["type_id"]));
                if (type != null)
                {
                    string[] dict = Request["type_cid"].Split('|');
                    type.type_cid_name = dict[1].Replace("├", "").Replace("─", "");
                    type.type_cid = Convert.ToInt32(dict[0]);
                    type.type_detail = Request["type_detail"];
                    type.type_image = Request["type_image"];
                    type.type_content = Request["type_content"];
                    type.type_name = Request["type_name"];
                    type.type_dict_code = dict[2];
                    type.type_code = Request["type_code"];
                    type.type_order = Convert.ToInt32(Request["type_order"]);
                    string[] parent = Request["type_parent"].Split('|');
                    type.type_parent = Convert.ToInt32(parent[0]);
                    type.type_parent_name = parent[1].Replace("├", "").Replace("─", "");
                    type.type_summary = Request["type_summary"];
                    type.type_position = Request["type_position"];
                    
                    if (type.type_parent != 0)
                    {
                        llm.Model.sys_type _type = ts.GetModelById((int)type.type_parent);
                        if (_type!=null)
                        {
                            type.type_path = _type.type_path + type.type_id + "|";
                        }
                    }
                    else {
                        type.type_path = "|"+type.type_id+"|";
                    }
                    ts.Update(type);
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }

        /// <summary>
        /// /Admin/DcitEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public JsonResult TypeEdit(int? id)
        { 
            llm.Model.sys_type t = ts.GetModelById((int)id);
            var res = new JsonResult();
            res.Data = t;
            return res;
        }

        /// <summary>
        /// /Admin/TypeAdd/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [ValidateInput(false)]
        public string TypeAdd()
        {
            string error = "ok";

            try
            {
                llm.Model.sys_type type = new sys_type();
                string[] dict = Request["type_cid"].Split('|');
                type.type_cid_name = dict[1].Replace("├", "").Replace("─", "");
                type.type_cid = Convert.ToInt32(dict[0]);
                type.type_depth = 0;
                type.type_dict_code = dict[2];
                type.type_code = Request["type_code"];
                type.type_detail = Request["type_detail"];
                type.type_guid = Guid.NewGuid().ToString();
                type.type_image = Request["type_image"];
                type.type_content = Request["type_content"];
                type.type_name = Request["type_name"];
                type.type_order = Convert.ToInt32(Request["type_order"]);
                string[] parent = Request["type_parent"].Split('|');
                type.type_parent = Convert.ToInt32(parent[0]);
                type.type_parent_name = parent[1].Replace("├", "").Replace("─", "");
                type.type_position = "";
                type.type_status = 1;
                type.type_summary = Request["type_summary"];
                type.type_position = Request["type_position"];
                type.type_time = DateTime.Now;
                type.type_url = "";
                type.type_role = User.Identity.Name;
                ts.Add(type);
                type = ts.GetModelList("type_guid='" + type.type_guid + "'")[0];

                if (type.type_parent != 0)
                {
                    llm.Model.sys_type _type = ts.GetModelById((int)type.type_parent);
                    if (_type != null)
                    {
                        type.type_path = _type.type_path + type.type_id + "|";
                    }
                }
                else
                {
                    type.type_path = "|" + type.type_id + "|";
                }
                ts.Update(type);
                
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }
        /// <summary>
        /// /Admin/DictDel/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string DictDel()
        {
            dictService dss = new dictService();
            llm.Model.dict dict = dss.GetModelById(Convert.ToInt32(Request["id"]));
            dss.Delete(dict);
            return "ok"; 
        }


        /// <summary>
        /// /Admin/upload/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult upload()
        {
            v.Display("Manage/TypeManage/upload.cshtml");
            return View();

        }

        /// <summary>
        /// /Admin/upload/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string doUpload(int? id)
        {
            string outhtml = "";
            if (Request.Files["upl"] != null)
            {
                string filename = Request.Files["upl"].FileName;
                string exten = System.IO.Path.GetExtension(filename).ToLower();

                if (id != null)
                {
                    if (id == 2)
                    {
                        DateTime dt = DateTime.Now;
                        string time_dict = dt.Year + "-" + dt.Month + "-" + dt.Day;
                        string savefilename = dt.Year + dt.Month + dt.Day + "_" + dt.Hour + dt.Minute + dt.Second + exten;
                        if (exten == ".jpg" || exten == ".jpeg" || exten == ".gif" || exten == ".png")
                        {
                            string _savepath = Server.MapPath("/content/upload/b/" + time_dict);
                            if (!System.IO.Directory.Exists(_savepath))
                            {
                                System.IO.Directory.CreateDirectory(_savepath);
                            }
                            string savepath = _savepath + "/normal_" + savefilename;
                            string savepath2 = _savepath + "/thumb_" + savefilename;
                            Request.Files["upl"].SaveAs(savepath);
                            System.Drawing.Image upimg = null;
                            upimg = System.Drawing.Image.FromFile(savepath);
                            int width, height, newwidth, newheight;
                            width = upimg.Width; //原图宽
                            height = upimg.Height;//原图高
                            newwidth = 200;
                            newheight = (int)((double)height / (double)width * (double)newwidth);
                            SaveHDthumbnail(newwidth, newheight, savepath2, upimg, exten);
                            upimg.Dispose();
                            outhtml = "/content/upload/b/" + time_dict + "/thumb_" + savefilename;
                        }
                    }//暂时没用
                    else if (id == 3)
                    {
                        DateTime dt = DateTime.Now;
                        string time_dict = dt.Year + "-" + dt.Month + "-" + dt.Day;
                        Random rd = new Random();
                        string savefilename = dt.Year + dt.Month + dt.Day + "_" + dt.Hour + dt.Minute + dt.Second + dt.Millisecond + rd.Next(0, 99999999) + exten;
                        if (exten == ".jpg" || exten == ".jpeg" || exten == ".gif" || exten == ".png")
                        {
                            string _savepath = Server.MapPath("/content/upload/c/" + time_dict);
                            if (!System.IO.Directory.Exists(_savepath))
                            {
                                System.IO.Directory.CreateDirectory(_savepath);
                            }
                            string savepath = _savepath + "/normal_" + savefilename;
                            string savepath2 = _savepath + "/thumb_" + savefilename;
                            Request.Files["upl"].SaveAs(savepath);
                            System.Drawing.Image upimg = null;
                            upimg = System.Drawing.Image.FromFile(savepath);
                            int width, height, newwidth, newheight;
                            width = upimg.Width; //原图宽
                            height = upimg.Height;//原图高
                            newwidth = 160;
                            newheight = (int)((double)height / (double)width * (double)newwidth);
                            SaveHDthumbnail(newwidth, newheight, savepath2, upimg, exten);
                            upimg.Dispose();
                            outhtml = "/content/upload/c/" + time_dict + "/thumb_" + savefilename;
                            //System.Threading.Thread.Sleep(1000);
                            //Response.Write(Request.Files["upl"].ToString());
                        }
                    }
                    else if (id == 9)
                    {
                        outhtml = "ok";
                        if (exten == ".zip" || exten == ".rar")
                        {
                            string savepath = Server.MapPath(Request["hfPath"] + "/zip.rar");
                            Request.Files["upl"].SaveAs(savepath);
                            Util.Tools.unzip(savepath, savepath.Replace("zip.rar", ""));
                            System.IO.File.Delete(savepath);
                        }
                        else if (exten == ".jpg" || exten == ".jpeg" || exten == ".gif" || exten == ".png" || exten == ".htm" || exten == ".html" || exten == ".js" || exten == ".css")
                        {
                            string savepath = Server.MapPath(Request["hfPath"] + "/" + filename);
                            Request.Files["upl"].SaveAs(savepath);
                            //outhtml = Request["hfPath"] + "/" + filename;
                        }
                        else
                            outhtml = "请选择.rar或者.zip文件或者.jpg .jpeg .gif .png .htm .html .js .css格式文件!";
                    }

                }

                else
                {
                    if (exten == ".zip" || exten == ".rar")
                    {
                        string savepath = Server.MapPath("/content/html/zip.rar");
                        Request.Files["upl"].SaveAs(savepath);
                        Util.Tools.unzip(savepath, savepath.Replace("zip.rar", ""));
                        System.IO.File.Delete(savepath);
                    }
                    else if (exten == ".jpg" || exten == ".jpeg" || exten == ".gif" || exten == ".png")
                    {
                        string savepath = Server.MapPath("/content/upload/b/" + filename);
                        Request.Files["upl"].SaveAs(savepath);
                        outhtml = "/content/upload/b/" + filename;
                    }
                    else
                        outhtml = "请选择.rar或者.zip文件";
                }
            }
            return outhtml;

        }

        #region 图片上传

        private void MakeThumb(HttpContext context)
        {
            string file;
            int w, h, x, y;
            file = context.Request["file"];
            w = Convert.ToInt32(context.Request["w"]);
            h = Convert.ToInt32(context.Request["h"]);
            x = Convert.ToInt32(context.Request["x"]);
            y = Convert.ToInt32(context.Request["y"]);
            string filePath = context.Server.MapPath(file);
            System.Drawing.Bitmap c = GetPartOfImage(filePath, w, h, x, y);
            filePath = filePath.Replace("large", "normal");
            int newwidth = 0, newheight = 0, width = c.Width, height = c.Height;
            bool flag = true;
            if (c.Width > 160)
            {
                newwidth = 160;
                newheight = (int)((double)height / (double)width * (double)newwidth);
                flag = false;
            }
            //
            if (c.Height > 160)
            {
                newwidth = (int)(160 * (double)newwidth / (double)newheight);
                newheight = 160;
                flag = false;
            }

            //保存310的高清缩略图


            if (flag)
            {
                c.Save(filePath);
            }
            else
            {

                // SaveHDthumbnail(newwidth, newheight, filePath, c, extenName);
            }

            //c.Save(filePath.Replace("large", "normal"));
            c.Dispose();//释放缩略图 
            context.Response.Write(file.Replace("large", "normal"));
        }
        /// <summary>
        /// 截取主方法
        /// </summary>
        /// <param name="bitmapPahtAndName">原图地址</param>
        /// <param name="width">截取宽度</param>
        /// <param name="height">截取高度</param>
        /// <param name="offsetX">起点X坐标</param>
        /// <param name="offsetY">起点Y坐标</param>
        /// <returns></returns>
        public System.Drawing.Bitmap GetPartOfImage(string bitmapPahtAndName, int width, int height, int offsetX, int offsetY)
        {
            System.Drawing.Bitmap sourceBitmap = new System.Drawing.Bitmap(bitmapPahtAndName);
            System.Drawing.Bitmap resultBitmap = new System.Drawing.Bitmap(width, height);
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    if (offsetX + x < sourceBitmap.Size.Width & offsetY + y < sourceBitmap.Size.Height)
                    {
                        resultBitmap.SetPixel(x, y, sourceBitmap.GetPixel(offsetX + x, offsetY + y));
                    }
                }
            }

            sourceBitmap.Dispose(); //释放原图
            return resultBitmap;
        }
        

        private void SaveHDthumbnail(int newwidth, int newheight, string savefileName, System.Drawing.Image upimg, string extenName)
        {
            int x = 0;//左上角的x坐标 
            int y = 0;//左上角的y坐标 
            //新建一个bmp图片 
            System.Drawing.Image bitmap = new System.Drawing.Bitmap(newwidth, newheight);
            //新建一个画板 
            System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmap);

            //设置高质量插值法 
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
            //设置高质量,低速度呈现平滑程度 
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            //清空画布并以透明背景色填充 
            g.Clear(System.Drawing.Color.Transparent);
            //在指定位置并且按指定大小绘制原图片的指定部分 
            g.DrawImage(upimg, x, y, newwidth, newheight);

            if (extenName.ToLower() == ".png")
            {
                bitmap.Save(savefileName, System.Drawing.Imaging.ImageFormat.Png);
            }
            else
            {
                bitmap.Save(savefileName, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
        }

        public  bool ThumbnailCallback()
        {
            return false;
        }

        #endregion

        /// <summary>
        /// /Admin/DictModify/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string DictModify()
        {
            dictService dss = new dictService();
            llm.Model.dict dict = dss.GetModelById(Convert.ToInt32(Request["id"]));
            if (dict != null)
            {
                dict.dict_name = Request["dict_name"];
                dict.dict_code = Request["dict_code"];
                dict.dict_pid = Convert.ToInt32(Request["dict_pid"]);
                dss.Update(dict);
            }

            return "ok";
        }

        /// <summary>
        /// /Admin/DcitEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public JsonResult DictEdit(int? id)
        {
            dictService dss = new dictService();
            llm.Model.dict dict = dss.GetModelById((int)id);
            var res = new JsonResult();
            res.Data = dict;
            return res;
        }

        /// <summary>
        /// /Admin/AddDcit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string AddDcit()
        {
            dictService dss = new dictService();
            llm.Model.dict dict = new llm.Model.dict();
            dict.dict_name = Request["dict_name"];
            dict.dict_code = Request["dict_code"];
            dict.dict_pid = Convert.ToInt32(Request["dict_pid"]);
            dict.dict_guid = Guid.NewGuid().ToString();
            dict.dict_status = 1;
            dss.Add(dict);
            return "";
        }

        /// <summary>
        /// /Admin/DictList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult DictList()
        {
            dictService dss = new dictService();
            IList<dict> alllist = dss.GetModelList();

            Util.StringHelper sh = new Util.StringHelper();
            v.Put("sh", sh);
            v.Put("list", alllist);

            v.Put("dictlist", BindlimitedDict());

            v.Display("Manage/DictManage/DictList.cshtml");
            return View();
        }



        /// <summary>
        /// /Admin/TypeList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult TypeList(int? id)
        {
            #region typelist
            #region between and  
            //between and 分页
            //int startIndex = 1, pagesize = 15, endIndex = pagesize;
            //if (id != null)
            //{
            //    endIndex = (int)id * pagesize;
            //    startIndex = endIndex - pagesize + 1;
            //}
            #endregion 
           
            
           
            
            #region 通用分页

            string path = "";
            string type_name = "";
            string strwhere = "[sys_type] where 1=1 ";
            if (!string.IsNullOrEmpty(Request["path"]))
            {
                path = "|" + Request["path"].Replace("|", "") + "|";
                strwhere += " and type_path like '%" + path + "%'";
            }
            if (!string.IsNullOrEmpty(Request["type_name"]))
            {
                type_name = Request["type_name"];
                strwhere += " and type_name like '%" + type_name + "%'";
            } 
            v.Put("path", string.IsNullOrEmpty(Request["path"]) ? "" : Request["path"].Replace("|", ""));
            v.Put("type_name", type_name);
            //通用分页  
            int pageindex = 1, pagesize = 10;
            pageindex = id != null ? (int)id * pagesize : pagesize; 

            /*通用型sql 分页 满足 access sql2000 sql05 sql08 
            * 创建条件sql搜索满足要求的总数量 
            * 需要传入表名 
            * 表名后可加入搜索条件
            */
            string sqlCount = PagingHelper.CreateCountingSql(strwhere);
            int rows = ts.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(rows, pagesize, id == null ? 0 : (int)id, strwhere, "type_order asc,type_id desc");
            //分页控件
            Util.llmPage lp = new Util.llmPage(rows, pagesize, id == null ? 0 : (int)id, "/Admin/TypeList/");
            v.Put("pageinfo", lp.Contents);
            IList<llm.Model.sys_type> list = ts.GetModelListByPage(sql);
            v.Put("list", list);
            #endregion
            //v.Put("sql", sql); 
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("sh", sh); 
            //设置无限分类集合
            v.Put("newtypelist", BindlimitedClass(null));
            #endregion

            #region dictlist
            v.Put("dictlist", BindlimitedDict());
            #endregion
            
            v.Display("Manage/TypeManage/TypeList.cshtml");
            return View();
        }

        #region 绑定无限分类

        //绑定顶级分类
        private IList<sys_type> BindlimitedClass(string where)
        {
            string method = where == null ? "GetListWhere" : "GetListWhere2";
            //取出所有分类 返回DataTable 对象
            DataTable dt = ts.GetListWhere("sys_type." + method, where);
            //用于显示的分类集合 本例中为 sys_type对象集合 
            //给予type_id 和 type_name 赋值
            IList<sys_type> typelist = new List<sys_type>();
            sys_type st = new sys_type();
            //寻找所有大分类 type_parent = 0
            DataRow[] drs = dt.Select("type_parent = 0");
            if (drs.Count() == 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    string classid = dr["type_id"].ToString();
                    string classname = dr["type_name"].ToString(); 
                    st = new sys_type();
                    st.type_id = Convert.ToInt32(classid);
                    st.type_name = classname;
                    typelist.Add(st);
                }
            }
            else
            {
                foreach (DataRow dr in drs)
                {
                    string classid = dr["type_id"].ToString();
                    string classname = dr["type_name"].ToString();
                    //顶级分类显示形式
                    //classname = "╋" + classname;
                    st = new sys_type();
                    st.type_id = Convert.ToInt32(classid);
                    st.type_name = classname;
                    typelist.Add(st);
                    //当前元素的type_id 用于和子元素的type_parent做对比
                    int sonparentid = int.Parse(classid);
                    string blank = "├";
                    //递归子分类方法
                    BindNode(sonparentid, dt, blank, typelist);
                }
            }
            return typelist;

        }
        //绑定子分类
        private void BindNode(int parentid, DataTable dt, string blank, IList<sys_type> typelist)
        {
            //集合中寻找与上级元素 type_id 等值的对象集合 
            //type_parent 用于记录上级type_id值
            DataRow[] drs = dt.Select("type_parent= " + parentid);
            foreach (DataRow dr in drs)
            {
                string classid = dr["type_id"].ToString();
                string classname = dr["type_name"].ToString();
                classname = blank + classname;
                sys_type st = new sys_type();
                st.type_id = Convert.ToInt32(classid);
                st.type_name = classname;
                typelist.Add(st);
                //当前元素的type_id 用于和子元素的type_parent做对比
                int sonparentid = int.Parse(classid);
                string blank2 = blank + "─";
                BindNode(sonparentid, dt, blank2, typelist);
            }
        }


        //绑定顶级分类
        private IList<dict> BindlimitedDict()
        {
            //取出所有分类 返回DataTable 对象
            dictService dss = new dictService();
            DataTable dt = dss.GetListWhere("dict.GetListWhere", null);
            //用于显示的分类集合 本例中为 dict对象集合 
            //给予type_id 和 type_name 赋值
            IList<dict> typelist = new List<dict>();
            dict st = new dict();
            //寻找所有大分类 type_parent = 0
            DataRow[] drs = dt.Select("dict_pid = 0");

            foreach (DataRow dr in drs)
            {
                string classid = dr["dict_id"].ToString();
                string classname = dr["dict_name"].ToString();
                st = new dict();
                st.dict_id = Convert.ToInt32(classid);
                st.dict_name = classname;
                st.dict_code = dr["dict_code"].ToString();
                typelist.Add(st);
                //当前元素的type_id 用于和子元素的type_parent做对比
                int sonparentid = int.Parse(classid);
                string blank = "├";
                //递归子分类方法
                BindDictNode(sonparentid, dt, blank, typelist);
            }
            return typelist;

        }
        //绑定子分类
        private void BindDictNode(int parentid, DataTable dt, string blank, IList<dict> typelist)
        {
            //集合中寻找与上级元素 type_id 等值的对象集合 
            //type_parent 用于记录上级type_id值
            DataRow[] drs = dt.Select("dict_pid= " + parentid);
            foreach (DataRow dr in drs)
            {
                string classid = dr["dict_id"].ToString();
                string classname = dr["dict_name"].ToString();
                classname = blank + classname;
                dict st = new dict();
                st.dict_id = Convert.ToInt32(classid);
                st.dict_name = classname;
                typelist.Add(st);
                //当前元素的type_id 用于和子元素的type_parent做对比
                int sonparentid = int.Parse(classid);
                string blank2 = blank + "─";
                BindDictNode(sonparentid, dt, blank2, typelist);
            }
        }

        #endregion


        #endregion

        #region IconManage

        [AdminLoginCheck]
        [Authorize]
        public string EditIconStatus(int id, string col)
        {
            IBatisServer.IconService iss = new IBatisServer.IconService();
            llm.Model.icon ic = iss.GetModelById((int)id);
            string outhtml = string.Empty;
            if (ic != null)
            {
                if (col == "resize")
                {
                    ic.icon_resize = ic.icon_resize == true ? false : true;
                }
                if (col == "status")
                {
                    ic.icon_status = ic.icon_status == 1 ? 0 : 1;
                }
                iss.Update(ic);
                outhtml = "ok";
            }
            else { outhtml = "no"; }
            return outhtml;
        }

        /// <summary>
        /// /Admin/IconEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string IconDel(int? id)
        {
            IBatisServer.IconService iss = new IBatisServer.IconService();
            llm.Model.icon icon = iss.GetModelById((int)id);
            iss.Delete(icon);

            return "ok";
        }


        [AdminLoginCheck]
        public string IconAdd(int? id)
        {
            IBatisServer.IconService iss = new IBatisServer.IconService();
            llm.Model.icon icon = iss.GetModelById((int)id);
            if (icon != null)
            {
                try
                {
                    iss.Add(icon);
                }
                catch
                {

                }
            }
            return "ok";
        }
        /// <summary>
        /// /Admin/IconEnable/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string IconEnable(int? id)
        {
            IBatisServer.IconService iss = new IBatisServer.IconService();
            llm.Model.icon icon = iss.GetModelById((int)id);
            icon.icon_status = 0;
            iss.Update(icon);

            return "ok";
        }
        /// <summary>
        /// /Admin/IconName/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string IconName(int? id)
        {
            IBatisServer.IconService iss = new IBatisServer.IconService();
            llm.Model.icon icon = iss.GetModelById((int)id);
            if (icon!=null)
            {
                icon.icon_name = Request["name"];
                iss.Update(icon);
            }  
            return "ok";
        }
        
        /// <summary>
        /// /Admin/IconModify/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        [HttpPost]
        public string IconModify(int? id)
        {
            IBatisServer.IconService iss = new IBatisServer.IconService();
            llm.Model.icon ic = iss.GetModelById((int)id);
            string outhtml = string.Empty;
            if (ic != null)
            {
                ic.icon_position_x = Convert.ToInt32(Request["icon_position_x"]);
                ic.icon_position_y = Convert.ToInt32(Request["icon_position_y"]);
                ic.icon_css = Request["icon_css"];
                ic.icon_image = string.IsNullOrEmpty(Request["icon_image"]) ? ic.icon_image : Request["icon_image"];
                ic.icon_init_h = string.IsNullOrEmpty(Request["icon_init_h"]) ? "" : Request["icon_init_h"];
                ic.icon_init_w = string.IsNullOrEmpty(Request["icon_init_w"]) ? "" : Request["icon_init_w"];
                ic.icon_item_css = Request["icon_item_css"];
                ic.icon_name = Request["icon_name"];
                string icon_resize = Request["icon_resize"];
                string icon_status = Request["icon_status"];
                ic.icon_resize = Convert.ToBoolean(Request["icon_resize"]);
                ic.icon_status = Convert.ToInt32(Request["icon_status"]);
                ic.icon_url = Request["icon_url"];
                iss.Update(ic);
                outhtml = "ok";
            }
            else
            {
                outhtml = "no";
            }
            return outhtml;
        }


        /// <summary>
        /// /Admin/IconEdit/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public JsonResult IconEdit(int? id)
        {
            llm.Model.icon icon = iss.GetModelById((int)id);
            //v.Put("icon", icon);
            var res = new JsonResult();
            res.Data = icon;
            return res;
            //v.Display("Manage/IconManage/IconEdit.cshtml");
            //return View();
        }


        /// <summary>
        /// /Admin/IconManage/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult IconManage(int? id)
        {
            int pageindex = 1, pagesize = 10; 
            pageindex = id != null ? (int)id * pagesize : pagesize;
            Util.llmPage lp = new Util.llmPage(iss.GetCount(), pagesize, id == null ? 0 : (int)id, "/Admin/IconManage/");
            v.Put("pageinfo", lp.Contents);
            //通用分页  
            IList<llm.Model.icon> list = iss.GetModelListByPage(pagesize, pageindex);
            v.Put("list", list);
            v.Display("Manage/IconManage/IconList.cshtml");
            return View();
        }

        /// <summary>
        /// /Admin/IconList/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public JsonResult IconList()
        {
            IList<llm.Model.icon> list = iss.GetModelList(" and icon_status = 1");
            var res = new JsonResult();
            res.Data = list;
            return res; 
        }
        /// <summary>
        /// /Admin/setPostion/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string setPostion(int id, int x, int y)
        {
            llm.Model.icon ic = iss.GetModelById(id);
            string outhtml = string.Empty;
            if (ic != null)
            {
                ic.icon_position_x = x;
                ic.icon_position_y = y;
                iss.Update(ic);
                outhtml = "ok";
            }
            return outhtml;
        }
        #endregion

        #region 系统管理
        // GET: /Admin/SetBg/
        [HttpPost]
        [AdminLoginCheck]
        public string SetBg()
        {
            string outhtml = "ok";
            int type = Convert.ToInt32(Request["type"]);
            string url = Request["url"];
            configService cs = new configService();
            llm.Model.config c = cs.GetModelById(100);
            if (c!=null)
            {
                c.config_value = url;
                c.config_type = type;
                cs.Update(c);
            }
            return outhtml;
        } 
        
        #endregion

        #region login loginout Desk
        // GET: /Admin/ 
        [AdminLoginCheck]
        public ActionResult Art()
        {

            IList<icon> list = iss.GetModelList(" and icon_status = 1 ");
            configService cs = new configService();
            llm.Model.config c = cs.GetModelById(100);
            v.Put("sys", c);
            v.Put("list", list);

            v.Display("Art.cshtml");
            return View();
        }

        // GET: /Admin/ 
        [AdminLoginCheck]
        public ActionResult Index()
        {
            IList<icon> list = iss.GetModelList(" and icon_status = 1 ");
            v.Put("list", list);
            configService cs = new configService();
            //sys_background
            llm.Model.config c = cs.GetModelByCode("sys_background");
            v.Put("sys", c);
            llm.Model.config skin = cs.GetModelByCode("skin");
            v.Put("skin", skin);
            v.Display("art.cshtml");
            return View();
        }
        public ActionResult Login()
        {
            v.Put("returnrul", HttpContext.Request["ReturnUrl"]);
            v.Display("Login.cshtml");

            return View();
        }

        [HttpPost]
        public string Login(string ReturnUrl)
        {
            string html = "";


            if (!string.IsNullOrEmpty(ReturnUrl))
            {
                bool issafe = Util.Tools.IsUrlLocalToHost(this.HttpContext, ReturnUrl);
                if (issafe)
                {
                    html = ReturnUrl;
                    //login check
                    string name = Request["u"];
                    string pwd = Util.MD5Reg.formatePwd(Request["p"]);

                    adminService ass = new adminService();
                    llm.Model.admin admin = ass.GetModelByName(name);
                    if (admin != null)
                    {
                        if (admin.admin_pwd == pwd)
                        {
                            html = "/Admin/";
                            System.Web.Security.FormsAuthentication.SetAuthCookie(name, true);
                            //Session["LOGIN-MANAGE"] = admin;
                            //html = "admin";
                        }
                        else
                        {
                            html = "no";
                        }
                    }
                    else
                    {
                        html = "no";
                    }

                }
                else
                    html = "/Admin/";
            }
            else
                html = "/Admin/";  

            return html;
        }
        public ActionResult LoginOut()
        {
            System.Web.Security.FormsAuthentication.SignOut();
            Response.Redirect("/Admin/Login/");
            return View();
        }

        /// <summary>
        /// /Admin/Password/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public ActionResult Password()
        {
            //v.Put("name", User.Identity.Name);
            //Response.Write("User.Identity.Name" + User.Identity.Name);
            string uname = User.Identity.Name;
            if (!string.IsNullOrEmpty(uname))
            {
                adminService ass = new adminService();
                llm.Model.admin admin = ass.GetModelByName(uname);
                if (admin != null)
                {
                    v.Put("model", admin);
                }
                else
                {
                    Response.Redirect("/Admin/Login/");
                }
            }
            else
            {
                Response.Redirect("/Admin/Login/");
            }
            v.Display("Manage/WebManage/password.cshtml");
            return View();
        }

        /// <summary>
        /// /Admin/Password/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string OldPassword()
        {
            string outhtml = "ok";
            if (!string.IsNullOrEmpty(User.Identity.Name))
            {
                adminService ass = new adminService();
                llm.Model.admin admin = ass.GetModelByName(User.Identity.Name);
                if (admin != null)
                {
                    if (admin.admin_pwd == Util.MD5Reg.formatePwd(Request["p"]))
                    {
                        outhtml = "ok";
                    }
                    else
                    {
                        outhtml = "no";
                    }
                }
                else
                {
                    outhtml = "no";
                }
            }
            else
            {
                Response.Redirect("/Admin/Login/");
            }

            return outhtml;
        }
        /// <summary>
        /// /Admin/Password/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string DoPassword()
        {
            string outhtml = "ok";
            if (!string.IsNullOrEmpty(User.Identity.Name))
            {
                adminService ass = new adminService();
                llm.Model.admin admin = ass.GetModelByName(User.Identity.Name);
                if (admin != null)
                {

                    admin.admin_pwd = Util.MD5Reg.formatePwd(Request["admin_pwd"]);
                    ass.Update(admin);
                    //outhtml = "ok" + Request["admin_pwd"]; 

                }
                else
                {
                    Response.Redirect("/Admin/Login/");
                }
            }
            else
            {
                Response.Redirect("/Admin/Login/");
            }

            return outhtml;
        }

        #endregion
    }
}
