using System;
namespace llm.Model
{
	/// <summary>
	/// product:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product
	{
		public product()
		{}
		#region Model
		private int _product_id;
		private string _product_name;
		private string _product_sn;
		private string _product_color;
		private string _product_guid;
		private int? _product_type_id;
		private int? _product_mid;
		private string _product_type_name;
		private string _product_image;
		private string _product_image_list;
		private string _product_sku_path;
		private string _product_param;
		private string _product_content;
		private string _product_size;
		private decimal? _product_price;
		private string _product_price_sku;
		private decimal? _product_min_price;
		private decimal? _product_max_price;
		private DateTime? _product_time= DateTime.Now;
		private int? _product_status;
        private string _product_tag;
        
		/// <summary>
		/// 
		/// </summary>
		public int product_id
		{
			set{ _product_id=value;}
			get{return _product_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_name
		{
			set{ _product_name=value;}
			get{return _product_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_sn
		{
			set{ _product_sn=value;}
			get{return _product_sn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_color
		{
			set{ _product_color=value;}
			get{return _product_color;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_guid
		{
			set{ _product_guid=value;}
			get{return _product_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? product_type_id
		{
			set{ _product_type_id=value;}
			get{return _product_type_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? product_mid
		{
			set{ _product_mid=value;}
			get{return _product_mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_type_name
		{
			set{ _product_type_name=value;}
			get{return _product_type_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_image
		{
			set{ _product_image=value;}
			get{return _product_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_image_list
		{
			set{ _product_image_list=value;}
			get{return _product_image_list;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_sku_path
		{
			set{ _product_sku_path=value;}
			get{return _product_sku_path;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_param
		{
			set{ _product_param=value;}
			get{return _product_param;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_content
		{
			set{ _product_content=value;}
			get{return _product_content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_size
		{
			set{ _product_size=value;}
			get{return _product_size;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? product_price
		{
			set{ _product_price=value;}
			get{return _product_price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string product_price_sku
		{
			set{ _product_price_sku=value;}
			get{return _product_price_sku;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? product_min_price
		{
			set{ _product_min_price=value;}
			get{return _product_min_price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? product_max_price
		{
			set{ _product_max_price=value;}
			get{return _product_max_price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? product_time
		{
			set{ _product_time=value;}
			get{return _product_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? product_status
		{
			set{ _product_status=value;}
			get{return _product_status;}
		}

        	/// <summary>
		/// 
		/// </summary>
        public string product_tag
		{
            set { _product_tag = value; }
            get { return _product_tag; }
		}
        
		#endregion Model

	}
}

