using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Text.RegularExpressions;

namespace Util
{  
    public class dirHelper {

        #region 获取指定文件夹下所有子目录及文件(树形)
        /**************************************** 
         * 函数名称：GetFoldAll(string Path) 
         * 功能说明：获取指定文件夹下所有子目录及文件(树形) 
         * 参    数：Path:详细路径 
         * 调用示列： 
         *           string strDirlist = Server.MapPath("templates");        
         *           this.Literal1.Text = EC.FileObj.GetFoldAll(strDirlist);   
        *****************************************/
        /// <summary> 
        /// 获取指定文件夹下所有子目录及文件 
        /// </summary> 
        /// <param name="Path">详细路径</param> 
        public string GetFoldAll(string Path)
        {

            string str = "";
            System.IO.DirectoryInfo thisOne = new System.IO.DirectoryInfo(Path);
            str = ListTreeShow(thisOne, 0, str);
            return str;

        }

        /// <summary> 
        /// 获取指定文件夹下所有子目录及文件函数 
        /// </summary> 
        /// <param name="theDir">指定目录</param> 
        /// <param name="nLevel">默认起始值,调用时,一般为0</param> 
        /// <param name="Rn">用于迭加的传入值,一般为空</param> 
        /// <returns></returns> 
        /// 
        string temp ="<a style=\"padding-left:{2}px\" class=\"menu-item\" data=\"/Admin/OnlineList/?src={0}\">"+
                            "<em class=\"set-tag dir\"></em>"+
                            "<label>{1}</label>"+
                            "<div class=\"clear\"></div>"+
                       "</a>";
        string path = "";
        public string AllMl(System.IO.DirectoryInfo theDir, int nLevel, string Rn, string replace)//递归目录 文件 
        {
            System.IO.DirectoryInfo[] subDirectories = theDir.GetDirectories();//获得目录 
            
            foreach (System.IO.DirectoryInfo dirinfo in subDirectories)
            {
                path = dirinfo.FullName.Replace("\\", "/").Substring(dirinfo.FullName.Replace("\\", "/").IndexOf(replace));
                if (nLevel == 0)
                {
                    Rn += string.Format(temp, path, dirinfo.Name, "10");
                }
                else
                {
                    Rn += string.Format(temp, path, dirinfo.Name, (nLevel * 10).ToString());
                }

                Rn = AllMl(dirinfo, nLevel + 1, Rn, replace); 

                #region get file
                //Rn += "<b>" + dirinfo.Name.ToString() + "</b><br />";
                /* System.IO.FileInfo[] fileInfo = dirinfo.GetFiles();   //目录下的文件 
                 foreach (System.IO.FileInfo fInfo in fileInfo)
                 {
                     if (nLevel == 0)
                     {
                         Rn += "│ ├";
                     }
                     else
                     {
                         string _f = "";
                         for (int i = 1; i <= nLevel; i++)
                         {
                             _f += "│ ";
                         }
                         Rn += _f + "│ ├";
                     }
                     Rn += fInfo.Name.ToString() + " <br />";
                 }*/
                #endregion
               
            }
            return Rn;
        }

        public string ListTreeShow(System.IO.DirectoryInfo theDir, int nLevel, string Rn)//递归目录 文件 
        {
            System.IO.DirectoryInfo[] subDirectories = theDir.GetDirectories();//获得目录 
            foreach (System.IO.DirectoryInfo dirinfo in subDirectories)
            {

                if (nLevel == 0)
                {
                    Rn += string.Format(temp,dirinfo.FullName,dirinfo.Name,"0");
                }
                else
                {
                    for (int i = 1; i <= nLevel; i++)
                    {
                       
                    }
                    Rn +=  string.Format(temp, dirinfo.FullName, dirinfo.Name, ""); 
                }
                //Rn += "<b>" + dirinfo.Name.ToString() + "</b><br />";
               /* System.IO.FileInfo[] fileInfo = dirinfo.GetFiles();   //目录下的文件 
                foreach (System.IO.FileInfo fInfo in fileInfo)
                {
                    if (nLevel == 0)
                    {
                        Rn += "│ ├";
                    }
                    else
                    {
                        string _f = "";
                        for (int i = 1; i <= nLevel; i++)
                        {
                            _f += "│ ";
                        }
                        Rn += _f + "│ ├";
                    }
                    Rn += fInfo.Name.ToString() + " <br />";
                }*/
                Rn = ListTreeShow(dirinfo, nLevel + 1, Rn);


            }
            return Rn;
        }



