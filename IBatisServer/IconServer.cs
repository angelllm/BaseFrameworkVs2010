
using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class IconService : BaseService
    {

        public IconService()
        {

        }

        public void Update(icon icon)
        {
            SqlMap.Update("icon.UpdateIcon", icon);
        }

        public void Delete(icon icon)
        {
            SqlMap.Delete("icon.DeleteIcon", icon);
        }
        public void Add2(icon icon)
        {
            SqlMap.Insert("icon.InsertIcon2", icon);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
          
        }
        public int Add(icon icon)
        {
            int Id = (int)SqlMap.Insert("icon.InsertIcon", icon);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction(); 
            return Id;
        }
        
        public IList<icon> GetModelList()
        {
            IList<icon> list = SqlMap.QueryForList<icon>("icon.GetModelList", null);
            return list;
        }
        public IList<icon> GetModelList(string strWhere)
        {
            //string sql = SqlMap.GetMappedStatement("GetModelListWhere").Statement.Sql.ToString();
            IList<icon> list = SqlMap.QueryForList<icon>("icon.GetModelListWhere", strWhere);
            
            return list;
        }

        public IList<icon> GetModelListByPage(int pagesize, int pageindex)
        {
            Dictionary<string, int> dict = new Dictionary<string, int>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex); 
            IList<icon> list = SqlMap.QueryForList<icon>("icon.GetModelListByPage", dict); 
            return list;
        }

        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("icon.GetCount", null);
        }

        public icon GetModelById(int icon_id)
        {
            icon icon = SqlMap.QueryForObject<icon>("icon.GetModelById", icon_id);
            return icon;
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
