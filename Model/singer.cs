using System;
namespace llm.Model
{
	/// <summary>
	/// singer:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class singer
	{
		public singer()
		{}
		#region Model
		private int _singer_id;
		private string _singer_name;
		private string _singer_image;
		private string _singer_remark;
		private int? _singer_order;
		private int? _singer_pv;
		private int? _singer_type_id;
		/// <summary>
		/// 
		/// </summary>
		public int singer_id
		{
			set{ _singer_id=value;}
			get{return _singer_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string singer_name
		{
			set{ _singer_name=value;}
			get{return _singer_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string singer_image
		{
			set{ _singer_image=value;}
			get{return _singer_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string singer_remark
		{
			set{ _singer_remark=value;}
			get{return _singer_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? singer_order
		{
			set{ _singer_order=value;}
			get{return _singer_order;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? singer_pv
		{
			set{ _singer_pv=value;}
			get{return _singer_pv;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? singer_type_id
		{
			set{ _singer_type_id=value;}
			get{return _singer_type_id;}
		}
		#endregion Model

	}
}

