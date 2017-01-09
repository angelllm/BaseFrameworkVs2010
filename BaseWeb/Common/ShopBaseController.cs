using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IBatisServer;

namespace BaseWeb.Common
{
    public class ShopBaseController : Controller
    {
        configService cs = new configService();
        pageService ps = new pageService();
        SysTypeService ts = new SysTypeService();
        public void setTemplate()
        {
            _v.Init("/Template/shop/");
        }
        public void setTemplate(string url)
        {
            _v.Init(url);
        }

        private  TemplateHelper.VelocityHelper _v; 
        public  TemplateHelper.VelocityHelper v
        {
            get { return _v; }
            set { _v = value; }
        }
        public ShopBaseController()
        {
            _v = _v == null ? new TemplateHelper.VelocityHelper() : _v;
        } 
         
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            setTemplate();
            v.Put("user", Util.Cookie.getUidByCookie());
            v.Put("path", "/Template/shop");
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("shelper", sh);

        }


    }
}