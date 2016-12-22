using System;
namespace llm.Model
{
	/// <summary>
	/// config:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class config
	{
		public config()
		{}
		#region Model
		private int _config_id;
		private string _config_code="";
		private string _config_name="";
		private string _config_value="";
		private int? _config_type;
		private int? _config_status;
		/// <summary>
		/// 
		/// </summary>
		public int config_id
		{
			set{ _config_id=value;}
			get{return _config_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string config_code
		{
			set{ _config_code=value;}
			get{return _config_code;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string config_name
		{
			set{ _config_name=value;}
			get{return _config_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string config_value
		{
			set{ _config_value=value;}
			get{return _config_value;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? config_type
		{
			set{ _config_type=value;}
			get{return _config_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? config_status
		{
			set{ _config_status=value;}
			get{return _config_status;}
		}
		#endregion Model

	}
}

