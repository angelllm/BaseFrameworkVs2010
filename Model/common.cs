using System;
namespace llm.Model
{
	[Serializable]
	public partial class common
	{
        public common()
		{}
		#region Model

        private int? _article_total;
        private int? _type_total;
        private int? _acticle_type_total;
        private int? _link_total;
        private int? _member_total;
        private int? _banner_total;
        private int? _commite_total;

        public int? commite_total
        {
            get { return _commite_total; }
            set { _commite_total = value; }
        }

        public int? banner_total
        {
            get { return _banner_total; }
            set { _banner_total = value; }
        }

        public int? member_total
        {
            get { return _member_total; }
            set { _member_total = value; }
        }

        
        public int? link_total
        {
            get { return _link_total; }
            set { _link_total = value; }
        }
        
        public int? article_total
        {
            get { return _article_total; }
            set { _article_total = value; }
        }
        public int? type_total
        {
            get { return _type_total; }
            set { _type_total = value; }
        }
        public int? acticle_type_total
        {
            get { return _acticle_type_total; }
            set { _acticle_type_total = value; }
        }
		#endregion Model
	}
}

