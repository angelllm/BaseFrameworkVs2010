using BaseWeb.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IBatisServer;
using llm.Model;

namespace BaseWeb.Controllers
{
    public class ShopController : ShopBaseController
    {
        //
        // GET: /Shop/
        public ActionResult Index()
        {
            
            #region 通用分页
           
            ArticleService ass = new ArticleService();
            string strwhere = "[sys_article]  where   article_status = 1 and article_type   in (select type_id from sys_type where type_parent = 73) ";
            //通用分页  
            string sqlCount = PagingHelper.CreateJoinCountingSql(strwhere);
            int rows = ass.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(1, 6, 0, strwhere, "article_time desc ", "*,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count");
            //分页控件
            IList<llm.Model.article> list = ass.GetModelListByPage2(sql);
            v.Put("list", list);
          
            #endregion
            v.Display("index.htm");
            return View();
        }

        //
        // GET: /Shop/
        public ActionResult Reg()
        {
            v.Display("reg.htm");
            return View();
        }

        //
        // GET: /Shop/
        public string DoReg()
        {
            string html = "";

            
            return html;
        }

        //
        // GET: /Shop/
        public ActionResult Login()
        {
            v.Display("login.htm");
            return View();
        }
        //
        // GET: /Shop/
        public ActionResult User(int? id)
        {
            string phone = Util.Cookie.getUidByCookie();
            if (!string.IsNullOrEmpty(phone))
            {
                memberService ms = new memberService();
                UserCardService ucs = new UserCardService ();
                UserSignService uss = new UserSignService ();
                
                member m = ms.GetModelByPhone(Util.Cookie.getUidByCookie());
                if (m != null)
                {
                    v.Put("model", m);
                    userCard uc = ucs.GetModelByMid(m.member_id);
                    v.Put("card", uc);
                    IList<userSign> uslist = uss.GetModelList("sign_mid = " + m.member_id + " and year(getdate()) = year(sign_time)  and month(getdate()) = month(sign_time)  ");
                    v.Put("uslist", uslist);
                }
                else {
                    v.Put("model", new member());
                    v.Put("card", new userCard());
                    v.Put("uslist", new List<userSign>());
                }
                v.Display("user.htm");
            }
            else {
                Response.Redirect("/shop/login/");
            }
            
            return View();
        }

         
        public ActionResult Gift(int? id)
        {
            string phone = Util.Cookie.getUidByCookie();
            if (!string.IsNullOrEmpty(phone))
            {
                memberService ms = new memberService();
                member m = ms.GetModelByPhone(phone);
                UserGiftService ugs = new UserGiftService();
                IList<userGift> uglist = ugs.GetModelList("gift_mid = "+m.member_id);
                v.Put("list", uglist);
                v.Display("gift.htm");
            }
            else
            {
                Response.Redirect("/shop/login/");
            }

            return View();
        }

        public string Free(int? id)
        {
            string html = "";
            string phone = Util.Cookie.getUidByCookie();
            if (!string.IsNullOrEmpty(phone))
            {
                memberService ms = new memberService();
                member m = ms.GetModelByPhone(phone);
                if (m != null)
                {
                    UserCardService ucs = new UserCardService();
                    userCard uc = ucs.GetModelByMid(m.member_id);
                    if (uc!=null)
                    {
                        if (uc.card_status == 1)
                        {
                            //if (uc.card_count >= 3)
                            //{
                            //    html = "不能再领了，每月最多只有三次！";
                            //}
                            //else
                            //{ }
                            uc.card_count++;//免费次数+1
                            uc.card_status = 0;//设置回可领取状态
                            ucs.Update(uc);
                            //添加到礼物中 用作日志记录
                            UserGiftService ugs = new UserGiftService();
                            userGift ug = new userGift();
                            ug.gift_mid = m.member_id;
                            ug.gift_mname = m.member_name;
                            ug.gift_name = "领取签到免费玩";
                            ug.gift_path = "领取签到免费玩";
                            ug.gift_remark = m.member_name + "于" + DateTime.Now + "领取签到免费玩！";
                            ugs.Add(ug);
                            html = "领取成功！";
                            
                        }
                        else {
                            html = "非法请求！";
                        }
                    }
                    else
                    {
                        html = "账号异常！";
                    }
                }
                else {
                    html = "no";
                }
                 
            }
            else
            {
                Response.Redirect("/shop/login/");
            }

            return html;
        }

