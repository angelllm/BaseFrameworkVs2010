

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class adminService : BaseService
    {

        public adminService()
        {

        }

        public void Update(admin admin)
        {
            SqlMap.Update("admin.Update", admin);
        }

        public void Delete(admin admin)
        {
            SqlMap.Delete("admin.Delete", admin);
        }
        public void Add2(admin admin)
        {
            SqlMap.Insert("admin.Add2", admin);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(admin admin)
        {
            int Id = (int)SqlMap.Insert("admin.Add", admin);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<admin> GetModelList()
        {
            IList<admin> list = SqlMap.QueryForList<admin>("admin.GetModelList", null);
            return list;
        }
        public IList<admin> GetModelList(string strWhere)
        {
            IList<admin> list = SqlMap.QueryForList<admin>("admin.GetModelListWhere", strWhere);
            return list;
        }
        public admin GetModelById(int admin_id)
        {
            admin admin = SqlMap.QueryForObject<admin>("admin.GetModelById", admin_id);
            return admin;
        }
        public admin GetModelByName(string admin_name)
        {
            admin admin = SqlMap.QueryForObject<admin>("admin.GetModelByName", admin_name);
            return admin;
        } 

        public IList<admin> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<admin> list = SqlMap.QueryForList<admin>("admin.GetListByPage", dict);

            return list;
        }

        public IList<admin> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<admin> list = SqlMap.QueryForList<admin>("admin.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("admin.GetCount", null);
        }

        public int GetMaxadmin_id()
        {
            return (int)SqlMap.QueryForObject("admin.GetMaxadmin_id", null);
        }





    }
}




