using System;
namespace llm.Model
{
	/// <summary>
	/// sys_type:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class sys_type
	{
		public sys_type()
		{}
		#region Model
		private int _type_id;
		private string _type_name;
		private string _type_guid;
		private int? _type_parent;
		private int? _type_depth;
		private string _type_parent_name;
        private string _type_dict_code;
        private string _type_code;
		private string _type_path;
		private string _type_image;
		private string _type_image_list;
		private string _type_summary;
		private string _type_detail;
		private string _type_content;
		private string _type_url;
		private int? _type_status;
		private int? _type_cid;
		private string _type_cid_name;
		private int? _type_order;
		private DateTime? _type_time;
		private string _type_position;
        private string _type_role;
        private int _IsSigle;
       
        private int _photo_count;
        /// <summary>
        /// 
        /// </summary>
        public int IsSigle
        {
            set { _IsSigle = value; }
            get { return _IsSigle; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int photo_count
        {
            set { _photo_count = value; }
            get { return _photo_count; }
        }

		/// <summary>
		/// 
		/// </summary>
		public int type_id
		{
			set{ _type_id=value;}
			get{return _type_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_name
		{
			set{ _type_name=value;}
			get{return _type_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_guid
		{
			set{ _type_guid=value;}
			get{return _type_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? type_parent
		{
			set{ _type_parent=value;}
			get{return _type_parent;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? type_depth
		{
			set{ _type_depth=value;}
			get{return _type_depth;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_parent_name
		{
			set{ _type_parent_name=value;}
			get{return _type_parent_name;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string type_dict_code
        {
            set { _type_dict_code = value; }
            get { return _type_dict_code; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string type_code
        {
            set { _type_code = value; }
            get { return _type_code; }
        }
         /// <summary>
        /// 
        /// </summary>
        public string type_role
        {
            set { _type_role = value; }
            get { return _type_role; }
        }
        
		/// <summary>
		/// 
		/// </summary>
		public string type_path
		{
			set{ _type_path=value;}
			get{return _type_path;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_image
		{
			set{ _type_image=value;}
			get{return _type_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_image_list
		{
			set{ _type_image_list=value;}
			get{return _type_image_list;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_summary
		{
			set{ _type_summary=value;}
			get{return _type_summary;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_detail
		{
			set{ _type_detail=value;}
			get{return _type_detail;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_content
		{
			set{ _type_content=value;}
			get{return _type_content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_url
		{
			set{ _type_url=value;}
			get{return _type_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? type_status
		{
			set{ _type_status=value;}
			get{return _type_status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? type_cid
		{
			set{ _type_cid=value;}
			get{return _type_cid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_cid_name
		{
			set{ _type_cid_name=value;}
			get{return _type_cid_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? type_order
		{
			set{ _type_order=value;}
			get{return _type_order;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? type_time
		{
			set{ _type_time=value;}
			get{return _type_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_position
		{
			set{ _type_position=value;}
			get{return _type_position;}
		}
		#endregion Model

        private int? _total;
        private int? _new_count;

        public int? total
        {
            get { return _total; }
            set { _total = value; }
        }
        public int? new_count
        {
            get { return _new_count; }
            set { _new_count = value; }
        }

        private int? _article_count;

        public int? article_count
        {
            get { return _article_count; }
            set { _article_count = value; }
        }
         

	}
}

