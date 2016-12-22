using System;
namespace llm.Model
{
	/// <summary>
	/// product_sku_param_list:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_sku_param_list
	{
		public product_sku_param_list()
		{}
		#region Model
		private int _list_id;
		private int? _list_param_id;
		private string _list_name;
		private int? _list_status;
		/// <summary>
		/// 
		/// </summary>
		public int list_id
		{
			set{ _list_id=value;}
			get{return _list_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? list_param_id
		{
			set{ _list_param_id=value;}
			get{return _list_param_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string list_name
		{
			set{ _list_name=value;}
			get{return _list_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? list_status
		{
			set{ _list_status=value;}
			get{return _list_status;}
		}
		#endregion Model

	}
}

