using System;
namespace llm.Model
{
	/// <summary>
	/// photo:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class photo
	{
		public photo()
		{}
		#region Model
		private int _photo_id;
		private string _photo_title;
		private string _photo_image;
		private string _photo_remark;
		private int? _photo_order;
		private int? _photo_pv;
		private int? _photo_type_id;
		/// <summary>
		/// 
		/// </summary>
		public int photo_id
		{
			set{ _photo_id=value;}
			get{return _photo_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string photo_title
		{
			set{ _photo_title=value;}
			get{return _photo_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string photo_image
		{
			set{ _photo_image=value;}
			get{return _photo_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string photo_remark
		{
			set{ _photo_remark=value;}
			get{return _photo_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? photo_order
		{
			set{ _photo_order=value;}
			get{return _photo_order;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? photo_pv
		{
			set{ _photo_pv=value;}
			get{return _photo_pv;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? photo_type_id
		{
			set{ _photo_type_id=value;}
			get{return _photo_type_id;}
		}
		#endregion Model

	}
}

