using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IBatisServer;

namespace BaseWeb.Common
{
    public class LoveBaseController : Controller
    {
        private const string PATH = "/Template/baby/assets";
        public void setTemplate()
        {
            _v.Init(PATH + "/");
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

        public LoveBaseController()
        {
            _v = _v == null ? new TemplateHelper.VelocityHelper() : _v;
        }  
         
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            setTemplate();
            v.Put("path", PATH);   
        } 
    }
}