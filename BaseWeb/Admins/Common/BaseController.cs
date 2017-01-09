using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Admins.Common
{
    public class BaseController : Controller
    {
        public TemplateHelper.VelocityHelper v { get; set; }

        public void setTemplate()
        {
            v.Init("/Admins/Template/metronic.3.3.6/");
        }
        public void setTemplate(string url)
        {
            v.Init(url);
        }
        public void newTemplate()
        {
            v = new TemplateHelper.VelocityHelper();
        }
        //控制器加载的时候
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            v = CommonUtil.v;//单例模式 也可以 newTemplate方法重新实例化

            v.Init("/Admins/Template/metronic.3.3.6/");
            //实例化页面结构
            base.Initialize(requestContext);
            v.Put("path", "/Admins/Template/metronic.3.3.6");
            //设置数量统计
            IBatisServer.CommonService cs = new IBatisServer.CommonService();
            llm.Model.common c = cs.GetEveryCount();
            v.Put("common", c);

            //设置访问者
            //v.Put("admin", User.Identity.Name);
            //v.Put("isHost", User.Identity.Name == "llm" ? true : false);
            //v.Put("RawUrl", Request.RawUrl);
            //v.Put("Version", "Version 1.0.2 by <a style='color:red' href='http://llmztt.com/'>llm</a>");
        }

        //检查有没有通过Form验证
        public bool CheckAdminLogin()
        {
            //return true;
            bool flag = false;
            if (User == null)
            {
                flag = false;
            }
            else
            {
                if (!string.IsNullOrEmpty(User.Identity.Name))
                {
                    if (System.Web.Security.FormsAuthentication.FormsCookieName == "login" && System.Web.Security.FormsAuthentication.LoginUrl == "/Admin/Login/")
                        flag = true;
                    else
                        flag = false;
                }
                else
                    flag = false;
            }
            return flag;
        }


    }
}