        public string UseFree(int? id)
        {
            string html = "";
            string phone = Util.Cookie.getUidByCookie();
            if (!string.IsNullOrEmpty(phone))
            {
                memberService ms = new memberService();
                member m = ms.GetModelByPhone(phone);
                if (m != null)
                {
                    UserCardService ucs = new UserCardService();
                    userCard uc = ucs.GetModelByMid(m.member_id);
                    if (uc != null)
                    {
                        if (uc.card_count <= 0)
                        {
                            html = "非法领取！";
                        }
                        else
                        {
                            uc.card_count--;
                            ucs.Update(uc);
                            //添加到礼物中 用作日志记录
                            UserGiftService ugs = new UserGiftService();
                            userGift ug = new userGift();
                            ug.gift_mid = m.member_id;
                            ug.gift_mname = m.member_name;
                            ug.gift_name = "使用签到免费玩";
                            ug.gift_path = "领取签到免费玩";
                            ug.gift_remark = m.member_name + "于" + DateTime.Now + "使用签到获取的免费玩一次！";
                            ugs.Add(ug);
                            html = "使用成功，可以免费玩一次！";
                        }
                    }
                    else
                    {
                        html = "账号异常！";
                    }
                }
                else
                {
                    html = "no";
                } 
            }
            else
            {
                Response.Redirect("/shop/login/");
            }

            return html;
        }

        public string DoLogin()
        {
            string html = "";
            memberService ms = new memberService();
            member m = ms.GetModelByPhone(Util.SQL.NoHTML(Request["name"]));
            if (m != null)
            {
                if (m.member_pwd == Util.MD5Reg.formatePwd(Util.SQL.NoHTML(Request["pwd"])))
                {
                    html = m.member_id.ToString();
                    Util.Cookie.setCode(m.member_name);
                }
                else
                {
                    html = "用户名或密码错误";
                }
            }
            else {
                html = "用户名或密码错误";
            }

            return html;
        }

        public ActionResult LoginOut()
        {
            Util.Cookie.clearLogin();
            Response.Redirect("/shop/login/");
            return View();
        }
        public ActionResult Wheel()
        {
            memberService ms = new memberService();
            member m = ms.GetModelByPhone(Util.Cookie.getUidByCookie());
            if (m != null)
            {
                v.Display("award.htm");
            }
            else
            {
                Response.Redirect("/shop/login/");
            }
            
            return View();
        }
        public ActionResult Contact()
        {
            v.Display("contact.htm");
            return View();
        }
        public ActionResult Active()
        {
            #region 通用分页

            ArticleService ass = new ArticleService();
            string strwhere = "[sys_article]  where   article_status = 1 and article_type   in (select type_id from sys_type where type_parent = 73) ";
            //通用分页  
            string sqlCount = PagingHelper.CreateJoinCountingSql(strwhere);
            int rows = ass.GetPageinfoCount(sqlCount);
            //结果集sql
            string sql = PagingHelper.CreatePagingSql(1, 100, 0, strwhere, "article_time desc ", "*,(select count(commite_id) from sys_commite where commite_article_id = article_id) as content_count");
            //分页控件
            IList<llm.Model.article> list = ass.GetModelListByPage2(sql);
            v.Put("list", list);

            #endregion
            v.Display("active.htm");
            return View();
        }

        public ActionResult View(int? id)
        {

            ArticleService ass = new ArticleService();
            article art = ass.GetModelById((int)id);
            if (art != null)
            {
                art.article_pv++;
                ass.Update(art);
                v.Put("model", art);
            }
            else {
                v.Put("model", new article());
            }

            v.Display("view.htm");
            return View();
        }
        
