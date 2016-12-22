using System;
namespace llm.Model
{
	/// <summary>
	/// pageinfo:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class pageinfo
	{
        public pageinfo()
		{}
		#region Model
		private int _pagesize;
        private int _pageindex;
	 
		/// <summary>
		/// 
		/// </summary>
        public int pagesize
		{
            set { _pagesize = value; }
            get { return _pagesize; }
		}
		/// <summary>
		/// 
		/// </summary>
        public int pageindex
		{
            set { _pageindex = value; }
            get { return _pageindex; }
		}
		
		#endregion Model

	}
}

