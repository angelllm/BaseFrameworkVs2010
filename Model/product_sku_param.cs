using System;
namespace llm.Model
{
	/// <summary>
	/// product_sku_param:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_sku_param
	{
		public product_sku_param()
		{}
		#region Model
		private int _param_id;
		private int? _param_product_type_id;
		private int? _param_mid;
		private string _param_name;
		private string _param_guid;
		private string _param_code_name;
		private string _param_remark;
		private int? _param_type;
		private int? _param_status;
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
		public int? param_product_type_id
		{
			set{ _param_product_type_id=value;}
			get{return _param_product_type_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? param_mid
		{
			set{ _param_mid=value;}
			get{return _param_mid;}
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
		public string param_guid
		{
			set{ _param_guid=value;}
			get{return _param_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string param_code_name
		{
			set{ _param_code_name=value;}
			get{return _param_code_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string param_remark
		{
			set{ _param_remark=value;}
			get{return _param_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? param_type
		{
			set{ _param_type=value;}
			get{return _param_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? param_status
		{
			set{ _param_status=value;}
			get{return _param_status;}
		}
		#endregion Model

	}
}

