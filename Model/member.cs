using System;
using System.Collections.Generic;
namespace llm.Model
{
	/// <summary>
	/// member:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class member
	{
		public member()
		{}
		#region Model
		private int _member_id;
		private string _member_name = string.Empty;
        private string _member_login_ame = string.Empty;
        private string _member_nick_name = string.Empty;
        private string _member_pwd = string.Empty;
        private string _member_safe_pwd = string.Empty;
        private string _member_opera_pwd = string.Empty;
        private string _member_company = string.Empty;
		private string _member_email = string.Empty;
		private string _member_zhaohui = string.Empty;
		private string _member_real_name = string.Empty;
        private string _member_phone = string.Empty;
        private string _member_qq = string.Empty;
		private DateTime? _member_reg_time = DateTime.Now;
        private DateTime? _member_modify_time = DateTime.Now;
        private DateTime? _member_login_time = DateTime.Now;
        private DateTime? _member_login_out_time = DateTime.Now;
		private int? _member_status = 0 ;
        private int? _member_level = 0;
        private int? _member_integral = 0;
        private int? _member_integral_use = 0;
        private string _member_type = string.Empty;
        private string _member_face = string.Empty;
        private string _member_shop_id = string.Empty;
        private int? _member_phone_last_four = 0;
        private string _member_baby_name = string.Empty;
        private int? _member_baby_age = 0;
        private int? _member_baby_sex = 0;
        private DateTime? _member_baby_birdthday = DateTime.Now;
        private userCard card;
        private int? _member_total = 0;
        private int? _member_new = 0;
        private DateTime? _member_time = DateTime.Now;

        private string _member_number = string.Empty;

        public string member_number
        {
            get { return _member_number; }
            set { _member_number = value; }
        }
        private string _member_tel = string.Empty;

        public string member_tel
        {
            get { return _member_tel; }
            set { _member_tel = value; }
        }
        private string _member_work = string.Empty;

        public string member_work
        {
            get { return _member_work; }
            set { _member_work = value; }
        }
        private string _member_school = string.Empty;

        public string member_school
        {
            get { return _member_school; }
            set { _member_school = value; }
        }
        private string _member_birthday = string.Empty;

        public string member_birthday
        {
            get { return _member_birthday; }
            set { _member_birthday = value; }
        }
        private string _member_remark = string.Empty;

        public string member_remark
        {
            get { return _member_remark; }
            set { _member_remark = value; }
        }
        private string _member_upload = string.Empty;

        public string member_upload
        {
            get { return _member_upload; }
            set { _member_upload = value; }
        }
        

        public DateTime? member_time
        {
            get { return _member_time; }
            set { _member_time = value; }
        }

        public int? member_total
        {
            get { return _member_total; }
            set { _member_total = value; }
        }
        public int? member_new
        {
            get { return _member_new; }
            set { _member_new = value; }
        }


        public userCard Card
        {
            get { return card; }
            set { card = value; }
        }
        private IList<userGift> giftList;

        public IList<userGift> GiftList
        {
            get { return giftList; }
            set { giftList = value; }
        }
        private IList<userSign> signList;

        public IList<userSign> SignList
        {
            get { return signList; }
            set { signList = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int member_id
		{
			set{ _member_id=value;}
			get{return _member_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_name
		{
			set{ _member_name=value;}
			get{return _member_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_login_ame
		{
			set{ _member_login_ame=value;}
			get{return _member_login_ame;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_nick_name
		{
			set{ _member_nick_name=value;}
			get{return _member_nick_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_pwd
		{
			set{ _member_pwd=value;}
			get{return _member_pwd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_safe_pwd
		{
			set{ _member_safe_pwd=value;}
			get{return _member_safe_pwd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_opera_pwd
		{
			set{ _member_opera_pwd=value;}
			get{return _member_opera_pwd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_company
		{
			set{ _member_company=value;}
			get{return _member_company;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_email
		{
			set{ _member_email=value;}
			get{return _member_email;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_zhaohui
		{
			set{ _member_zhaohui=value;}
			get{return _member_zhaohui;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_real_name
		{
			set{ _member_real_name=value;}
			get{return _member_real_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_phone
		{
			set{ _member_phone=value;}
			get{return _member_phone;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_qq
		{
			set{ _member_qq=value;}
			get{return _member_qq;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? member_reg_time
		{
			set{ _member_reg_time=value;}
			get{return _member_reg_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? member_modify_time
		{
			set{ _member_modify_time=value;}
			get{return _member_modify_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? member_login_time
		{
			set{ _member_login_time=value;}
			get{return _member_login_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? member_login_out_time
		{
			set{ _member_login_out_time=value;}
			get{return _member_login_out_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_status
		{
			set{ _member_status=value;}
			get{return _member_status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_level
		{
			set{ _member_level=value;}
			get{return _member_level;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_integral
		{
			set{ _member_integral=value;}
			get{return _member_integral;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_integral_use
		{
			set{ _member_integral_use=value;}
			get{return _member_integral_use;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_type
		{
			set{ _member_type=value;}
			get{return _member_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_face
		{
			set{ _member_face=value;}
			get{return _member_face;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_shop_id
		{
			set{ _member_shop_id=value;}
			get{return _member_shop_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_phone_last_four
		{
			set{ _member_phone_last_four=value;}
			get{return _member_phone_last_four;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string member_baby_name
		{
			set{ _member_baby_name=value;}
			get{return _member_baby_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_baby_age
		{
			set{ _member_baby_age=value;}
			get{return _member_baby_age;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? member_baby_sex
		{
			set{ _member_baby_sex=value;}
			get{return _member_baby_sex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? member_baby_birdthday
		{
			set{ _member_baby_birdthday=value;}
			get{return _member_baby_birdthday;}
		}
		#endregion Model

	}
}

