using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BaseWeb.Common;

namespace BaseWeb.Controllers
{
    public class LoveController : LoveBaseController
    {
        public ActionResult Index()
        { 
            v.Display("index.html");
            return View();
        }

    }
}
