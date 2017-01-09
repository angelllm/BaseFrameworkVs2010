using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IBatisServer;

namespace Admins.Controllers
{
    public class IconController : Controller
    {

        IconService iss = null;
        public IconController()
        {
            iss = new IconService();
        }
        //
        // GET: /Icon/IconOrder/
        [HttpPost]
        public void IconOrder(int? id, int? x, int? y)
        {

            llm.Model.icon icon = iss.GetModelById((int)id);
            if (icon!=null)
            {
                icon.icon_position_x = (int)x;
                icon.icon_position_y = (int)y;
                iss.Update(icon);
            }
        }

    }
}
