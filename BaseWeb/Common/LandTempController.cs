using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IBatisServer;

namespace BaseWeb.Common
{
    public class LandTempController : Controller
    {
        private const string PATH = "/Template/land";
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

        public LandTempController()
        {
            _v = _v == null ? new TemplateHelper.VelocityHelper() : _v;
        }  
         
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            setTemplate();
            v.Put("path", PATH);
            llm.Model.webbase wb = new llm.Model.webbase();
            ArticleService ass = new ArticleService();
            #region 网站基数
            //网站基数
            llm.Model.article art = ass.GetLastUpdateTime(); 
            wb.article_count = (int)art.article_total;
            wb.commite_count = art.commite_count;
            wb.web_time = "2016-2-18";
            DateTime dt = DateTime.Now;
            wb.last_updatetime = art.article_last_time.Replace("/", "-");
            TimeSpan ts = dt - Convert.ToDateTime(wb.web_time);
            wb.web_daycount = (int)Math.Floor(ts.TotalDays) + 1;
            wb.tag_count = (int)art.article_new;
            #endregion
            //近期文章
            IList<llm.Model.article> newtoplist = ass.GetModelListByPageUseTopForLand(5, 1*5, "and article_status = 1");
            v.Put("newtoplist", newtoplist);
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("shelper", sh);
            v.Put("wb", wb);
            string uid = "" , uface = "";
            string ucookie = Util.Cookie.getUidByCookie();
            if (ucookie != "")
            {
                try
                {
                    uid = ucookie.Split('|')[0];
                    uface = ucookie.Split('|')[1];
                }
                catch
                {
                }
            }
            v.Put("uid", uid);
            v.Put("uface", uface);
        } 
    }
}