        /**************************************** 
         * 函数名称：GetFoldAll(string Path) 
         * 功能说明：获取指定文件夹下所有子目录及文件(下拉框形) 
         * 参    数：Path:详细路径 
         * 调用示列： 
         *            string strDirlist = Server.MapPath("templates");       
         *            this.Literal2.Text = EC.FileObj.GetFoldAll(strDirlist,"tpl",""); 
        *****************************************/
        /// <summary> 
        /// 获取指定文件夹下所有子目录及文件(下拉框形) 
        /// </summary> 
        /// <param name="Path">详细路径</param> 
        ///<param name="DropName">下拉列表名称</param> 
        ///<param name="tplPath">默认选择模板名称</param> 
        public string GetFoldAll(string Path, string DropName, string tplPath)
        {
            string strDrop = "<select name=\"" + DropName + "\" id=\"" + DropName + "\"><option value=\"\">--请选择详细模板--</option>";
            string str = "";
            System.IO.DirectoryInfo thisOne = new System.IO.DirectoryInfo(Path);
            str = ListTreeShow(thisOne, 0, str, tplPath);
            return strDrop + str + "</select>";

        }

        /// <summary> 
        /// 获取指定文件夹下所有子目录及文件函数 
        /// </summary> 
        /// <param name="theDir">指定目录</param> 
        /// <param name="nLevel">默认起始值,调用时,一般为0</param> 
        /// <param name="Rn">用于迭加的传入值,一般为空</param> 
        /// <param name="tplPath">默认选择模板名称</param> 
        /// <returns></returns> 
        public string ListTreeShow(System.IO.DirectoryInfo theDir, int nLevel, string Rn, string tplPath)//递归目录 文件 
        {
            System.IO.DirectoryInfo[] subDirectories = theDir.GetDirectories();//获得目录 

            foreach (System.IO.DirectoryInfo dirinfo in subDirectories)
            {

                Rn += "<option value=\"" + dirinfo.Name.ToString() + "\"";
                if (tplPath.ToLower() == dirinfo.Name.ToString().ToLower())
                {
                    Rn += " selected ";
                }
                Rn += ">";

                if (nLevel == 0)
                {
                    Rn += "┣";
                }
                else
                {
                    string _s = "";
                    for (int i = 1; i <= nLevel; i++)
                    {
                        _s += "│ ";
                    }
                    Rn += _s + "┣";
                }
                Rn += "" + dirinfo.Name.ToString() + "</option>";


                System.IO.FileInfo[] fileInfo = dirinfo.GetFiles();   //目录下的文件 
                foreach (System.IO.FileInfo fInfo in fileInfo)
                {
                    Rn += "<option value=\"" + dirinfo.Name.ToString() + "/" + fInfo.Name.ToString() + "\"";
                    if (tplPath.ToLower() == fInfo.Name.ToString().ToLower())
                    {
                        Rn += " selected ";
                    }
                    Rn += ">";

                    if (nLevel == 0)
                    {
                        Rn += "│ ├";
                    }
                    else
                    {
                        string _f = "";
                        for (int i = 1; i <= nLevel; i++)
                        {
                            _f += "│ ";
                        }
                        Rn += _f + "│ ├";
                    }
                    Rn += fInfo.Name.ToString() + "</option>";
                }
                Rn = ListTreeShow(dirinfo, nLevel + 1, Rn, tplPath);


            }
            return Rn;
        }
        #endregion 
    }

    public static class getIP
    {
        public static string GetUserIP()
        {
            string userIP;
            if (HttpContext.Current.Request.ServerVariables["HTTP_VIA"] == null)
            {
                userIP = HttpContext.Current.Request.UserHostAddress;
            }
            else
            {
                userIP = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }
            return userIP;
        }
    }

