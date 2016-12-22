using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using IBatisNet.DataMapper.Configuration;
using IBatisNet.DataMapper;
using IBatisNet.Common.Utilities;
using System.Reflection;

namespace IBatisServer
{
    public class BaseService
    {
        protected static SqlMapper sqlMap;

        //private string fileName = "sqlMap.Config";

        public BaseService()
        {
            Assembly assembly = Assembly.Load("IBatisServer");
            AssemblyName s = assembly.GetName();
            Stream stream = assembly.GetManifestResourceStream(assembly.GetName().Name + ".Config.sqlmap.config");
            DomSqlMapBuilder builder = new DomSqlMapBuilder();
            sqlMap = builder.Configure(stream);
        }

       
        public SqlMapper SqlMap
        {
            get
            {
                return sqlMap;
            }
        }
    }
}
