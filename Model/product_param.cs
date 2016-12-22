using System;
namespace llm.Model
{
	/// <summary>
	/// product_param:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_param
	{
		public product_param()
		{}
		#region Model
		private int _param_id;
		private string _param_name;
		private string _param_value;
		private int? _param_product_id;
		/// <summary>
		/// 
		/// </summary>
		public int param_id
		{
			set{ _param_id=value;}
			get{return _param_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string param_name
		{
			set{ _param_name=value;}
			get{return _param_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string param_value
		{
			set{ _param_value=value;}
			get{return _param_value;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? param_product_id
		{
			set{ _param_product_id=value;}
			get{return _param_product_id;}
		}
		#endregion Model

	}
}

