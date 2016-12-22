using System;
namespace llm.Model
{
	/// <summary>
	/// article_content:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class article_content
	{
		public article_content()
		{}
		#region Model
		private int _content_id;
		private int? _content_article_id;
		private int? _content_order;
		private string _content_title;
		private string _content_content;
		/// <summary>
		/// 
		/// </summary>
		public int content_id
		{
			set{ _content_id=value;}
			get{return _content_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? content_article_id
		{
			set{ _content_article_id=value;}
			get{return _content_article_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? content_order
		{
			set{ _content_order=value;}
			get{return _content_order;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string content_title
		{
			set{ _content_title=value;}
			get{return _content_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string content_content
		{
			set{ _content_content=value;}
			get{return _content_content;}
		}
		#endregion Model

	}
}

