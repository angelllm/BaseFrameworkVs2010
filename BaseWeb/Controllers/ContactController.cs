using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BaseWeb.Controllers
{
    public class ContactController : Controller
    {
        //
        // GET: /Contact/

        public ActionResult Index(int? id)
        {
            TemplateHelper.VelocityHelper v = new TemplateHelper.VelocityHelper();
            v.Init("/Template/web/");
            v.Put("val", "oh mamade this is contact page,fuck this page");
            v.Display("contact.htm");
            return View();
        }

    }
}
