using System;
using System.Collections.Generic;

namespace llm.Model
{
	/// <summary>
	/// commite:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class commite
	{
		public commite()
		{}
		#region Model
		private int _commite_id;
		private string _commite_ip;
		private int? _commite_article_id;
		private int? _commite_ref_id;
		private string _commite_content;
		private int? _commite_uid;
		private string _commite_uname;
		private string _commite_uhead;
		private DateTime? _commite_time;
		private int? _commite_status;
        private System.Collections.Generic.IList<llm.Model.commite> list;
        private string _commite_email;
        private string _commite_url;
        private int _commite_total;
        private int _commite_new;


        public int commite_total
        {
            get { return _commite_total; }
            set { _commite_total = value; }
        }
       

        public int commite_new
        {
            get { return _commite_new; }
            set { _commite_new = value; }
        }
        
        public string commite_email
        {
            get { return _commite_email; }
            set { _commite_email = value; }
        }

        public string commite_url
        {
            get { return _commite_url; }
            set { _commite_url = value; }
        }

		/// <summary>
		/// 
		/// </summary>
		public int commite_id
		{
			set{ _commite_id=value;}
			get{return _commite_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string commite_ip
		{
			set{ _commite_ip=value;}
			get{return _commite_ip;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? commite_article_id
		{
			set{ _commite_article_id=value;}
			get{return _commite_article_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? commite_ref_id
		{
			set{ _commite_ref_id=value;}
			get{return _commite_ref_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string commite_content
		{
			set{ _commite_content=value;}
			get{return _commite_content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? commite_uid
		{
			set{ _commite_uid=value;}
			get{return _commite_uid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string commite_uname
		{
			set{ _commite_uname=value;}
			get{return _commite_uname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string commite_uhead
		{
			set{ _commite_uhead=value;}
			get{return _commite_uhead;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? commite_time
		{
			set{ _commite_time=value;}
			get{return _commite_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? commite_status
		{
			set{ _commite_status=value;}
			get{return _commite_status;}
		}

        public IList<commite> List
        {
            get
            {
                return list;
            }

            set
            {
                list = value;
            }
        }
        #endregion Model

    }
}

