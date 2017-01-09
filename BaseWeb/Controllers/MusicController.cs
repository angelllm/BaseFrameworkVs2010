using BaseWeb.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;
using Util;

namespace BaseWeb.Controllers
{
    public class MusicController : HtmlController
    {
        //
        // GET: /Contact/

        public ActionResult Index(int? id)
        {
            IList<llm.Model.music> songlist = new List<llm.Model.music>();
            IList<llm.Model.music> imgsonglist = new List<llm.Model.music>();
            getSonglist(imgsonglist, 22, 1, "imglist");
            getSonglist(songlist, 20, 16, "paylist");

            StringHelper sh = new StringHelper();
            v.Put("sheler", sh);
            v.Display("music.html");
            return View();
        }

        private void getSonglist(IList<llm.Model.music> songlist,int top,int type,string initname)
        {
            DateTime dt = DateTime.Now;
            string timeTemp = dt.Year + "" + dt.Month + dt.Day + dt.Hour + dt.Minute + dt.Second + dt.Millisecond;
            // int type = 16;//1、新歌榜，2、热歌榜 11、摇滚榜，12、爵士，16、流行  21、欧美金曲榜，22、经典老歌榜，23、情歌对唱榜，24、影视金曲榜，25、网络歌曲榜
            string paylisturl = string.Format("http://tingapi.ting.baidu.com/v1/restserver/ting?from=ios&size={0}&type={1}&_t={2}&format=json&callback=__.cb_list&method=baidu.ting.billboard.billList&_={2}&version=2.1.1", top, type, timeTemp);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(paylisturl);
            request.Method = "GET";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                Stream resStream = response.GetResponseStream();
                StreamReader streamReader = new StreamReader(resStream, Encoding.GetEncoding("UTF-8"));
                string content = streamReader.ReadToEnd();
                content = content.Replace("/**/", "").Replace("__.", "").Replace("});", "}").Replace("cb_list({", "{");

                JObject jo = JObject.Parse(content);
                string[] ja = jo.Properties().Select(item => item.Value.ToString()).ToArray();
                if (ja.Length > 0)
                {
                    JArray songarray = (JArray)JsonConvert.DeserializeObject(ja[0]);
                    for (int j = 0; j < songarray.Count; j++)
                    {
                        llm.Model.music m = new llm.Model.music();
                        m.music_album = songarray[j]["album_title"].ToString();
                        m.music_album_id = Convert.ToInt32(songarray[j]["album_id"].ToString());
                        m.music_author = songarray[j]["author"].ToString();
                        m.music_bg_image = "";
                        m.music_country = songarray[j]["country"].ToString();
                        m.music_image = songarray[j]["pic_big"].ToString();
                        m.music_language = songarray[j]["language"].ToString();
                        m.music_lrc = songarray[j]["lrclink"].ToString();
                        m.music_lrclink = songarray[j]["lrclink"].ToString();
                        m.music_order = 0;
                        m.music_pub_time = Convert.ToDateTime(songarray[j]["publishtime"].ToString());
                        m.music_pv = 0;
                        m.music_remark = "";
                        m.music_singer = songarray[j]["artist_name"].ToString();
                        m.music_small_image = songarray[j]["pic_small"].ToString();
                        m.music_song_id = songarray[j]["song_id"].ToString();
                        m.music_status = 1;
                        m.music_time = DateTime.Now;
                        m.music_title = songarray[j]["title"].ToString();
                        m.music_type_id = 1;
                        m.music_url = "http://ting.baidu.com/data/music/links?songIds=" + m.music_song_id;

                        songlist.Add(m);
                    }
                }  
                v.Put(initname, songlist);

            }
        }

        public JsonResult GetMusic(int? songid)
        {
            DateTime dt = DateTime.Now;
            string timeTemp = dt.Year + "" + dt.Month + dt.Day + dt.Hour + dt.Minute + dt.Second + dt.Millisecond;
            JsonResult jr = new JsonResult();
            string url = "http://tingapi.ting.baidu.com/v1/restserver/ting?from=ios&method=baidu.ting.song.play&bit=flac&format=json&callback=&_=" + timeTemp + "&songid=" + songid;
            HttpWebRequest rq = (HttpWebRequest)WebRequest.Create(url);
            rq.Method = "GET";
            HttpWebResponse rp = (HttpWebResponse)rq.GetResponse();
            if (rp.StatusCode == HttpStatusCode.OK)
            {
                Stream rs = rp.GetResponseStream();
                StreamReader rsd = new StreamReader(rs, Encoding.GetEncoding("UTF-8"));
                jr.Data = rsd.ReadToEnd();
            }
            return jr;
        }

    }
}
