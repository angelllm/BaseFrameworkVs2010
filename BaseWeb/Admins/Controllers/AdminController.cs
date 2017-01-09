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
    public class AdminController : BaseController
    {
        // GET: /Admin/
        [AdminLoginCheck]
        public ActionResult Index()
        {
            ArticleService ass = new ArticleService();
            IList<article> articlelist = ass.GetModelListByPageUseTopForLand(10, 10, " and Article_status = 1 ");
            v.Put("articlelist", articlelist);
            foreach (var item in articlelist)
                item.article_guid = item.article_time.Value.Month + "-" + item.article_time.Value.Day;
            memberService ms = new memberService();
            IList<member> memberlist = ms.GetModelListByPageUseTop(10, 10, "");
            v.Put("memberlist", memberlist);

            v.Display("index.html");
            return View();
        }

        
        #region 评论管理

        [AdminLoginCheck]
        public ActionResult CommiteList(int? id)
        {
            commiteService ms = new commiteService();
            commite commite = ms.GetTotalCountAndNewCount("");
            v.Put("commite", commite);
            v.Display("manage/CommiteManage/list.html");
            return View();
        }

        [AdminLoginCheck]
        public JsonResult GetCommiteList(int pagesize, int pageindex, string w)
        {
            JsonResult jr = new JsonResult();
            commiteService ms = new commiteService();
            IList<commite> list = null;
            try
            {
                list = ms.GetModelListByPageUseTop(pagesize, pageindex * pagesize, "");
            }
            catch
            {
                Response.Redirect("/admin/error/");
            }
            jr.Data = list;


            return jr;
        }

        public JsonResult CommiteCheck(string member_name)
        {
            JsonResult jr = new JsonResult();
            memberService ms = new memberService();
            member m = ms.GetModelByName(member_name);
            jr.Data = m != null ? false : true;
            return jr;
        }
        public JsonResult modifyCommiteStatus(int? id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            commiteService ts = new commiteService();
            commite t = null;
            try
            {
                t = ts.GetModelById((int)id);
                if (t != null)
                {
                    t.commite_status = t.commite_status == 1 ? 0 : 1;
                    ts.Update(t);

                }
            }
            catch
            {
                t = new commite();
            }
            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }
        

        [AdminLoginCheck]
        public JsonResult DelCommite(int? id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            commiteService ts = new commiteService();
            commite t = null;
            try
            {
                t = ts.GetModelById((int)id);
                if (t != null)
                {
                     
                        ts.Delete(t);
                    
                }
            }
            catch
            {
                t = new commite();
            }
            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult DelCommiteList(string id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            commiteService ts = new commiteService();
            string[] idlist = id.Split(',');
            foreach (var item in idlist)
            {
                commite t = ts.GetModelById(Convert.ToInt32(item));
                if (t != null)
                {
                    ts.Delete(t);
                }
            }

            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

      

        [AdminLoginCheck]
        public ActionResult CommiteReplay(int? id)
        {
            commiteService ms = new commiteService();
            commite cc = ms.GetModelById((int)id);
            v.Put("model", cc);
            v.Display("manage/commiteManage/commiteReplay.html");
            return View();
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoCommiteReplay(int? id)
        {
            commiteService ms = new commiteService();
            commite cc = ms.GetModelById((int)id);
            if (cc != null)
            {
                commite replay = new commite();
                replay.commite_article_id = cc.commite_article_id;
                replay.commite_content = Request["commite_content"];
                replay.commite_email = "574589608@qq.com";
                replay.commite_ip = Util.getIP.GetUserIP();
                replay.commite_ref_id = id;
                replay.commite_status = 1;
                replay.commite_time = DateTime.Now;
                replay.commite_uhead = "/Template/land/images/user-def.png";
                replay.commite_uid = 103;
                replay.commite_uname = "aliks";
                replay.commite_url = "http://www.llmztt.com/land/";
                ms.Add(replay);

            }
            Response.Redirect("/admin/commitelist/");
            return View();
        }

        #endregion

        #region 会员管理
        [AdminLoginCheck]
        public ActionResult MemberList(int? id)
        {
            memberService ms = new memberService();
            member m = ms.GetTotalCountAndNewCount("");
            v.Put("model", m);
            v.Put("type", "");
            v.Display("manage/memberManage/list.html");
            return View();
        }

        [AdminLoginCheck]
        public JsonResult GetMemberList(int pagesize, int pageindex, string w)
        {
            JsonResult jr = new JsonResult();
            memberService ms = new memberService();
            IList<member> list = null;
            try
            {
                list = ms.GetModelListByPageUseTop(pagesize, pageindex * pagesize, "");
            }
            catch
            {
                Response.Redirect("/admin/error/");
            }
            jr.Data = list;


            return jr;
        }

        public JsonResult MemberCheck(string member_name)
        {
            JsonResult jr = new JsonResult();
            memberService ms = new memberService();
            member m = ms.GetModelByName(member_name);
            jr.Data = m != null ? false : true;
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult DelMember(int? id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            SysTypeService ts = new SysTypeService();
            sys_type t = null;
            try
            {
                t = ts.GetModelById((int)id);
                if (t != null)
                {
                    if (t.type_role == "llm")
                    {
                        outhtml = "系统应用无法删除，请联系管理员！";
                    }
                    else
                    {
                        ts.Delete(t);
                    }
                }
            }
            catch
            {
                t = new sys_type();
            }
            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult DelMemberList(string id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            SysTypeService ts = new SysTypeService();
            string[] idlist = id.Split(',');
            foreach (var item in idlist)
            {
                sys_type t = ts.GetModelById(Convert.ToInt32(item));
                if (t != null)
                {
                    if (t.type_role == "llm")
                    {
                        outhtml = "系统应用无法删除，请联系管理员！";
                    }
                    else
                    {
                        ts.Delete(t);
                    }
                }
            }

            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoMemberAdd()
        {
            memberService ms = new memberService();
            member m = ms.GetModelByName(Util.SQL.NoHTML_2(Request["member_name"]));
            if (m == null)
            {
                #region 无用的属性
                m.member_baby_age = 0;
                m.member_baby_sex = 0;
                m.member_integral_use = 0;
                m.member_phone_last_four = 0;
                m.member_baby_birdthday = DateTime.Now;
                m.member_login_out_time = DateTime.Now;
                m.member_login_time = DateTime.Now;
                m.member_modify_time = DateTime.Now;
                m.member_time = DateTime.Now;
                m.member_reg_time = DateTime.Now;
                m.member_baby_name = "";
                m.member_login_ame = "";
                m.member_opera_pwd = "";
                m.member_safe_pwd = "";
                m.member_shop_id = "";
                m.member_nick_name = "";
                #endregion
                m.member_birthday = Util.SQL.NoHTML_2(Request["member_birthday"]);
                m.member_company = Util.SQL.NoHTML_2(Request["member_company"]);
                m.member_email = Util.SQL.NoHTML_2(Request["member_email"]);
                m.member_face = Util.SQL.NoHTML_2(Request["member_face"]);
                m.member_integral = Convert.ToInt32(Request["member_integral"]);
                m.member_name = Util.SQL.NoHTML_2(Request["member_name"]);
                m.member_number = Util.SQL.NoHTML_2(Request["member_number"]);
                m.member_phone = Util.SQL.NoHTML_2(Request["member_phone"]);
                m.member_pwd = Util.MD5Reg.formatePwd(Util.SQL.NoHTML_2(Request["member_pwd"]));
                m.member_qq = Util.SQL.NoHTML_2(Request["member_qq"]);
                m.member_real_name = Util.SQL.NoHTML_2(Request["member_real_name"]);
                m.member_remark = Request["member_remark"];//富文本
                m.member_school = Util.SQL.NoHTML_2(Request["member_school"]);

                m.member_tel = Util.SQL.NoHTML_2(Request["member_tel"]);
                m.member_upload = Util.SQL.NoHTML_2(Request["member_upload"]);
                m.member_work = Util.SQL.NoHTML_2(Request["member_work"]);
                m.member_zhaohui = Util.SQL.NoHTML_2(Request["member_zhaohui_q"]) + "-" + Util.SQL.NoHTML_2(Request["member_zhaohui"]);
                if (!string.IsNullOrEmpty(Request["member_type"]))
                {
                    string _mtype = Util.SQL.NoHTML_2(Request["member_type"]);
                    m.member_type = _mtype.Split('|')[0];//buyer or seller
                }
                if (!string.IsNullOrEmpty(Request["member_level"]))
                {
                    string _level = Util.SQL.NoHTML_2(Request["member_level"]);
                    m.member_level = Convert.ToInt32(_level.Split('|')[0]);
                }
                if (Request["member_status"].Contains("|"))
                {
                    string _status = Util.SQL.NoHTML_2(Request["member_status"]);
                    m.member_status = Convert.ToInt32(_status.Split('|')[0]);
                }
                else
                {
                    m.member_status = 1;
                }
                ms.Add(m);
            }
            Response.Redirect("/admin/memberlist/");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult MemberAdd()
        {
            v.Put("list", BindlimitedClass("type_code='member'"));
            DateTime dt = DateTime.Now;
            v.Put("year", dt.Year);
            v.Put("month", dt.Month);
            v.Put("day", dt.Day);
            v.Put("date", dt.Year + "-" + dt.Month + "-" + dt.Day);
            v.Display("manage/memberManage/memberadd.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult MemberEdit(int? id)
        {
            memberService ms = new memberService();
            member m = ms.GetModelById((int)id);
            if (m != null)
            {
                v.Put("list", BindlimitedClass("type_code='member'"));
                DateTime dt = DateTime.Now;
                v.Put("year", dt.Year);
                v.Put("month", dt.Month);
                v.Put("day", dt.Day);
                v.Put("date", dt.Year + "-" + dt.Month + "-" + dt.Day);
                v.Put("model", m);
                if (!string.IsNullOrEmpty(m.member_zhaohui))
                {
                    v.Put("zhaohuiid", m.member_zhaohui.Split('|')[0]);
                    v.Put("zhaohui", m.member_zhaohui.Split('-')[1]);
                    v.Put("zhaohuiq", m.member_zhaohui.Split('-')[0]);
                }
            }
            else { 
                v.Put("model", new llm.Model.member());
            }
            v.Display("manage/memberManage/memberedit.html");
            return View();
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoMemberEdit(int? id)
        {
            memberService ms = new memberService();
            member m = ms.GetModelById((int)id);
            if (m != null)
            {
                m.member_birthday = Util.SQL.NoHTML_2(Request["member_birthday"]);
                m.member_company = Util.SQL.NoHTML_2(Request["member_company"]);
                m.member_email = Util.SQL.NoHTML_2(Request["member_email"]);
                m.member_face = Util.SQL.NoHTML_2(Request["member_face"]);
                m.member_integral = Convert.ToInt32(Request["member_integral"]);
                m.member_number = Util.SQL.NoHTML_2(Request["member_number"]);
                m.member_phone = Util.SQL.NoHTML_2(Request["member_phone"]); 
                m.member_qq = Util.SQL.NoHTML_2(Request["member_qq"]);
                m.member_real_name = Util.SQL.NoHTML_2(Request["member_real_name"]);
                m.member_remark = Request["member_remark"];//富文本
                m.member_school = Util.SQL.NoHTML_2(Request["member_school"]); 
                m.member_tel = Util.SQL.NoHTML_2(Request["member_tel"]);
                m.member_upload = Util.SQL.NoHTML_2(Request["member_upload"]);
                m.member_work = Util.SQL.NoHTML_2(Request["member_work"]);
                m.member_zhaohui = Util.SQL.NoHTML_2(Request["member_zhaohui_q"]) + "-" + Util.SQL.NoHTML_2(Request["member_zhaohui"]);
                if (!string.IsNullOrEmpty(Request["member_type"]))
                {
                    string _mtype = Util.SQL.NoHTML_2(Request["member_type"]);
                    m.member_type = _mtype.Split('|')[0];//buyer or seller
                }
                if (!string.IsNullOrEmpty(Request["member_level"]))
                {
                    string _level = Util.SQL.NoHTML_2(Request["member_level"]);
                    m.member_level = Convert.ToInt32(_level.Split('|')[0]);
                }
                if (Request["member_status"].Contains("|"))
                {
                    string _status = Util.SQL.NoHTML_2(Request["member_status"]);
                    m.member_status = Convert.ToInt32(_status.Split('|')[0]);
                }
                else
                {
                    m.member_status = Convert.ToInt32(Request["member_status"]);
                }
                ms.Update(m);
            }
            Response.Redirect("/admin/memberlist/");
            return View();
        }
        #endregion

        #region banner管理

        [AdminLoginCheck]
        public ActionResult BannerList()
        {
            pageService ps = new pageService();
            page p = ps.GetTotalCountAndNewCount(" and page_type_id in (select type_id from sys_Type where type_code = 'banner') ");
            v.Put("model", p);
            //IList<page> list = ps.getmo
            v.Display("manage/webManage/bannerlist.html");
            return View();
        }

        [AdminLoginCheck]
        public JsonResult getBannerList(int pagesize, int pageindex, string q)
        {
            JsonResult jr = new JsonResult();
            pageService ps = new pageService();
            IList<page> list = null;
            try
            {
                list = ps.GetModelListByPageUseTop(pagesize, pageindex * pagesize, " and page_type_id in (select type_id from sys_type where type_code='banner') ");
            }
            catch
            {
                Response.Redirect("/admin/error/");
            }
            jr.Data = list;

            return jr;
        }

        [AdminLoginCheck]
        public ActionResult DoBannerAdd()
        {
            pageService ps = new pageService();
            page p = new page();

            //所属分类
            string _type = Util.SQL.NoHTML_2(Request["page_cid"]);
            int parentid = 0;
            string parenttypename = "";
            if (!string.IsNullOrEmpty(_type))
            {
                string[] typesplit = _type.Split('|');
                parentid = Convert.ToInt32(typesplit[0]);
                parenttypename = typesplit[1];
            }
            p.page_image = Util.SQL.NoHTML_2(Request["hfImage"]);
            p.page_name = Util.SQL.NoHTML_2(Request["page_name"]);
            p.page_url = Util.SQL.NoHTML_2(Request["page_url"]);
            p.page_time = DateTime.Now;
            p.page_order = Convert.ToInt32(Request["page_order"]);
            p.page_status = Convert.ToInt32(Request["page_status"]);
            p.page_pv = 0;
            p.page_type_id = parentid;
            p.type_cid = parentid;
            p.page_keywords = "";
            p.page_title = "";
            p.page_contact = "";
            p.page_content = "";
            p.page_footer = "";
            p.page_description = "";
             
            ps.Add(p);
            Response.Redirect("/admin/bannerlist/");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult BannerAdd()
        {
            v.Put("list", BindlimitedClass("type_code = 'banner'"));
            v.Display("manage/webManage/banneradd.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult BannerEdit(int? id)
        {
            v.Put("list", BindlimitedClass("type_code = 'banner'"));
            pageService ps = new pageService();
            page p = ps.GetModelById((int)id);
            v.Put("model", p);
            v.Display("manage/webManage/banneredit.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult DoBannerEdit(int? id)
        {
            pageService ps = new pageService();
            page p = ps.GetModelById((int)id);

            //所属分类
            string _type = Util.SQL.NoHTML_2(Request["page_cid"]);
            int parentid = 0;
            string parenttypename = "";
            if (!string.IsNullOrEmpty(_type))
            {
                string[] typesplit = _type.Split('|');
                parentid = Convert.ToInt32(typesplit[0]);
                parenttypename = typesplit[1];
            }
            p.page_image = Util.SQL.NoHTML_2(Request["hfImage"]);
            p.page_name = Util.SQL.NoHTML_2(Request["page_name"]);
            p.page_url = Util.SQL.NoHTML_2(Request["page_url"]);
            p.page_order = Convert.ToInt32(Request["page_order"]);
            p.page_status = Convert.ToInt32(Request["page_status"]);
            p.page_type_id = parentid;
            ps.Update(p);
            Response.Redirect("/admin/bannerlist/");
            return View();
        }


        #endregion

        #region 友情链接

        [AdminLoginCheck]
        public ActionResult LinkList()
        {
            pageService ps = new pageService();
            page p = ps.GetTotalCountAndNewCount(" and page_type_id in (select type_id from sys_Type where type_code = 'link') ");
            v.Put("model", p);
            //IList<page> list = ps.getmo
            v.Display("manage/webManage/linklist.html");
            return View();
        }

        [AdminLoginCheck]
        public JsonResult getLinkList(int pagesize, int pageindex, string q)
        {
            JsonResult jr = new JsonResult();
            pageService ps = new pageService();
            IList<page> list = null;
            try
            {
                list = ps.GetModelListByPageUseTop(pagesize, pageindex * pagesize,  " and page_type_id in (select type_id from sys_type where type_code='link') ");
            }
            catch
            {
                Response.Redirect("/admin/error/");
            }
            jr.Data = list;

            return jr;
        }

        [AdminLoginCheck]
        public ActionResult DoLinkAdd()
        {
            pageService ps = new pageService();
            page p = new page ();

            //所属分页
            string _type = Util.SQL.NoHTML_2(Request["page_cid"]);
            int parentid = 0;
            string parenttypename = "";
            if (!string.IsNullOrEmpty(_type))
            {
                string[] typesplit = _type.Split('|');
                parentid = Convert.ToInt32(typesplit[0]);
                parenttypename = typesplit[1];
            }
            p.page_image = Util.SQL.NoHTML_2(Request["hfImage"]);
            p.page_name = Util.SQL.NoHTML_2(Request["page_name"]);
            p.page_remark = Util.SQL.NoHTML_2(Request["page_remark"]);
            p.page_url = Util.SQL.NoHTML_2(Request["page_url"]);
            p.page_time = DateTime.Now;
            p.page_order = Convert.ToInt32(Request["page_order"]);
            p.page_status = Convert.ToInt32(Request["page_status"]);
            p.page_pv = 0;
            p.page_type_id = parentid;
            p.type_cid = parentid;
            p.page_keywords = "";
            p.page_title = "";
            p.page_contact = "";
            p.page_content = "";
            p.page_footer = "";
            p.page_description = "";
            
            //p.page_pv = 0;
            //p.page_url_type = Util.SQL.NoHTML_2(Request["page_url_type"]);
            ps.Add(p);
            Response.Redirect("/admin/linklist/");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult LinkAdd()
        {
            v.Put("list", BindlimitedClass("type_code = 'link'")); 
            v.Display("manage/webManage/linkadd.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult LinkEdit(int? id)
        {
            v.Put("list", BindlimitedClass("type_code = 'link'"));
            pageService ps = new pageService();
            page p = ps.GetModelById((int)id);
            v.Put("model", p);
            v.Display("manage/webManage/linkedit.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult DoLinkEdit(int? id)
        {
            pageService ps = new pageService();
            page p = ps.GetModelById((int)id);

            //所属分页
            string _type = Util.SQL.NoHTML_2(Request["page_cid"]);
            int parentid = 0;
            string parenttypename = "";
            if (!string.IsNullOrEmpty(_type))
            {
                string[] typesplit = _type.Split('|');
                parentid = Convert.ToInt32(typesplit[0]);
                parenttypename = typesplit[1];
            }
            p.page_image = Util.SQL.NoHTML_2(Request["hfImage"]);
            p.page_name = Util.SQL.NoHTML_2(Request["page_name"]);
            p.page_remark = Util.SQL.NoHTML_2(Request["page_remark"]);
            p.page_url = Util.SQL.NoHTML_2(Request["page_url"]);
            p.page_order = Convert.ToInt32(Request["page_order"]);
            p.page_status = Convert.ToInt32(Request["page_status"]);
            p.page_type_id = parentid;
            ps.Update(p);  
            Response.Redirect("/admin/linklist/");
            return View();
        }

        
        #endregion

        #region 公共方法
        [AdminLoginCheck]
        public JsonResult DelPage(int? id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            pageService ps = new pageService();
            page p = null;
            try
            {
                p = ps.GetModelById((int)id);
                if (p != null)
                {
                    ps.Delete(p);
                }
            }
            catch
            {
                p = new page();
            }
            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult DelPageList(string id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            pageService ps = new pageService();
            string[] idlist = id.Split(',');
            foreach (var item in idlist)
            {
                page p = ps.GetModelById(Convert.ToInt32(item));
                if (p != null)
                {
                    ps.Delete(p);
                }
            }
            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }
        #endregion

        #region 网站管理


        [AdminLoginCheck]
        public ActionResult WebBase()
        {
            pageService ps = new pageService();
            page p = ps.GetModelByTypeCode("base");
            v.Put("model", p);
            v.Display("manage/webManage/base.html");
            return View();
        }
         
        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult WebBaseEdit()
        {
            pageService ps = new pageService();
            page p = ps.GetModelByTypeCode("base");
            p.page_contact = Request["page_contact"];
            p.page_content = Request["page_content"];
            p.page_footer = Request["page_footer"];
            p.page_description = Util.SQL.NoHTML_2(Request["page_description"]);
            p.page_image = Util.SQL.NoHTML_2(Request["hfImage"]);
            p.page_keywords = Util.SQL.NoHTML_2(Request["page_keywords"]);
            p.page_name = Util.SQL.NoHTML_2(Request["page_name"]);
            p.page_remark = Util.SQL.NoHTML_2(Request["page_remark"]);
            p.page_title = Util.SQL.NoHTML_2(Request["page_title"]);
            p.page_url = Util.SQL.NoHTML_2(Request["page_url"]);
            //p.page_order = 0;
            //p.page_pv = 0;
            //p.page_status = 1;
            //p.type_cid = 0;
            //p.page_url_type = Util.SQL.NoHTML_2(Request["page_url_type"]);
            ps.Update(p);
            Response.Redirect("/admin/WebBase/");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult WebUpload()
        { 
            v.Display("manage/webManage/upload.html");
            return View();
        }

        /// <summary>
        /// /Admin/upload/
        /// </summary>
        /// <returns></returns>
        [AdminLoginCheck]
        public string Upload(int? id)
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
                        DateTime dt = DateTime.Now;
                        Random rd = new Random();
                        string pathname = dt.Year + "-" + dt.Month + "-" + dt.Day + "-" + rd.Next(1, 99999);
                        string savepath = Server.MapPath("/content/html/" + pathname + ".rar");
                        Request.Files["upl"].SaveAs(savepath);
                        Util.Tools.unzip(savepath, savepath.Replace(pathname + ".rar", ""));
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

        public bool ThumbnailCallback()
        {
            return false;
        }


        #endregion

        #region 文章管理
        [AdminLoginCheck]
        public ActionResult NewsList()
        {
            ArticleService ass = new ArticleService();
            article art = ass.GetTotalCountAndNewCount();
            v.Put("model", art);
            v.Display("manage/newsManage/list.html");
            return View();
        }

        [AdminLoginCheck]
        public JsonResult getNewsList(int pagesize, int pageindex,string q)
        { 
            JsonResult jr = new JsonResult();
            ArticleService ass = new ArticleService();
            //jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            IList<article> list = null;
            try
            {
                list = ass.GetModelListByPageUseTop(pagesize, pageindex * pagesize, string.IsNullOrEmpty(q) ? "" : " and article_title like '%" + Util.SQL.NoHTML_2(q) + "%' ");
            }
            catch 
            {
                Response.Redirect("/admin/error/");
            }
            jr.Data = list;
            
            
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult DelNews(int? id)
        { 
            JsonResult jr = new JsonResult();
            ArticleService ass = new ArticleService();
            article art = null;
            try
            {
                art = ass.GetModelById((int)id);
                if (art != null) ass.Delete(art);
            }
            catch 
            {
                art = new article();
                art.article_title = id+"";
            }
            jr.Data = art;
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult delNewsList(string id)
        { 
            JsonResult jr = new JsonResult();
            ArticleService ass = new ArticleService();
            string[] idlist = id.Split(',');
            foreach (var item in idlist)
            {
                article art = ass.GetModelById(Convert.ToInt32(item));
                if (art != null) ass.Delete(art);
            }
            
            jr.Data = "{'dellist':1}";
            return jr;
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoNewsAdd()
        {
            ArticleService ass = new ArticleService();
            //SysTypeService st = new SysTypeService();
            string _type = Util.SQL.NoHTML_2(Request["article_type"]);
            string[] typesplit = _type.Split('|');
            int typeid = Convert.ToInt32(typesplit[0]);
            string typename = typesplit[1];
            article art = new article();
            art.article_content = Request["article_content"];
            art.article_guid = Guid.NewGuid().ToString();
            art.article_html_url = "";//静态页面
            art.article_image = Request["hfImage"];//图片
            Random rd = new Random();
            art.article_pv = rd.Next(10,108);
            art.article_cid = 0;
            art.article_ref_url = Request["article_ref_url"];
            art.article_remark = Request["article_remark"];
            art.article_seo_desc = Request["article_seo_desc"];
            art.article_seo_kw = Request["article_seo_kw"];
            
            art.article_source = Request["article_source"];
            art.article_status = Convert.ToInt32(Request["article_status"]);
            art.article_summary = Request["article_summary"];
            art.article_tag = Request["article_tag"];
            art.article_time = DateTime.Now;
            art.article_title = Request["article_title"];
            art.article_title_color = Request["article_title_color"];
            art.article_type = typeid;
            art.article_type_name = typename;
            int istop = Convert.ToInt32(Request["article_is_top"]);
            art.article_is_top = istop == 1 ? true : false;
            //article typelist
            string typelist = Request["article_type_list"];
            art.article_shut_title = typelist; 

            int rows = ass.Add(art);
            Response.Redirect("/admin/NewsEdit/" + rows);
            return View();
        }

        [AdminLoginCheck]
        public ActionResult NewsAdd()
        {
            ArticleTagService ats = new ArticleTagService();
            IList<article_tag> taglist = ats.GetModelList("1=1 order by tag_id desc");
            v.Put("taglist", taglist);
            SysTypeService sts = new SysTypeService();
            //v.Put("list", BindlimitedClass("type_cid = (select top 1 dict_id from sys_dict where dict_code = 'article') "));
            v.Put("list", sts.GetModelList("type_cid = (select top 1 dict_id from sys_dict where dict_code = 'article')"));
            v.Display("manage/newsManage/newsadd.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult NewsEdit(int? id)
        {
            //v.Put("list", BindlimitedClass("type_cid = (select top 1 dict_id from sys_dict where dict_code = 'article') "));
            SysTypeService sts = new SysTypeService();
            v.Put("list", sts.GetModelList("type_cid = (select top 1 dict_id from sys_dict where dict_code = 'article')"));
            ArticleService ass = new ArticleService();
            article art = null;
            try
            {
                art = ass.GetModelById((int)id);
                v.Put("model",art);
            }
            catch
            {
                v.Put("model", new article());
            }
            ArticleTagService ats = new ArticleTagService();
            IList<article_tag> taglist = ats.GetModelList("1=1 order by tag_id desc");
            v.Put("taglist", taglist);
            ArticleContentService acs = new ArticleContentService();
            IList<article_content> contentlist = acs.GetModelList("content_article_id=" + art.article_id +" order by content_order asc");
            v.Put("contentlist", contentlist);
            v.Display("manage/newsManage/newsedit.html");
            return View();
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoNewsEdit(int? id)
        {
            ArticleService ass = new ArticleService();
            string _type = Util.SQL.NoHTML_2(Request["article_type"]);
            string[] typesplit = _type.Split('|');
            int typeid = Convert.ToInt32(typesplit[0]);
            string typename = typesplit[1];
            article art = ass.GetModelById((int)id);
            art.article_content = Request["article_content"];
            art.article_image = Request["hfImage"];//图片
            art.article_ref_url = Request["article_ref_url"];
            art.article_remark = Request["article_remark"];
            art.article_seo_desc = Request["article_seo_desc"];
            art.article_seo_kw = Request["article_seo_kw"];
            art.article_source = Request["article_source"];
            art.article_status = Convert.ToInt32(Request["article_status"]);
            art.article_summary = Request["article_summary"];
            art.article_tag = Request["article_tag"];
            art.article_title = Request["article_title"];
            art.article_title_color = Request["article_title_color"];
            art.article_type = typeid;
            art.article_type_name = typename;
            int istop = Convert.ToInt32(Request["article_is_top"]);
            art.article_is_top = istop == 1 ? true : false;
            //article typelist
            string typelist = Request["article_type_list"];
            art.article_shut_title = typelist; 
            ass.Update(art);
            if (!string.IsNullOrEmpty(Request["article_page_content"]))
            {
                ArticleContentService acs = new ArticleContentService();
                article_content ac = new article_content();
                ac.content_article_id = art.article_id;
                ac.content_content = Request["article_page_content"];
                ac.content_order = Convert.ToInt32(Request["content_order"]);
                ac.content_title = Request["content_title"];
                acs.Add(ac);
            }

            Response.Redirect("/admin/NewsEdit/" + art.article_id + "/#tab_6_5");
            return View();
        }

        [AdminLoginCheck]
        public int AddTag()
        {
            ArticleTagService ats = new ArticleTagService();
            article_tag tag = new article_tag();
            tag.tag_name = Request["tagname"];
            tag.tag_type_id = 0;
            return ats.Add(tag);
            
        }

        [AdminLoginCheck]
        public void DelTag(int? id)
        {
            ArticleTagService ats = new ArticleTagService();
            article_tag tag = ats.GetModelById((int)id);
            ats.Delete(tag);
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public JsonResult modfiyContent(int? id)
        {
            JsonResult jr = new JsonResult();
            ArticleContentService acs= new ArticleContentService();
            article_content ac = acs.GetModelById((int)id);
            if (ac!=null)
            {
                ac.content_content = Request["c"];
                acs.Update(ac);
            }
            jr.Data = "{'code':1,'msg':'ok'}";
            return jr;
        }
        
        [AdminLoginCheck]
        public JsonResult delContent(int? id)
        {
            JsonResult jr = new JsonResult();
            ArticleContentService acs= new ArticleContentService();
            article_content ac = acs.GetModelById((int)id);
            if (ac!=null)
            {
                acs.Delete(ac);
            }
            jr.Data = "{'code':1,'msg':'ok'}";
            return jr;
        }
        
        [AdminLoginCheck]
        public JsonResult orderContent(int? id)
        {
            JsonResult jr = new JsonResult();
            ArticleContentService acs= new ArticleContentService();
            article_content ac = acs.GetModelById((int)id);
            if (ac!=null)
            {
                ac.content_order = Convert.ToInt32(Request["order"]);
                acs.Update(ac);
            }
            jr.Data = "{'code':1,'msg':'ok'}";
            return jr;
        }
        
        [AdminLoginCheck]
        public JsonResult modifyContentTitle(int? id)
        {
            JsonResult jr = new JsonResult();
            ArticleContentService acs= new ArticleContentService();
            article_content ac = acs.GetModelById((int)id);
            if (ac!=null)
            {
                ac.content_title = Request["title"];
                acs.Update(ac);
            }
            jr.Data = "{'code':1,'msg':'ok'}";
            return jr;
        }
        
        

        #region 递归分类
        //绑定顶级分类
        private IList<sys_type> BindlimitedClass(string where)
        {
            SysTypeService ts = new SysTypeService();
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
        #endregion

        #endregion

        #region 分类管理

        [AdminLoginCheck]
        public ActionResult TypeList(int? id)
        {
            string typename = string.Empty;
            if (id != null)
            {
                switch (id)
                {
                    case 100: typename = "文章"; break;
                    case 101: typename = "产品"; break;
                    case 110: typename = "其他"; break;
                    case 111: typename = "页面"; break;
                    case 112: typename = "系统"; break;
                    case 113: typename = "会员"; break;
                    default:  typename = "未知"; break;
                }
            }
            v.Put("typename", typename);
            SysTypeService ts = new SysTypeService();
            sys_type type = ts.GetTotalCountAndNewCount(id ==null ? "" : " and type_cid = "+ id);
            v.Put("model", type);
            v.Display("manage/typeManage/list.html");
            return View();
        }

        [AdminLoginCheck]
        public JsonResult getTypeList(int pagesize, int pageindex,string w)
        { 
            JsonResult jr = new JsonResult();
            SysTypeService ts = new SysTypeService();
            IList<sys_type> list = null;
            try
            {
                list = ts.GetModelListByPageUseTop(pagesize, pageindex * pagesize, string.IsNullOrEmpty(w) ? "" : " and type_cid= " + w);
            }
            catch 
            {
                Response.Redirect("/admin/error/");
            }
            jr.Data = list;
            
            
            return jr;
        }


        [AdminLoginCheck]
        public JsonResult DelType(int? id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            SysTypeService ts = new SysTypeService();
            sys_type t = null;
            try
            {
                t = ts.GetModelById((int)id);
                if (t != null)
                {
                    if (t.type_role == "llm")
                    {
                        outhtml = "系统应用无法删除，请联系管理员！";
                    }
                    else
                    {
                        ts.Delete(t);
                    }
                }
            }
            catch
            {
                t = new sys_type(); 
            }
            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

        [AdminLoginCheck]
        public JsonResult DelTypeList(string id)
        {
            string outhtml = "ok";
            JsonResult jr = new JsonResult();
            SysTypeService ts = new SysTypeService();
            string[] idlist = id.Split(',');
            foreach (var item in idlist)
            {
                sys_type t = ts.GetModelById(Convert.ToInt32(item));
                if (t != null) {
                    if (t.type_role == "llm")
                    {
                        outhtml = "系统应用无法删除，请联系管理员！";
                    }
                    else { 
                        ts.Delete(t);
                    }
                }
            }

            jr.Data = "{'msg':'" + outhtml + "'}";
            return jr;
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoTypeAdd()
        {
            SysTypeService ts = new SysTypeService();
            //上级分页
            string _type = Util.SQL.NoHTML_2(Request["type_parent"]);
            int parentid = 0;
            string parenttypename = "";
            if (!string.IsNullOrEmpty(_type))
            {
                string[] typesplit = _type.Split('|');
                parentid = Convert.ToInt32(typesplit[0]);
                parenttypename = typesplit[1];
            }
            
            //分类类型
            string _dict = Util.SQL.NoHTML_2(Request["type_cid"]);
            string[] dictsplit = _dict.Split('|');
            int dictid = Convert.ToInt32(dictsplit[0]);
            string dictname = dictsplit[1];
            //
            sys_type t = new sys_type();
            t.type_cid = dictid;
            t.type_cid_name = dictname;
            t.type_code = Util.SQL.NoHTML_2(Request["type_code"]);
            t.type_content = Util.SQL.NoHTML_2(Request["type_content"]);
            t.type_detail = Util.SQL.NoHTML_2(Request["type_detail"]);
            t.type_dict_code = Util.SQL.NoHTML_2(Request["type_dict_code"]);
            t.type_guid = Guid.NewGuid().ToString();
            t.type_image = Util.SQL.NoHTML_2(Request["hfImage"]);
            t.type_image_list = "";
            t.type_name = Server.HtmlEncode(Request["type_name"]);
            t.type_order = 0;
            t.type_depth = 0;
            t.type_parent = parentid;
            t.type_parent_name = parenttypename;
            t.type_position = "";
            string _role = Util.SQL.NoHTML_2(Request["type_role"]);
            try
            {
                t.type_role = string.IsNullOrEmpty(_role) ? User.Identity.Name : _role;
            }
            catch 
            {
                t.type_role = "admin";
            }
            t.type_status = Convert.ToInt32(Util.SQL.NoHTML_2(Request["type_status"]));
            t.type_summary = Util.SQL.NoHTML_2(Request["type_summary"]);
            t.type_time = DateTime.Now;
            t.type_url = Util.SQL.NoHTML_2(Request["type_url"]);
            t.type_path = Util.SQL.NoHTML_2(Request["type_path"]);
            ts.Add(t);

            t = ts.GetModelList("type_guid='" + t.type_guid + "'")[0];
            //设置type_path
            if (string.IsNullOrEmpty(Request["type_path"]))
            {
                if (t.type_parent != 0)
                {
                    llm.Model.sys_type _ptype = ts.GetModelById((int)t.type_parent);
                    if (_ptype != null)
                    {
                        t.type_path = _ptype.type_path + t.type_id + "|";
                    }
                }
                else
                {
                    t.type_path = "|" + t.type_id + "|";
                }
                ts.Update(t);
            }
            
            Response.Redirect("/admin/typelist/");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult TypeAdd()
        {
            v.Put("list", BindlimitedClass("1=1"));
            dictService ds = new dictService();
            IList<dict> list = ds.GetModelList();
            v.Put("dictlist", list);
            v.Display("manage/typeManage/typeadd.html");
            return View();
        }

        [AdminLoginCheck]
        public ActionResult TypeEdit(int? id)
        {
            v.Put("list", BindlimitedClass("1=1"));
            dictService ds = new dictService();
            IList<dict> list = ds.GetModelList();
            v.Put("dictlist", list);
            SysTypeService ts = new SysTypeService();
            sys_type t = null;
            try
            {
                t = ts.GetModelById((int)id);
                v.Put("model", t);
            }
            catch
            {
                v.Put("model", new sys_type());
            }
            v.Display("manage/typeManage/typeedit.html");
            return View();
        }

        [AdminLoginCheck]
        [ValidateInput(false)]
        public ActionResult DoTypeEdit(int? id)
        {
            SysTypeService ts = new SysTypeService();
            sys_type t = null;
            try
            {
                //上级分页
                string _type = Util.SQL.NoHTML_2(Request["type_parent"]);
                int parentid = 0;
                string parenttypename = "";
                if (!string.IsNullOrEmpty(_type) || _type!="0|")
                {
                    string[] typesplit = _type.Split('|');
                    parentid = Convert.ToInt32(typesplit[0]);
                    parenttypename = typesplit[1];
                }
                //分类类型
                string _dict = Util.SQL.NoHTML_2(Request["type_cid"]);
                string[] dictsplit = _dict.Split('|');
                int dictid = Convert.ToInt32(dictsplit[0]);
                string dictname = dictsplit[1];

                t = ts.GetModelById((int)id);
                t.type_cid = dictid;
                t.type_cid_name = dictname;
                t.type_code = Util.SQL.NoHTML_2(Request["type_code"]);
                t.type_content = Util.SQL.NoHTML_2(Request["type_content"]);
                t.type_detail = Util.SQL.NoHTML_2(Request["type_detail"]);
                t.type_dict_code = Util.SQL.NoHTML_2(Request["type_dict_code"]);
                t.type_image = Util.SQL.NoHTML_2(Request["hfImage"]);
                t.type_image_list = "";
                t.type_name = Server.HtmlEncode(Request["type_name"]);
                t.type_parent = parentid;
                t.type_parent_name = parenttypename;
                string _role = Util.SQL.NoHTML_2(Request["type_role"]);
                try
                {
                    t.type_role = string.IsNullOrEmpty(_role) ? User.Identity.Name : _role;
                }
                catch
                {
                    t.type_role = "admin";
                }
                t.type_status = Convert.ToInt32(Util.SQL.NoHTML_2(Request["type_status"]));
                t.type_summary = Util.SQL.NoHTML_2(Request["type_summary"]);
                t.type_url = Util.SQL.NoHTML_2(Request["type_url"]);

                if (t.type_parent != 0)
                {
                    llm.Model.sys_type _ptype = ts.GetModelById((int)t.type_parent);
                    if (_ptype != null)
                    {
                        t.type_path = _ptype.type_path + t.type_id + "|";
                    }
                }
                else
                {
                    t.type_path = "|" + t.type_id + "|";
                }

                ts.Update(t);
            }

            catch
            {

            }
            
            
            Response.Redirect("/admin/typelist/");
            return View();
        }

        #endregion

        #region 系统登陆登出
        public ActionResult Login()
        {
            v.Init("/admins/Views/admin/");
            v.Put("returnrul", HttpContext.Request["ReturnUrl"]);
            v.Display("Login.cshtml");

            return View();
        }

        [HttpPost]
        public string Login(string ReturnUrl)
        {
            string html = "";

            try
            {
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
                                html = ReturnUrl;
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
            }
            catch  (Exception ex)
            {
                html = ex.Message;
            }

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

        public ActionResult Error()
        {
            v.Display("404.html");
            return View();
        }


    }
}
