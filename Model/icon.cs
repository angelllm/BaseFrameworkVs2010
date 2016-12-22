using System;
namespace llm.Model
{
	/// <summary>
	/// icon:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public  class icon
	{
		public icon()
		{}
		#region Model
		private int _icon_id;
		private string _icon_name = string.Empty;
        private string _icon_image = string.Empty;
		private int _icon_position_x;
		private int _icon_position_y;
		private int _icon_status;
		private bool _icon_resize;
        private string _icon_tpl = string.Empty;
        private string _icon_init_w = string.Empty;
        private string _icon_init_h = string.Empty;
        private string _icon_url = string.Empty;
        private string _icon_css = string.Empty;
        private string _icon_item_css = string.Empty;
        private string _icon_background_image = string.Empty;
        private string _icon_adv_css = string.Empty;
		/// <summary>
		/// 
		/// </summary>
		public int icon_id
		{
			set{ _icon_id=value;}
			get{return _icon_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_name
		{
			set{ _icon_name=value;}
			get{return _icon_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_image
		{
			set{ _icon_image=value;}
			get{return _icon_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int icon_position_x
		{
			set{ _icon_position_x=value;}
			get{return _icon_position_x;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int icon_position_y
		{
			set{ _icon_position_y=value;}
			get{return _icon_position_y;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int icon_status
		{
			set{ _icon_status=value;}
			get{return _icon_status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public bool icon_resize
		{
			set{ _icon_resize=value;}
			get{return _icon_resize;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_tpl
		{
			set{ _icon_tpl=value;}
			get{return _icon_tpl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_init_w
		{
			set{ _icon_init_w=value;}
			get{return _icon_init_w;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_init_h
		{
			set{ _icon_init_h=value;}
			get{return _icon_init_h;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_url
		{
			set{ _icon_url=value;}
			get{return _icon_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_css
		{
			set{ _icon_css=value;}
			get{return _icon_css;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_item_css
		{
			set{ _icon_item_css=value;}
			get{return _icon_item_css;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_background_image
		{
			set{ _icon_background_image=value;}
			get{return _icon_background_image;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string icon_adv_css
		{
			set{ _icon_adv_css=value;}
			get{return _icon_adv_css;}
		}
		#endregion Model

	}
}

