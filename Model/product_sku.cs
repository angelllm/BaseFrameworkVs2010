using System;
namespace llm.Model
{
	/// <summary>
	/// product_sku:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_sku
	{
		public product_sku()
		{}
		#region Model
		private int _sku_id;
		private int? _sku_product_id;
		private string _sku_code;
		private decimal? _sku_price;
		private int? _sku_count;
		private string _sku_name;
		private string _sku_path;
		private int? _sku_status;
		/// <summary>
		/// 
		/// </summary>
		public int sku_id
		{
			set{ _sku_id=value;}
			get{return _sku_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? sku_product_id
		{
			set{ _sku_product_id=value;}
			get{return _sku_product_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sku_code
		{
			set{ _sku_code=value;}
			get{return _sku_code;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? sku_price
		{
			set{ _sku_price=value;}
			get{return _sku_price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? sku_count
		{
			set{ _sku_count=value;}
			get{return _sku_count;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sku_name
		{
			set{ _sku_name=value;}
			get{return _sku_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sku_path
		{
			set{ _sku_path=value;}
			get{return _sku_path;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? sku_status
		{
			set{ _sku_status=value;}
			get{return _sku_status;}
		}
		#endregion Model

	}
}

