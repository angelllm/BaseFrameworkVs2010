
using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class CommonService : BaseService
    {

        public CommonService()
        {

        }

        public common GetEveryCount()
        {
            common commons = SqlMap.QueryForObject<common>("common.GetEveryCount",null);
            return commons;
        }

        public int ExecuteSelectCountSql(string sqlStr)
        {
            int num = 0;
            if (!string.IsNullOrEmpty(sqlStr))
            {
               object obj=SqlMap.QueryForObject("ExecuteSelectCountSql", sqlStr);
               if (obj != null)
               {
                   num = int.Parse(obj.ToString());
               }
            }
            return num;
        }

         
 
        



    }
}
