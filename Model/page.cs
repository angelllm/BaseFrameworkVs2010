using System;
namespace llm.Model
{
	/// <summary>
	/// page:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class page
	{
		public page()
		{}
		#region Model
		private int _page_id;
        private int _type_cid;
		private string _page_title;
		private string _page_name;
		private string _page_image;
		private string _page_url;
		private string _page_url_type;
		private string _page_content;
		private string _page_remark;
		private string _page_description;
		private string _page_keywords;
		private int? _page_order;
		private int? _page_pv;
		private int? _page_status;
		private int? _page_type_id;

        private string _page_footer;
        private string _page_contact;

        private int? _page_total;

        public int? page_total
        {
            get { return _page_total; }
            set { _page_total = value; }
        }
        private int? _page_new;

        public int? page_new
        {
            get { return _page_new; }
            set { _page_new = value; }
        }

        private DateTime _page_time;

        public DateTime page_time
        {
            get { return _page_time; }
            set { _page_time = value; }
        }


        public string page_footer
        {
            set { _page_footer = value; }
            get { return _page_footer; }
        }
        public string page_contact
        {
            set { _page_contact = value; }
            get { return _page_contact; }
        }
		/// <summary>
		/// 
		/// </summary>
		public int page_id
		{
			set{ _page_id=value;}
			get{return _page_id;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int type_cid
        {
            set { _type_cid = value; }
            get { return _type_cid; }
        }
		/// <summary>
		/// 
		/// </summary>
		public string page_title
		{
			set{ _page_title=value;}
			get{return _page_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_name
		{
			set{ _page_name=value;}
			get{return _page_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_image
		{
			set{ _page_image=value;}
			get{return _page_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_url
		{
			set{ _page_url=value;}
			get{return _page_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_url_type
		{
			set{ _page_url_type=value;}
			get{return _page_url_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_content
		{
			set{ _page_content=value;}
			get{return _page_content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_remark
		{
			set{ _page_remark=value;}
			get{return _page_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_description
		{
			set{ _page_description=value;}
			get{return _page_description;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string page_keywords
		{
			set{ _page_keywords=value;}
			get{return _page_keywords;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? page_order
		{
			set{ _page_order=value;}
			get{return _page_order;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? page_pv
		{
			set{ _page_pv=value;}
			get{return _page_pv;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? page_status
		{
			set{ _page_status=value;}
			get{return _page_status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? page_type_id
		{
			set{ _page_type_id=value;}
			get{return _page_type_id;}
		}
		#endregion Model

	}
}

