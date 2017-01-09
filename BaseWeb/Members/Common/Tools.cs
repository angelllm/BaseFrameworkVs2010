using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Members.Common
{
    public class Tools
    {
        public string getSession() { return HttpContext.Current.Session["llm"] + ""; }

        public void setSession() { HttpContext.Current.Session["llm"] = "llm"; }
         
        //可以共享cookie 不能共享session
        public void setCookies(string cookname,string cookvalue)
        {
            HttpCookie hc = new HttpCookie(cookname);

            System.Text.Encoding enc = System.Text.Encoding.GetEncoding("utf-8");
            hc.Value = HttpUtility.UrlEncode(Util.DESEncrypt.Encrypt(cookvalue), enc);
            hc.HttpOnly = false;
            HttpContext.Current.Response.SetCookie(hc);

        }
        public string getCookie(string cookname)
        {

            System.Text.Encoding enc = System.Text.Encoding.GetEncoding("utf-8");
            string str = "";
            try
            {
                str = HttpContext.Current.Request.Cookies[cookname] == null ? null : Util.DESEncrypt.Decrypt(
                             HttpUtility.UrlDecode(
                                HttpContext.Current.Request.Cookies[cookname].Value.Trim(),
                                enc
                            ));
            }
            catch
            {
                str = "";
            }
            return str;

        }
     

    }
}