    public static class MD5Reg
    {
        public static string formatePwd(string pwd)
        {
            return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(pwd + "jsczweb0512-52756698-0512COM-czweb000010512COM52756698", "md5");
        }


        public static string formatePwdNoAthoer(string pwd)
        {
            return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(pwd, "md5");
        }
    }

    public class StringHelper
    {  
        public  string getParentName(int id)
        {

            IBatisServer.dictService dss = new IBatisServer.dictService();
            llm.Model.dict dict = dss.GetModelById(id);
            return id == 0 ? "根目录" : (dict == null ? "<span style='color:#ff0000;'>对象已删除<span>" : dict.dict_name + "(" + dict.dict_id + ")");
        }
        public string getTypeParentName(int id)
        {
            IBatisServer.SysTypeService iss = new IBatisServer.SysTypeService();
            llm.Model.sys_type t = iss.GetModelById(id);
            return id == 0 ? "根目录" : (t == null ? "<span style='color:#ff0000;'>对象已删除<span>" : t.type_name + "(" + t.type_id + ")");
        }
        public string replaceAll(object obj)
        {
            return obj.ToString().Replace("├", "").Replace("─", "").Replace("╋", "");
        }
        public  string TimeDifference(object dt)
        {
            string tempTime = string.Empty;
            DateTime executeStart = Convert.ToDateTime(dt);
            DateTime executeEnd = DateTime.Now;
            System.TimeSpan executeSpan = executeEnd.Subtract(executeStart);
            tempTime = executeSpan.TotalSeconds.ToString();
            if (executeSpan.Days > 0)
            {
                tempTime = executeSpan.Days + " days";
            }
            else if (executeSpan.Hours > 0)
            {
                tempTime = executeSpan.Hours + " hours";
            }
            else if (executeSpan.Minutes > 0)
            {
                tempTime = executeSpan.Minutes + " minutes";
            }
            else if (executeSpan.Seconds > 0)
            {
                tempTime = executeSpan.Seconds + " seconds";
            }
             
            return tempTime;
        }
        public string TimeDifferenceZh(object dt)
        {
            string tempTime = string.Empty;
            DateTime executeStart = Convert.ToDateTime(dt);
            DateTime executeEnd = DateTime.Now;
            System.TimeSpan executeSpan = executeEnd.Subtract(executeStart);
            tempTime = executeSpan.TotalSeconds.ToString();
            if (executeSpan.Days > 0)
            {
                tempTime = executeSpan.Days + "天";
            }
            else if (executeSpan.Hours > 0)
            {
                tempTime = executeSpan.Hours + "小时";
            }
            else if (executeSpan.Minutes > 0)
            {
                tempTime = executeSpan.Minutes + "分钟";
            }
            else if (executeSpan.Seconds > 0)
            {
                tempTime = executeSpan.Seconds + "秒";
            }

            return tempTime;
        }
        public string TimeDiff(object dt)
        {
            string tempTime = string.Empty;
            int timelength = Convert.ToInt32(dt);
            tempTime = (timelength / 60) + ":" + (timelength % 60);
            return tempTime;
        }
    }

    public static class Tools
    {
        static Tools() { }

        public static void unzip(string iFile, string oFile)
        {
            string zipToUnpack = iFile;
            string unpackDirectory = oFile;
            using (Ionic.Zip.ZipFile zip1 = Ionic.Zip.ZipFile.Read(zipToUnpack))
            {
                foreach (Ionic.Zip.ZipEntry e in zip1)
                {
                    e.Extract(unpackDirectory, Ionic.Zip.ExtractExistingFileAction.OverwriteSilently);
                }
            }
        } 

        public static bool IsUrlLocalToHost(HttpContextBase context, string url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return false;
            }

