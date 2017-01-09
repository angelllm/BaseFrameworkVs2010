using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BaseWeb
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Navigation_Two_Parameter", // 导航路由(带参数)
                "{controller}/{action}-{id}-{typeid}-{archiveTime}-{tag}", // 带有参数的 URL
                new { controller = "Land", action = "List", id = UrlParameter.Optional,typeid="", archiveTime = "", tag = "" } // 参数默认值
            );

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Land", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

            routes.MapRoute(
                 "tag_nav", // 导航路由(带参数)
                 "{controller}/{action}/{TagName}", // 带有参数的 URL
                 new { controller = "Land", action = "Tag", TagName = "TagName" } // 参数默认值
             );
           
        }
        protected void Application_BeginRequest(object sender, EventArgs e)
        { 
            string _url = Context.Request.Url.ToString();
            if (_url == "http://llmztt.com/" || _url == "http://www.llmztt.com/" || _url == "http://llmztt.com" || _url == "http://www.llmztt.com")
            {
                Context.RewritePath("/vue2/index.html");
            }  
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError().GetBaseException();
            if (ex == null)
                return;  
            Response.Redirect("/index/error/");
            Server.ClearError();
        }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas(); 
            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
        }






    }
}