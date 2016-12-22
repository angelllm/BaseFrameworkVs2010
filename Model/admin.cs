using System;
namespace llm.Model
{
	/// <summary>
	/// admin:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class admin
	{
		public admin()
		{}
		#region Model
		private int _admin_id;
		private string _admin_name;
		private string _admin_pwd;
		private DateTime? _admin_time;
		/// <summary>
		/// 
		/// </summary>
		public int admin_id
		{
			set{ _admin_id=value;}
			get{return _admin_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string admin_name
		{
			set{ _admin_name=value;}
			get{return _admin_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string admin_pwd
		{
			set{ _admin_pwd=value;}
			get{return _admin_pwd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? admin_time
		{
			set{ _admin_time=value;}
			get{return _admin_time;}
		}
		#endregion Model

	}
}