            Uri absoluteUri;
            if (Uri.TryCreate(url, UriKind.Absolute, out absoluteUri))
            {
                return String.Equals(context.Request.Url.Host, absoluteUri.Host,
                            StringComparison.OrdinalIgnoreCase);
            }
            else
            {
                bool isLocal = !url.StartsWith("http:", StringComparison.OrdinalIgnoreCase)
                    && !url.StartsWith("https:", StringComparison.OrdinalIgnoreCase)
                    && Uri.IsWellFormedUriString(url, UriKind.Relative);
                return isLocal;
            }
        }

    }

    public static class SQL
    {
        /// <summary>
        /// 过滤标记 ALL
        /// </summary>
        /// <param name="NoHTML">包括HTML，脚本，数据库关键字，特殊字符的源码 </param>
        /// <returns>已经去除标记后的文字</returns>
        public static string NoHTML(string Htmlstring)
        {
            if (Htmlstring == null)
            {
                return "";
            }
            else
            {
                //删除脚本
                Htmlstring = Regex.Replace(Htmlstring, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);
                //删除HTML
                Htmlstring = Regex.Replace(Htmlstring, @"<(.[^>]*)>", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"([\r\n])[\s]+", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"-->", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"<!--.*", "", RegexOptions.IgnoreCase);

                Htmlstring = Regex.Replace(Htmlstring, @"&(quot|#34);", "\"", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(amp|#38);", "&", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(lt|#60);", "<", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(gt|#62);", ">", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(nbsp|#160);", " ", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(iexcl|#161);", "\xa1", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(cent|#162);", "\xa2", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(pound|#163);", "\xa3", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&(copy|#169);", "\xa9", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"&#(\d+);", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);

                //删除与数据库相关的词
                Htmlstring = Regex.Replace(Htmlstring, "select", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "insert", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete from", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "count''", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop table", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "truncate", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "asc", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "mid", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "char", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "exec master", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net localgroup administrators", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "and", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net user", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "or", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"*", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"-", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "script", "", RegexOptions.IgnoreCase);

                //特殊的字符
                Htmlstring = Htmlstring.Replace("<", "");
                Htmlstring = Htmlstring.Replace(">", "");
                Htmlstring = Htmlstring.Replace("*", "");
                Htmlstring = Htmlstring.Replace("-", "");
                Htmlstring = Htmlstring.Replace("?", "");
                Htmlstring = Htmlstring.Replace(",", "");
                Htmlstring = Htmlstring.Replace("/", "");
                Htmlstring = Htmlstring.Replace(";", "");
                Htmlstring = Htmlstring.Replace("*/", "");
                Htmlstring = Htmlstring.Replace("\r\n", "");
                Htmlstring = HttpContext.Current.Server.HtmlEncode(Htmlstring).Trim();

                return Htmlstring;
            }

        }

        /// <summary>
        /// 过滤标记 ALL
        /// </summary>
        /// <param name="NoHTML">包括HTML，脚本，数据库关键字，特殊字符的源码 </param>
        /// <returns>已经去除标记后的文字</returns>
        public static string NoHTML_2(string Htmlstring)
        {
            if (Htmlstring == null)
            {
                return "";
            }
            else
            {


                Htmlstring = Regex.Replace(Htmlstring, "insert", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete ", "", RegexOptions.IgnoreCase);

                Htmlstring = Regex.Replace(Htmlstring, "drop table", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "truncate", "", RegexOptions.IgnoreCase);

                Htmlstring = Regex.Replace(Htmlstring, "mid", "", RegexOptions.IgnoreCase);

                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "exec master", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net localgroup administrators", "", RegexOptions.IgnoreCase);

                Htmlstring = Regex.Replace(Htmlstring, "net user", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "or", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"*", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"-", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "script", "", RegexOptions.IgnoreCase);



                Htmlstring = Htmlstring.Trim();

                return Htmlstring;
            }
        }
        /// <summary>
        /// 过滤标记 Simple
        /// </summary>
        /// <param name="NoHTML">包括HTML，脚本，数据库关键字，特殊字符的源码 </param>
        /// <returns>已经去除标记后的文字</returns>
        public static string NoHTMLSimple(string Htmlstring)
        {
            if (Htmlstring == null)
            {
                return "";
            }
            else
            {
                //删除脚本
                Htmlstring = Regex.Replace(Htmlstring, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);
                //删除HTML

                Htmlstring = Regex.Replace(Htmlstring, @"-->", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"<!--.*", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "img", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "src", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "href", "", RegexOptions.IgnoreCase);
                //删除事件
                Htmlstring = Regex.Replace(Htmlstring, "onload", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onunload", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onchange", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onsubmit", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onreset", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onselect", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onblur", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onfocus", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onabort", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onkeydown", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onkeypress", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onkeyup", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onclick", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "ondblclick", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmousedown", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmousemove", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmouseout", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmouseover", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmouseup", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "javascript", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "submit", "", RegexOptions.IgnoreCase);

                //删除与数据库相关的词
                Htmlstring = Regex.Replace(Htmlstring, "select", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "insert", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete from", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "count''", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop table", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "truncate", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "asc", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "mid", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "char", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "exec master", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net localgroup administrators", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "and", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net user", "", RegexOptions.IgnoreCase);
                //Htmlstring = Regex.Replace(Htmlstring, "or", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"*", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"-", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "script", "", RegexOptions.IgnoreCase);

                //Htmlstring = HttpContext.Current.Server.HtmlEncode(Htmlstring).Trim();

                return Htmlstring;
            }

        }
        /// <summary>
        /// 过滤标记 Simple
        /// </summary>
        /// <param name="NoHTML">包括HTML，脚本，数据库关键字，特殊字符的源码 </param>
        /// <returns>已经去除标记后的文字</returns>
        public static string NoHTMLSimpletwo(string Htmlstring)
        {
            if (Htmlstring == null)
            {
                return "";
            }
            else
            {
                //删除脚本
                Htmlstring = Regex.Replace(Htmlstring, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "<link(?:.*?)href=[\"'](.*?)[\"'](?:.*?)>", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"<link[^>]*?>.*?</>", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"<link href[^>]*?>.*?</>", "", RegexOptions.IgnoreCase);
                //删除HTML

                Htmlstring = Regex.Replace(Htmlstring, @"-->", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, @"<!--.*", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);

                //删除事件
                Htmlstring = Regex.Replace(Htmlstring, "onload", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onunload", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onchange", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onsubmit", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onreset", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onselect", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onblur", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onfocus", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onabort", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onkeydown", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onkeypress", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onkeyup", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onclick", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "ondblclick", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmousedown", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmousemove", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmouseout", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmouseover", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "onmouseup", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "javascript", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "submit", "", RegexOptions.IgnoreCase);

                //删除与数据库相关的词
                Htmlstring = Regex.Replace(Htmlstring, "select", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "insert", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete from", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "count''", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop table", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "truncate", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "asc", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "mid", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "char", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "xp_cmdshell", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "exec master", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net localgroup administrators", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "and", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net user", "", RegexOptions.IgnoreCase);
                //Htmlstring = Regex.Replace(Htmlstring, "or", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "net", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"*", "", RegexOptions.IgnoreCase);
                //Htmlstring =  Regex.Replace(Htmlstring,"-", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "delete", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "drop", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "script", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "css", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "link", "", RegexOptions.IgnoreCase);
                Htmlstring = Regex.Replace(Htmlstring, "rel", "", RegexOptions.IgnoreCase);
                //Htmlstring = HttpContext.Current.Server.HtmlEncode(Htmlstring).Trim();

                return Htmlstring;
            }

        }



    }

    public static class Cookie {

        public static void setCode(string values)
        {
            HttpCookie aCookie = new HttpCookie("LLMZTT_UID");
            aCookie.Values["LLMZTT_UID"] = DESEncrypt.Encrypt(SQL.NoHTML_2(values));
            HttpContext.Current.Response.Cookies.Add(aCookie);
        }
        public static string getUidByCookie()
        {
            HttpCookie aCookie = HttpContext.Current.Request.Cookies["LLMZTT_UID"];
            System.Text.Encoding enc = System.Text.Encoding.GetEncoding("utf-8");
            string str = "";
            try
            {
                str = aCookie == null ? "" : DESEncrypt.Decrypt(
                             HttpUtility.UrlDecode(
                                aCookie.Values["LLMZTT_UID"],
                                enc
                            ));
            }
            catch
            {
                str = "";
            }
            return str;

        }

        public static void clearLogin() {
            HttpCookie aCookie = HttpContext.Current.Request.Cookies["LLMZTT_UID"];
            setCode("");
        }
    }
}
