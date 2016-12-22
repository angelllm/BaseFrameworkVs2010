using System;
namespace llm.Model
{
	/// <summary>
	/// dict:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class dict
	{
		public dict()
		{}
		#region Model
		private int _dict_id;
		private string _dict_name;
        private string _dict_code;
		private string _dict_guid;
		private int? _dict_pid;
		private int? _dict_status;
		/// <summary>
		/// 
		/// </summary>
		public int dict_id
		{
			set{ _dict_id=value;}
			get{return _dict_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string dict_name
		{
			set{ _dict_name=value;}
			get{return _dict_name;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string dict_code
        {
            set { _dict_code = value; }
            get { return _dict_code; }
        }
		/// <summary>
		/// 
		/// </summary>
		public string dict_guid
		{
			set{ _dict_guid=value;}
			get{return _dict_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? dict_pid
		{
			set{ _dict_pid=value;}
			get{return _dict_pid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? dict_status
		{
			set{ _dict_status=value;}
			get{return _dict_status;}
		}
		#endregion Model

	}
}