        public JsonResult Award()
        {
            JsonResult jr = new JsonResult();
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            string html = "";

            memberService ms = new memberService();
            member m = ms.GetModelByPhone(Util.Cookie.getUidByCookie());
            UserCardService ucs = new UserCardService();
            UserGiftService ugs = new UserGiftService();
            
            if (m != null)
            {
                //判断大转盘是否可用
                if (m.member_phone_last_four == 1)
                {
                    #region 获奖处理
                    userGift ug = new userGift();
                    ug.gift_mid = m.member_id;
                    ug.gift_mname = m.member_name;
                    Random rd = new Random();
                    int num = rd.Next(0, 101);
                    //一等奖 免费一次
                    if (num == 100)
                    {
                        html = "[{'success':'success','prizetype':'1','num':" + num + "}]";
                        userCard uc = ucs.GetModelByMid(m.member_id);
                        uc.card_count++;
                        ucs.Update(uc);
                        ug.gift_name = "大转盘获得免费一次";
                        ug.gift_path = "大转盘获得免费一次";
                        ug.gift_remark = m.member_name + "于" + DateTime.Now + "通过大转盘获得免费一次的机会！";

                    }
                    //二等奖 沙画一份
                    else if (num == 8 || num == 88)
                    {
                        html = "[{'success':'success','prizetype':'2','num':" + num + "}]";
                        ug.gift_name = "大转盘获得沙画一份";
                        ug.gift_path = "大转盘获得沙画一份";
                        ug.gift_remark = m.member_name + "于" + DateTime.Now + "通过大转盘获得沙画一份！";

                    }
                    //else if (num == 0 || num == 33 || num == 66 || num == 99)
                    //{
                    //    html = "[{'success':'success','prizetype':'3','num':" + num + "}]";
                    //}
                    //三等奖 积分+10
                    else if (num > 50 && num < 75)
                    {
                        html = "[{'success':'success','prizetype':'3','num':" + num + "}]";
                        ug.gift_name = "大转盘获得积分10点";
                        ug.gift_path = "大转盘获得积分10点";
                        ug.gift_remark = m.member_name + "于" + DateTime.Now + "通过大转盘获得积分10点！";
                        //积分+10点
                        m.member_integral += 10;
                        //ms.Update(m);
                    }
                    else
                    {
                        html = "[{'error':'error','num':" + num + "}]";
                    }
                    m.member_phone_last_four = 0;//设置大转盘不可用
                    ms.Update(m);//更新
                    ugs.Add(ug);//添加礼物
                    #endregion
                }
                else {
                    //使其可以再玩，但是没有礼物可送
                    //让其先签到
                    html = "[{'error':'qiandao','num':0}]"; 
                }
            }
            else
            {
                Response.Redirect("/shop/login/");
            }
            
            jr.Data = html;
            return jr;
        }
        

        public string QianDao()
        {
            string html = "";
            string mname = Util.Cookie.getUidByCookie();
            if (string.IsNullOrEmpty(mname))
            {
                html = "no";
            }
            else {
                memberService ms = new memberService();
                member m = ms.GetModelByPhone(mname);
                if (m != null)
                {
                    //判断卡是否失效
                    UserCardService ucs = new UserCardService();
                    userCard uc = ucs.GetModelByMid(m.member_id);
                    //是否计次卡
                    if (uc.card_is_count == 1)
                    {
                        //免费次数有没有用完 并且 使用次数已经等于总次数
                        if (uc.card_count == 0 && uc.card_ative_count == uc.card_total_count)
                        {
                            return "您的卡已失效或已过期，请充值！";
                        }
                    }
                    else { 
                        //限时卡
                        DateTime now = DateTime.Now;
                        DateTime cardtime = DateTime.Parse(uc.card_end_time + "");
                        if (now.Year >= cardtime.Year && now.Month > cardtime.Month)
                        {
                            return "您的卡已失效或已过期，请充值！";
                        }

                    }
                    

                    UserSignService uss = new UserSignService();
                    UserGiftService ugs= new UserGiftService();
                    int flag = uss.GetCount(m.member_id);
                    if (flag >= 1)
                    {
                        html = "今天已经签到过了哦！";
                    }
                    else {
                        m.member_phone_last_four = 1;//设置大转盘可用
                        ms.Update(m);

                        if (uc.card_is_count == 1)
                        {
                            uc.card_ative_count++;
                            ucs.Update(uc);
                        }

                        userSign us = new userSign();
                        us.sign_ip = Util.getIP.GetUserIP();
                        us.sign_mid = m.member_id;
                        us.sign_mname = m.member_name;
                        us.sign_time = DateTime.Now;

                        userGift ug = new userGift();
                        ug.gift_mid = m.member_id;
                        ug.gift_mname = m.member_name;
                        ug.gift_name = "签到送积分(1)";
                        ug.gift_path = "送到送积分";
                        ug.gift_remark = m.member_name + "于" + DateTime.Now + " 签到，获得积分 1 分";
                        
                        ugs.Add(ug);
                        uss.Add(us);
                            
                        html = "ok";
                    }
                }
                else {
                    html = "账号出现异常！";
                }
            }

            return html;
        }

    }
}
