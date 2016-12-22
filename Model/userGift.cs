using System;
namespace llm.Model
{
	/// <summary>
	/// userGift:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class userGift
	{
		public userGift()
		{}
		#region Model
		private int _gift_id;
		private string _gift_name;
		private string _gift_path;
		private int? _gift_mid;
		private string _gift_mname;
		private string _gift_remark;
		/// <summary>
		/// 
		/// </summary>
		public int gift_id
		{
			set{ _gift_id=value;}
			get{return _gift_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string gift_name
		{
			set{ _gift_name=value;}
			get{return _gift_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string gift_path
		{
			set{ _gift_path=value;}
			get{return _gift_path;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? gift_mid
		{
			set{ _gift_mid=value;}
			get{return _gift_mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string gift_mname
		{
			set{ _gift_mname=value;}
			get{return _gift_mname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string gift_remark
		{
			set{ _gift_remark=value;}
			get{return _gift_remark;}
		}
		#endregion Model

	}
}

