using System;
namespace llm.Model
{
	/// <summary>
	/// product_sku_value:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_sku_value
	{
		public product_sku_value()
		{}
		#region Model
		private int _value_id;
		private int? _value_sku_id;
        private string _value_def_value_id;
		private string _value_image;
		private int? _value_status;
		/// <summary>
		/// 
		/// </summary>
		public int value_id
		{
			set{ _value_id=value;}
			get{return _value_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? value_sku_id
		{
			set{ _value_sku_id=value;}
			get{return _value_sku_id;}
		}
		/// <summary>
		/// 
		/// </summary>
        public string value_def_value_id
		{
			set{ _value_def_value_id=value;}
			get{return _value_def_value_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string value_image
		{
			set{ _value_image=value;}
			get{return _value_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? value_status
		{
			set{ _value_status=value;}
			get{return _value_status;}
		}
		#endregion Model

	}
}

