<%@ WebHandler Language="C#" Class="UEditorHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections;
using Newtonsoft.Json;

public class UEditorHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        Handler action = null;
        Members.Common.Tools t = new Members.Common.Tools();
        string uid = t.getCookie("uid");
        switch (context.Request["action"])
        {
            case "config":
                action = new ConfigHandler(context);
                break;
            case "uploadimage":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.GetStringList("imageAllowFiles"),
                    PathFormat = string.IsNullOrEmpty(uid) ? Config.GetString("imagePathFormat") : Config.GetString("imagePathFormat").Replace("image",uid),
                    SizeLimit = Config.GetInt("imageMaxSize"),
                    UploadFieldName = Config.GetString("imageFieldName")
                });
                break;
            case "uploadscrawl":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = new string[] { ".png" },
                    PathFormat = Config.GetString("scrawlPathFormat"),
                    SizeLimit = Config.GetInt("scrawlMaxSize"),
                    UploadFieldName = Config.GetString("scrawlFieldName"),
                    Base64 = true,
                    Base64Filename = "scrawl.png"
                });
                break;
            case "uploadvideo":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.GetStringList("videoAllowFiles"),
                    PathFormat = Config.GetString("videoPathFormat"),
                    SizeLimit = Config.GetInt("videoMaxSize"),
                    UploadFieldName = Config.GetString("videoFieldName")
                });
                break;
            case "uploadfile":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.GetStringList("fileAllowFiles"),
                    PathFormat = Config.GetString("filePathFormat"),
                    SizeLimit = Config.GetInt("fileMaxSize"),
                    UploadFieldName = Config.GetString("fileFieldName")
                });
                break;
            case "listimage":
                action = new ListFileManager(context, string.IsNullOrEmpty(uid) ? Config.GetString("imageManagerListPath") : Config.GetString("imageManagerListPath").Replace("image", uid), Config.GetStringList("imageManagerAllowFiles"));
                break;
            case "listfile":
                action = new ListFileManager(context, Config.GetString("fileManagerListPath"), Config.GetStringList("fileManagerAllowFiles"));
                break;
            case "catchimage":
                action = new CrawlerHandler(context);
                break;
            default:
                action = new NotSupportedHandler(context);
                break;
        }
        action.Process();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}