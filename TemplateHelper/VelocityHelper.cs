﻿using System;
using System.Web;
using System.IO;
using NVelocity;
using NVelocity.App;
using NVelocity.Context;
using NVelocity.Runtime;
using Commons.Collections;
using System.Text;

namespace TemplateHelper
{


    /// <summary>
    /// NVelocity模板工具类 VelocityHelper
    /// </summary>
    public class VelocityHelper
    {
        private VelocityEngine velocity = null;
        private IContext context = null;
        public string has = "llm";
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="templatDir">模板文件夹路径</param>
        public VelocityHelper(string templatDir)
        {
            Init(templatDir);
        }

        /// <summary>
        /// 无参数构造函数
        /// </summary>
        public VelocityHelper() {  }

        /// <summary>
        /// 初始话NVelocity模块
        /// </summary>
        public void Init(string templatDir)
        {
            //创建VelocityEngine实例对象
            velocity = new VelocityEngine();

            //使用设置初始化VelocityEngine
            ExtendedProperties props = new ExtendedProperties();
            props.AddProperty(RuntimeConstants.RESOURCE_LOADER, "file");
            props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH,   HttpContext.Current.Server.MapPath(templatDir));
            //props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, Path.GetDirectoryName(HttpContext.Current.Request.PhysicalPath));
            props.AddProperty(RuntimeConstants.INPUT_ENCODING, "utf-8");
            props.AddProperty(RuntimeConstants.OUTPUT_ENCODING, "utf-8");

            //模板的缓存设置
            props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_CACHE, true);              //是否缓存
            props.AddProperty("file.resource.loader.modificationCheckInterval", (Int64)30);    //缓存时间(秒)
            //props.AddProperty(RuntimeConstants.RESOURCE_MANAGER_CLASS, true);          
            velocity.Init(props);

            //为模板变量赋值
            context = new VelocityContext();
        }

        /// <summary>
        /// 给模板变量赋值
        /// </summary>
        /// <param name="key">模板变量</param>
        /// <param name="value">模板变量值</param>
        public void Put(string key, object value)
        {
            if (context == null)
                context = new VelocityContext();
            context.Put(key, value);
        }
        public void Put(string key, object[] value)
        {
            if (context == null)
                context = new VelocityContext();
            foreach (var item in value)
                context.Put(key, item);  
        }
        /// <summary>
        /// 显示模板
        /// </summary>
        /// <param name="templatFileName">模板文件名</param>
        public void Display(string templatFileName)
        {
            //从文件中读取模板
            Template template = velocity.GetTemplate(templatFileName);
            //合并模板
            StringWriter writer = new StringWriter();
            template.Merge(context, writer);
            //输出
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.Write(writer.ToString());
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }

        /// <summary>
        /// 根据模板生成静态页面
        /// </summary>
        /// <param name="templatFileName"></param>
        /// <param name="htmlpath"></param>
        public void CreateHtml(string templatFileName, string htmlpath,string fileName)
        {
            //从文件中读取模板
            //模板总目录不能给用户下定义!只能放在我指定的地方!嘎嘎!!!

            Template template = velocity.GetTemplate(templatFileName);
            //合并模板
            StringWriter writer = new StringWriter();
            template.Merge(context, writer);
            string path = HttpContext.Current.Server.MapPath(htmlpath);
            if (!System.IO.Directory.Exists(htmlpath))
                System.IO.Directory.CreateDirectory(htmlpath);
            using (StreamWriter write2 = new StreamWriter(path + fileName, false, Encoding.UTF8, 200))
            {
                write2.Write(writer);
                write2.Flush();
                write2.Close();
            }

        }

        
    }

}
 