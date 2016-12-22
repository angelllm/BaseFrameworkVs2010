using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class UserSignService : BaseService
    {

        public UserSignService()
        {

        }

        public void Update(userSign userSign)
        {
            SqlMap.Update("userSign.Update", userSign);
        }

        public void Delete(userSign userSign)
        {
            SqlMap.Delete("userSign.Delete", userSign);
        }
        public void Add2(userSign userSign)
        {
            SqlMap.Insert("userSign.Add2", userSign);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(userSign userSign)
        {
            int Id = (int)SqlMap.Insert("userSign.Add", userSign);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }
        public IList<userSign> GetListByPage(string sql)
        {
            IList<userSign> list = SqlMap.QueryForList<userSign>("userSign.GetListByPage", sql);
            return list;
        }
        public IList<userSign> GetModelList()
        {
            IList<userSign> list = SqlMap.QueryForList<userSign>("userSign.GetModelList", null);
            return list;
        }
        public IList<userSign> GetModelList(string strWhere)
        {
            IList<userSign> list = SqlMap.QueryForList<userSign>("userSign.GetModelListWhere", strWhere);
            return list;
        }
        public userSign GetModelById(int userSign_id)
        {
            userSign userSign = SqlMap.QueryForObject<userSign>("userSign.GetModelById", userSign_id);
            return userSign;
        }
       
       
        public IList<userSign> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<userSign> list = SqlMap.QueryForList<userSign>("userSign.GetListByPage", dict);

            return list;
        }

        public IList<userSign> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<userSign> list = SqlMap.QueryForList<userSign>("userSign.GetListByPage", dict);

            return list;
        }


        public int GetCount(int sign_mid)
        {
            return (int)SqlMap.QueryForObject("userSign.GetCount", sign_mid);
        }
        public int GetQianDao(int sign_mid)
        {
            return (int)SqlMap.QueryForObject("userSign.GetQianDao", sign_mid);
        }
        public int GetMaxuserSign_id()
        {
            return (int)SqlMap.QueryForObject("userSign.GetMaxuserSign_id", null);
        }





    }
}




