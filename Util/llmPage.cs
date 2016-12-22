
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;


namespace Util
{
    public class llmPage
    {
        private string contents = string.Empty;

        public string Contents
        {
            get { return contents; }
            set { contents = value; }
        }

        public llmPage(int ToatalCountRecord, int PageSize, int CurrentPage,string url)
        {
            int Step = 5;//偏移量   
            int LeftNum = 0;//左界限   
            int RightNum = 0;//右界限   
            string PageUrl = HttpContext.Current.Request.FilePath;
            int PageCount = (int)Math.Ceiling((double)(ToatalCountRecord) / PageSize);
            if (CurrentPage - Step < 1)
            {
                LeftNum = 1;
            }
            else
            {
                LeftNum = CurrentPage - Step;
            }
            if (CurrentPage + Step > PageCount)
            {
                RightNum = PageCount;
            }
            else
            {
                RightNum = CurrentPage + Step;
            }
            string OutPut = "";

            OutPut += "<a class=\"contorl-page\" href=\"" + url + "1\">首页</a>";
            if (CurrentPage > 1)
            {
                OutPut += " <a class=\"contorl-page\" href=" + url+(CurrentPage - 1) + ">" + "上一页" + " </a>";
            }
            else if (CurrentPage == 1)
            {
                OutPut += " <span class=\"contorl-page\">上一页</span> ";
            }
            for (int i = LeftNum; i <= RightNum; i++)
            {
                if (i == CurrentPage)
                {
                    OutPut += " " + "<span class=\"cur-page\">" + i.ToString() + "</span>" + "";
                }
                else
                {
                    if (i==LeftNum && CurrentPage==0)
                        OutPut += " " + "<span class=\"cur-page\">" + i.ToString() + "</span>" + "";
                    else
                    OutPut += " <a href=" +url+ i.ToString() + ">" + i.ToString() + " </a>";
                }
            }
            if (CurrentPage < PageCount)
            { 
                CurrentPage = CurrentPage == 0 ? CurrentPage + 1: CurrentPage;
                OutPut += " <a class=\"contorl-page\" href=" + url + (CurrentPage + 1) + "> 下一页  </a>";
            }
            if (CurrentPage == PageCount && CurrentPage != 1)
            {
                OutPut += " <span class=\"contorl-page\">下一页</span> ";
            }
            int last;
            if (ToatalCountRecord % PageSize == 0)
                last = ToatalCountRecord / PageSize;
            else
                last = ToatalCountRecord / PageSize + 1;
            if (last == CurrentPage)
                OutPut += "<span class=\"contorl-page\" >" + "末页" + "</span>";
            else 
            OutPut += "<a class=\"contorl-page\" href=" + url + last + ">" + "末页" + "</a>";

            Contents = OutPut;
        }

        public llmPage(int ToatalCountRecord, int PageSize, int CurrentPage, string url , System.Collections.Generic.Dictionary<string,string> dict)
        {
           
            int Step = 5;//偏移量   
            int LeftNum = 0;//左界限   
            int RightNum = 0;//右界限   
            string PageUrl = HttpContext.Current.Request.FilePath;
            int PageCount = (int)Math.Ceiling((double)(ToatalCountRecord) / PageSize);
            if (CurrentPage - Step < 1)
            {
                LeftNum = 1;
            }
            else
            {
                LeftNum = CurrentPage - Step;
            }
            if (CurrentPage + Step > PageCount)
            {
                RightNum = PageCount;
            }
            else
            {
                RightNum = CurrentPage + Step;
            }
            string OutPut = "";
            string hz = "?";
      
            foreach (var item in dict)
                hz += item.Key + "=" + item.Value + "&";

            OutPut += "<a class=\"contorl-page\" href=\"" + url + "1" + hz + "\">首页</a>";
            if (CurrentPage > 1)
            {
                OutPut += " <a class=\"contorl-page\" href=" + url + (CurrentPage - 1) + hz + ">" + "上一页" + " </a>";
            }
            if (CurrentPage == 1)
            {
                OutPut += " <span class=\"contorl-page\">上一页</span> ";
            }
            for (int i = LeftNum; i <= RightNum; i++)
            {
                if (i == CurrentPage)
                {
                    OutPut += " " + "<span class=\"cur-page\">" + i.ToString() + "</span>" + "";
                }
                else
                {
                    if (i == LeftNum && CurrentPage == 0)
                        OutPut += " " + "<span class=\"cur-page\">" + i.ToString() + "</span>" + "";
                    else
                        OutPut += " <a href=" + url + i.ToString() + hz + ">" + i.ToString() + " </a>";
                }
            }
            if (CurrentPage < PageCount)
            {
                OutPut += " <a class=\"contorl-page\" href=" + url + (PageCount ==1?1: CurrentPage == 0 ? 2 : CurrentPage + 1) + hz + "> 下一页  </a>";
            }
            else if (CurrentPage == PageCount)
            {
                OutPut += " <span class=\"contorl-page\">下一页</span> ";
            }
            int last;
            if (ToatalCountRecord % PageSize == 0)
                last = ToatalCountRecord / PageSize;
            else
                last = ToatalCountRecord / PageSize + 1;
            if (last == CurrentPage)
                OutPut += "<span class=\"contorl-page\" >" + "末页" + "</span>";
            else
                OutPut += "<a class=\"contorl-page\" href=" + url + last + hz + ">" + "末页" + "</a>";

            Contents = OutPut;
        }

        public llmPage(int ToatalCountRecord, int PageSize, int CurrentPage, string url,int t)
        {
            int Step = 5;//偏移量   
            int LeftNum = 0;//左界限   
            int RightNum = 0;//右界限   
            string PageUrl = HttpContext.Current.Request.FilePath;
            int PageCount = (int)Math.Ceiling((double)(ToatalCountRecord) / PageSize);
            if (CurrentPage - Step < 1)
            {
                LeftNum = 1;
            }
            else
            {
                LeftNum = CurrentPage - Step;
            }
            if (CurrentPage + Step > PageCount)
            {
                RightNum = PageCount;
            }
            else
            {
                RightNum = CurrentPage + Step;
            }
            string OutPut = "";

            
            if (CurrentPage > 1)
            {
                OutPut += "<li><a href=\"" + url + (CurrentPage - 1) + "\"><i class=\"fa fa-chevron-left\"></i></a></li>";
            }
            else if (CurrentPage == 1)
            {
                OutPut += "<li><a><i class=\"fa fa-chevron-left\"></i></a></li>";
            }
            for (int i = LeftNum; i <= RightNum; i++)
            {
                if (i == CurrentPage)
                {
                    OutPut += "<li class=\"active\"><a>" + i.ToString() + "</a></li>";
                }
                else
                {
                    if (i == LeftNum && CurrentPage == 0)
                        OutPut += "<li class=\"active\"><a>" + i.ToString() + "</a></li>";
                    else
                        OutPut += "<li ><a href=" + url + i.ToString() + ">" + i.ToString() + "</a></li>";
                }
            }
            if (CurrentPage < PageCount && PageCount != 1)
            {
                CurrentPage = CurrentPage == 0 ? CurrentPage + 1 : CurrentPage;
                OutPut += "<li><a href=\"" + url + (CurrentPage + 1) + "\"><i class=\"fa fa-chevron-right\"></i></a></li>";
            }
            if (CurrentPage == PageCount)
            {
                OutPut += "<li><a><i class=\"fa fa-chevron-right\"></i></a></li>";
            } 

            Contents = OutPut;
        }
    }
}
