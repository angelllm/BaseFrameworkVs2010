using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Admins.Common
{
    public class AdminLoginCheck : AuthorizeAttribute
    {
        private bool isAdminLogin = false;

        public bool IsAdminLogin
        {
            get { return isAdminLogin; }
            set { isAdminLogin = value; }
        }

        override public void OnAuthorization(AuthorizationContext filterContext)
        {
            //登录权限验证
            IsAdminLogin = CheckAdminLogin();
            if (!IsAdminLogin)
            {
                HttpContext.Current.Response.Redirect("/Admin/Login/?ReturnUrl=" + filterContext.RequestContext.HttpContext.Request.RawUrl);
            }
        }

        //检查有没有通过Form验证
        public bool CheckAdminLogin()
        {
            bool flag = false;
            if (HttpContext.Current.User == null)
            {
                flag = false;
            }
            else
            {
                if (!string.IsNullOrEmpty(HttpContext.Current.User.Identity.Name))
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