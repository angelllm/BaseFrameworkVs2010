using System;
namespace llm.Model
{
	/// <summary>
	/// webbase:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class webbase
	{
        public webbase(){}
		#region Model

        private int _article_count;
        private int _commite_count;
        private string _web_time;
        private int _web_daycount;
        private int _tag_count;
        private string _last_updatetime;

        public int article_count
        {
            get { return _article_count; }
            set { _article_count = value; }
        }
        
        public int commite_count
        {
            get { return _commite_count; }
            set { _commite_count = value; }
        }
        
        public string web_time
        {
            get { return _web_time; }
            set { _web_time = value; }
        }
        
        public int web_daycount
        {
            get { return _web_daycount; }
            set { _web_daycount = value; }
        }
        
        public int tag_count
        {
            get { return _tag_count; }
            set { _tag_count = value; }
        }
        

        public string last_updatetime
        {
            get { return _last_updatetime; }
            set { _last_updatetime = value; }
        }
		 
		#endregion Model

	}
}

