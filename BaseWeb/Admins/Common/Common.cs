using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admins.Common
{
    public static class CommonUtil
    {
        public static TemplateHelper.VelocityHelper _v;

        public static TemplateHelper.VelocityHelper v
        {
            get { return _v; }
            set { _v = value; }
        }

        static CommonUtil()
        {
            _v = _v == null ? new TemplateHelper.VelocityHelper() : _v;
        }
    }
}