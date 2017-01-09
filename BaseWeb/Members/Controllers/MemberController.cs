using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Members.Common;

namespace Members.Controllers
{
    public class MemberController : Controller
    {
        //
        // GET: /Member/

        public ActionResult Index()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Members/Template/web/");
            Tools t = new Tools();
            t.setSession();
            v.Put("llm", t.getCookie("cc") + "--cookie:" );
            v.Put("val", "member -- fuck this page"); 
            v.Display("index.htm");
            
            return View();
        }
        public ActionResult Contact()
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Members/Template/web/");
            Tools t = new Tools();
            t.setSession();
            v.Put("val", "Members contact - member -- fuck this page");
            v.Put("llm", t.getSession());
         
            v.Display("Contact.htm");
           
            return View();
        }
    }
}
