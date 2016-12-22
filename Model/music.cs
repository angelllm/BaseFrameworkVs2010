using System;
namespace llm.Model
{
    /// <summary>
    /// music:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class music
    {
        public music()
        { }
        #region Model
        private int _music_id;
        private string _music_title;
        private string _music_song_id;
        private string _music_author;
        private string _music_language;
        private string _music_country;
        private string _music_small_image;
        private string _music_image;
        private string _music_url;
        private string _music_show_url;
        private string _music_format;
        private string _music_xcode;
        private string _music_bg_image;
        private string _music_remark;
        private string _music_lrc;
        private string _music_lrclink;
        private int? _music_order;
        private int? _music_pv;
        private int? _music_time_length;
        private int? _music_size;
        private int? _music_status;
        private string _music_album;
        private int? _music_album_id;
        private string _music_singer;
        private int? _music_singer_id;
        private DateTime? _music_pub_time = DateTime.Now;
        private DateTime? _music_time = DateTime.Now;
        private int? _music_type_id;
        /// <summary>
        /// 
        /// </summary>
        public int music_id
        {
            set { _music_id = value; }
            get { return _music_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_title
        {
            set { _music_title = value; }
            get { return _music_title; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_song_id
        {
            set { _music_song_id = value; }
            get { return _music_song_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_author
        {
            set { _music_author = value; }
            get { return _music_author; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_language
        {
            set { _music_language = value; }
            get { return _music_language; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_country
        {
            set { _music_country = value; }
            get { return _music_country; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_small_image
        {
            set { _music_small_image = value; }
            get { return _music_small_image; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_image
        {
            set { _music_image = value; }
            get { return _music_image; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_url
        {
            set { _music_url = value; }
            get { return _music_url; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_show_url
        {
            set { _music_show_url = value; }
            get { return _music_show_url; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_format
        {
            set { _music_format = value; }
            get { return _music_format; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_xcode
        {
            set { _music_xcode = value; }
            get { return _music_xcode; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_bg_image
        {
            set { _music_bg_image = value; }
            get { return _music_bg_image; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_remark
        {
            set { _music_remark = value; }
            get { return _music_remark; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_lrc
        {
            set { _music_lrc = value; }
            get { return _music_lrc; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_lrclink
        {
            set { _music_lrclink = value; }
            get { return _music_lrclink; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_order
        {
            set { _music_order = value; }
            get { return _music_order; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_pv
        {
            set { _music_pv = value; }
            get { return _music_pv; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_time_length
        {
            set { _music_time_length = value; }
            get { return _music_time_length; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_size
        {
            set { _music_size = value; }
            get { return _music_size; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_status
        {
            set { _music_status = value; }
            get { return _music_status; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_album
        {
            set { _music_album = value; }
            get { return _music_album; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_album_id
        {
            set { _music_album_id = value; }
            get { return _music_album_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string music_singer
        {
            set { _music_singer = value; }
            get { return _music_singer; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_singer_id
        {
            set { _music_singer_id = value; }
            get { return _music_singer_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? music_pub_time
        {
            set { _music_pub_time = value; }
            get { return _music_pub_time; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? music_time
        {
            set { _music_time = value; }
            get { return _music_time; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? music_type_id
        {
            set { _music_type_id = value; }
            get { return _music_type_id; }
        }
        #endregion Model

    }
}

