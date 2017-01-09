using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IBatisServer;

namespace BaseWeb.Common
{
    public class WpTempController : Controller
    {
        configService cs = new configService();
        pageService ps = new pageService();
        SysTypeService ts = new SysTypeService();
        public void setTemplate()
        {
            _v.Init("/Template/wp/");
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
        public WpTempController()
        {
            _v = _v == null ? new TemplateHelper.VelocityHelper() : _v;
        } 
         
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            setTemplate();
            IList<llm.Model.config> list = cs.GetModelList("config_status = 1");
            configs config = new configs(list);
            IList<llm.Model.sys_type> tlist = ts.GetModelList2("type_status = 1");
            configs tconfig = new configs(tlist);
            IList<llm.Model.page> plist = ps.GetModelList("page_status = 1");
            configs pconfig = new configs(plist);
            v.Put("path", "/Template/wp");
            v.Put("json", config);
            v.Put("aid", "");
            v.Put("tjson", tconfig);
            v.Put("pjson", pconfig);
            Util.StringHelper sh = new Util.StringHelper();
            v.Put("shelper", sh);
            //string jsonstring = Newtonsoft.Json. JsonConvert.SerializeObject(list);
            //v.Put("config", jsonstring); 

        }

        //public JsonResult NavList() {
        //    JsonResult jr = new JsonResult();
        //    SysTypeService sts = new SysTypeService();

        //    jr.Data = sts.GetModelList("type_code = 'cate'");
        //    return jr; 
        //}

        public class configs
        {
            IList<llm.Model.config> list;
            IList<llm.Model.page> plist;
            IList<llm.Model.sys_type> tlist;

            public IList<llm.Model.sys_type> Tlist
            {
                get { return tlist; }
                set { tlist = value; }
            }

            public IList<llm.Model.page> Plist
            {
                get { return plist; }
                set { plist = value; }
            }

            public IList<llm.Model.config> List
            {
                get { return list; }
                set { list = value; }
            }
             

            public configs() { }
            public configs(IList<llm.Model.config> list) {
                this.List = list;
            }
            public configs(IList<llm.Model.page> plist)
            {
                this.Plist = plist;
            }
            public configs(IList<llm.Model.sys_type> tlist)
            {
                this.Tlist = tlist;
            }
            public string config( string key)
            {
                string outhtml = ""; 
                foreach (var item in List)
                {
                    if (item.config_code == key)
                    {
                        outhtml = item.config_value; break;
                    }
                }
                return outhtml;
            }

            public IList<llm.Model.sys_type> tconfig(string key)
            {
                IList<llm.Model.sys_type> outhtml = new List<llm.Model.sys_type>();
                foreach (var item in Tlist)
                {
                    if (item.type_code == key || item.type_dict_code == key)
                    {
                        outhtml.Add(item);
                    }
                }
                return outhtml;
            }

            public IList<llm.Model.page> pconfig(int tid)
            {
                IList<llm.Model.page> outhtml = new List<llm.Model.page>();
                foreach (var item in Plist)
                {
                    if (item.page_type_id == tid)
                    {
                        outhtml.Add(item);
                    }
                }
                return outhtml;
            }
        }

        /*
        public string getConfig(string jsonstring,int rows ,string key) {
            Newtonsoft.Json.Linq.JArray ja = (Newtonsoft.Json.Linq.JArray)Newtonsoft.Json.JsonConvert.DeserializeObject(jsonstring);
            return ja[rows][key].ToString();
        }*/

    }
}