using System;
namespace llm.Model
{
	/// <summary>
	/// userCard:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class userCard
	{
		public userCard()
		{}
		#region Model
		private int _card_id;
		private string _card_num;
		private string _card_name;
		private int? _card_total_count;
		private decimal? _card_price;
		private string _card_type;
		private string _card_remark;
		private int? _card_status;
		private DateTime? _card_start_time;
		private DateTime? _card_end_time;
		private DateTime? _card_delay_time;
		private int? _card_is_count;
		private int? _card_count;
		private int? _card_ative_count;
		private int? _card_mid;
		private string _card_mname;
		/// <summary>
		/// 
		/// </summary>
		public int card_id
		{
			set{ _card_id=value;}
			get{return _card_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string card_num
		{
			set{ _card_num=value;}
			get{return _card_num;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string card_name
		{
			set{ _card_name=value;}
			get{return _card_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? card_total_count
		{
			set{ _card_total_count=value;}
			get{return _card_total_count;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? card_price
		{
			set{ _card_price=value;}
			get{return _card_price;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string card_type
		{
			set{ _card_type=value;}
			get{return _card_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string card_remark
		{
			set{ _card_remark=value;}
			get{return _card_remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? card_status
		{
			set{ _card_status=value;}
			get{return _card_status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? card_start_time
		{
			set{ _card_start_time=value;}
			get{return _card_start_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? card_end_time
		{
			set{ _card_end_time=value;}
			get{return _card_end_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? card_delay_time
		{
			set{ _card_delay_time=value;}
			get{return _card_delay_time;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? card_is_count
		{
			set{ _card_is_count=value;}
			get{return _card_is_count;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? card_count
		{
			set{ _card_count=value;}
			get{return _card_count;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? card_ative_count
		{
			set{ _card_ative_count=value;}
			get{return _card_ative_count;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? card_mid
		{
			set{ _card_mid=value;}
			get{return _card_mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string card_mname
		{
			set{ _card_mname=value;}
			get{return _card_mname;}
		}
		#endregion Model

	}
}

