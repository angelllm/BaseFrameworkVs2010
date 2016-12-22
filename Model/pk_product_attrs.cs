using System;
namespace llm.Model
{
	/// <summary>
	/// pk_product_attrs:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class pk_product_attrs
	{
		public pk_product_attrs()
		{}
		#region Model
		private int _attrs_id;
		private int? _attr_id;
		private int? _attrs_product_id;
		private int? _attrs_status;
		/// <summary>
		/// 
		/// </summary>
		public int attrs_id
		{
			set{ _attrs_id=value;}
			get{return _attrs_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attr_id
		{
			set{ _attr_id=value;}
			get{return _attr_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attrs_product_id
		{
			set{ _attrs_product_id=value;}
			get{return _attrs_product_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? attrs_status
		{
			set{ _attrs_status=value;}
			get{return _attrs_status;}
		}
		#endregion Model

	}
}

