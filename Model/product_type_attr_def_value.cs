using System;
namespace llm.Model
{
	/// <summary>
	/// product_type_attr_def_value:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_type_attr_def_value
	{
		public product_type_attr_def_value()
		{}
		#region Model
		private int _value_id;
		private int? _value_attr_id;
		private string _value_name;
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
		public int? value_attr_id
		{
			set{ _value_attr_id=value;}
			get{return _value_attr_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string value_name
		{
			set{ _value_name=value;}
			get{return _value_name;}
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

