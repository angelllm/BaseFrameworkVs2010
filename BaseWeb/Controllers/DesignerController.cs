using BaseWeb.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;
using Util;

namespace BaseWeb.Controllers
{
    public class DesignerController : BaseController
    {
        public ActionResult Html()
        {  
            v.Display("designer.htm");
            return View();
        }

        public ActionResult Demo()
        {
            v.Display("designer2.htm");
            return View();
        }
    }
}
