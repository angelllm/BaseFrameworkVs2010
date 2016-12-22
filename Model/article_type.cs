using System;
namespace llm.Model
{
	/// <summary>
	/// article_type:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class article_type
	{
		public article_type()
		{}
		#region Model
		private int _type_id;
		private string _type_name;
		private string _type_guid;
		private int? _type_parent;
		/// <summary>
		/// 
		/// </summary>
		public int type_id
		{
			set{ _type_id=value;}
			get{return _type_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_name
		{
			set{ _type_name=value;}
			get{return _type_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string type_guid
		{
			set{ _type_guid=value;}
			get{return _type_guid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? type_parent
		{
			set{ _type_parent=value;}
			get{return _type_parent;}
		}
		#endregion Model

	}
}

