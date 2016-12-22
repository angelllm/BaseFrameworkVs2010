using System;
namespace llm.Model
{
	/// <summary>
	/// article_type_pk:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class article_type_pk
	{
		public article_type_pk()
		{}
		#region Model
		private int _pk_id;
		private int? _pk_article_id;
		private int? _pk_type_id;
		/// <summary>
		/// 
		/// </summary>
		public int pk_id
		{
			set{ _pk_id=value;}
			get{return _pk_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? pk_article_id
		{
			set{ _pk_article_id=value;}
			get{return _pk_article_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? pk_type_id
		{
			set{ _pk_type_id=value;}
			get{return _pk_type_id;}
		}
		#endregion Model

	}
}

