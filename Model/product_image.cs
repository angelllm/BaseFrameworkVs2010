using System;
namespace llm.Model
{
	/// <summary>
	/// product_image:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class product_image
	{
		public product_image()
		{}
		#region Model
		private int _image_id;
		private string _image_title;
		private string _image_path;
		private int? _image_order;
		private int? _param_product_id;
		/// <summary>
		/// 
		/// </summary>
		public int image_id
		{
			set{ _image_id=value;}
			get{return _image_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string image_title
		{
			set{ _image_title=value;}
			get{return _image_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string image_path
		{
			set{ _image_path=value;}
			get{return _image_path;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? image_order
		{
			set{ _image_order=value;}
			get{return _image_order;}
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

