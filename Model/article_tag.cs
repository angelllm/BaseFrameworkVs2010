using System;
namespace llm.Model
{
	/// <summary>
	/// article_tag:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class article_tag
	{
		public article_tag()
		{}
		#region Model
		private int _tag_id;
		private string _tag_name;
		private int? _tag_type_id;
		/// <summary>
		/// 
		/// </summary>
		public int tag_id
		{
			set{ _tag_id=value;}
			get{return _tag_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string tag_name
		{
			set{ _tag_name=value;}
			get{return _tag_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? tag_type_id
		{
			set{ _tag_type_id=value;}
			get{return _tag_type_id;}
		}
		#endregion Model

	}
}

