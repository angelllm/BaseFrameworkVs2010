using System;
namespace llm.Model
{
	/// <summary>
	/// article:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class article
	{
		public article()
		{}
		#region Model
		private int _article_id;
		private string _article_title;
		private string _article_shut_title;
		private string _article_title_color;
		private bool _article_is_bold;
		private bool _article_is_italic;
		private bool _article_is_top;
		private int? _article_pv;
		private string _article_guid;
		private string _article_ref_url;
		private string _article_html_url;
		private string _article_seo_desc;
		private string _article_seo_kw;
		private string _article_summary;
		private string _article_tag;
		private string _article_source;
		private string _article_remark;
		private string _article_content;
		private int? _article_type;
		private int? _article_cid;
		private DateTime? _article_time;
		private int? _article_status;
		private string _article_image;
        private string _type_name;
        private string _article_type_name;
        private int? _article_like;

        private string _article_last_time;

        public string article_last_time
        {
            get { return _article_last_time; }
            set { _article_last_time = value; }
        }

        //扩展的属性
        #region 扩展的属性
        
        private int? _article_total;
        private int? _article_new;

        public int? article_total
        {
            get { return _article_total; }
            set { _article_total = value; }
        }
        public int? article_new
        {
            get { return _article_new; }
            set { _article_new = value; }
        }

        #endregion

        #region 文章归档属性
        private int? _year;

        public int? year
        {
            get { return _year; }
            set { _year = value; }
        }
        private int? _month;

        public int? month
        {
            get { return _month; }
            set { _month = value; }
        }
        private int? _count;

        public int? count
        {
            get { return _count; }
            set { _count = value; }
        }
        #endregion

        public int? article_like
        {
            get { return _article_like; }
            set { _article_like = value; }
        }

        public string article_type_name
        {
            get { return _article_type_name; }
            set { _article_type_name = value; }
        }
        private int _content_count;
        private int _commite_count;

        public int commite_count
        {
            get { return _commite_count; }
            set { _commite_count = value; }
        }

        public int content_count
        {
            get { return _content_count; }
            set { _content_count = value; }
        }

        public string type_name
        {
            get { return _type_name; }
            set { _type_name = value; }
        }
		/// <summary>
		/// 
		/// </summary>
		public int article_id
		{
			set{ _article_id=value;}
			get{return _article_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_title
		{
			set{ _article_title=value;}
			get{return _article_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_shut_title
		{
			set{ _article_shut_title=value;}
			get{return _article_shut_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_title_color
		{
			set{ _article_title_color=value;}
			get{return _article_title_color;}
		}
		/// <summary>
		/// 
		/// </summary>
		public bool article_is_bold
		{
			set{ _article_is_bold=value;}
			get{return _article_is_bold;}
		}
		/// <summary>
		/// 
		/// </summary>
		public bool article_is_italic
		{
			set{ _article_is_italic=value;}
			get{return _article_is_italic;}
		}
		/// <summary>
		/// 
		/// </summary>
		public bool article_is_top
		{
			set{ _article_is_top=value;}
			get{return _article_is_top;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? article_pv
		{
			set{ _article_pv=value;}
			get{return _article_pv;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_guid
		{
			set{ _article_guid=value;}
			get{return _article_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_ref_url
		{
			set{ _article_ref_url=value;}
			get{return _article_ref_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_html_url
		{
			set{ _article_html_url=value;}
			get{return _article_html_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_seo_desc
		{
			set{ _article_seo_desc=value;}
			get{return _article_seo_desc;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_seo_kw
		{
			set{ _article_seo_kw=value;}
			get{return _article_seo_kw;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_summary
		{
			set{ _article_summary=value;}
			get{return _article_summary;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_tag
		{
			set{ _article_tag=value;}
			get{return _article_tag;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_source
		{
			set{ _article_source=value;}
			get{return _article_source;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_remark
		{
			set{ _article_remark=value;}
			get{return _article_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_content
		{
			set{ _article_content=value;}
			get{return _article_content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? article_type
		{
			set{ _article_type=value;}
			get{return _article_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? article_cid
		{
			set{ _article_cid=value;}
			get{return _article_cid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? article_time
		{
			set{ _article_time=value;}
			get{return _article_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? article_status
		{
			set{ _article_status=value;}
			get{return _article_status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string article_image
		{
			set{ _article_image=value;}
			get{return _article_image;}
		}
		#endregion Model

	}
}

