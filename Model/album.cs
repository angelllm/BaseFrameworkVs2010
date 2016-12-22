using System;
namespace llm.Model
{
	/// <summary>
	/// album:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class album
	{
		public album()
		{}
		#region Model
		private int _album_id;
		private string _album_title;
		private DateTime? _album_time= DateTime.Now;
		private string _album_image;
		private string _album_remark;
		private int? _album_order;
		private int? _album_pv;
		private int? _album_type_id;
		/// <summary>
		/// 
		/// </summary>
		public int album_id
		{
			set{ _album_id=value;}
			get{return _album_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string album_title
		{
			set{ _album_title=value;}
			get{return _album_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? album_time
		{
			set{ _album_time=value;}
			get{return _album_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string album_image
		{
			set{ _album_image=value;}
			get{return _album_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string album_remark
		{
			set{ _album_remark=value;}
			get{return _album_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? album_order
		{
			set{ _album_order=value;}
			get{return _album_order;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? album_pv
		{
			set{ _album_pv=value;}
			get{return _album_pv;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? album_type_id
		{
			set{ _album_type_id=value;}
			get{return _album_type_id;}
		}
		#endregion Model

	}
}

