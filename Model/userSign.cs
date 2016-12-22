using System;
namespace llm.Model
{
	/// <summary>
	/// userSign:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class userSign
	{
		public userSign()
		{}
		#region Model
		private int _sign_id;
		private int? _sign_mid;
		private string _sign_mname;
		private string _sign_ip;
		private DateTime? _sign_time;
		/// <summary>
		/// 
		/// </summary>
		public int sign_id
		{
			set{ _sign_id=value;}
			get{return _sign_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? sign_mid
		{
			set{ _sign_mid=value;}
			get{return _sign_mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sign_mname
		{
			set{ _sign_mname=value;}
			get{return _sign_mname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sign_ip
		{
			set{ _sign_ip=value;}
			get{return _sign_ip;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? sign_time
		{
			set{ _sign_time=value;}
			get{return _sign_time;}
		}
		#endregion Model

	}
}

