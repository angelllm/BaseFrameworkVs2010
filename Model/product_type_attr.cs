using System;
namespace llm.Model
{
	/// <summary>
	/// product_type_attr:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_type_attr
	{
		public product_type_attr()
		{}
		#region Model
		private int _attr_id;
		private int? _attr_product_type_id;
		private int? _attr_mid;
		private string _attr_name;
		private string _attr_guid;
		private string _attr_code_name;
		private string _attr_remark;
		private int? _attr_type;
		private int? _attr_status;
		/// <summary>
		/// 
		/// </summary>
		public int attr_id
		{
			set{ _attr_id=value;}
			get{return _attr_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attr_product_type_id
		{
			set{ _attr_product_type_id=value;}
			get{return _attr_product_type_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attr_mid
		{
			set{ _attr_mid=value;}
			get{return _attr_mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string attr_name
		{
			set{ _attr_name=value;}
			get{return _attr_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string attr_guid
		{
			set{ _attr_guid=value;}
			get{return _attr_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string attr_code_name
		{
			set{ _attr_code_name=value;}
			get{return _attr_code_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string attr_remark
		{
			set{ _attr_remark=value;}
			get{return _attr_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attr_type
		{
			set{ _attr_type=value;}
			get{return _attr_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attr_status
		{
			set{ _attr_status=value;}
			get{return _attr_status;}
		}
		#endregion Model

	}
}

