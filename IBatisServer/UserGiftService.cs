using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class UserGiftService : BaseService
    {

        public UserGiftService()
        {

        }

        public void Update(userGift userGift)
        {
            SqlMap.Update("userGift.Update", userGift);
        }

        public void Delete(userGift userGift)
        {
            SqlMap.Delete("userGift.Delete", userGift);
        }
        public void Add2(userGift userGift)
        {
            SqlMap.Insert("userGift.Add2", userGift);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(userGift userGift)
        {
            int Id = (int)SqlMap.Insert("userGift.Add", userGift);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }
        public IList<userGift> GetListByPage(string sql)
        {
            IList<userGift> list = SqlMap.QueryForList<userGift>("userGift.GetListByPage", sql);
            return list;
        }
        public IList<userGift> GetModelList()
        {
            IList<userGift> list = SqlMap.QueryForList<userGift>("userGift.GetModelList", null);
            return list;
        }
        public IList<userGift> GetModelList(string strWhere)
        {
            IList<userGift> list = SqlMap.QueryForList<userGift>("userGift.GetModelListWhere", strWhere);
            return list;
        }
        public userGift GetModelById(int userGift_id)
        {
            userGift userGift = SqlMap.QueryForObject<userGift>("userGift.GetModelById", userGift_id);
            return userGift;
        }
        public userGift GetModelByMid(int userGift_mid)
        {
            userGift userGift = SqlMap.QueryForObject<userGift>("userGift.GetModelByMid", userGift_mid);
            return userGift;
        }
       
        
        public IList<userGift> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<userGift> list = SqlMap.QueryForList<userGift>("userGift.GetListByPage", dict);

            return list;
        }

        public IList<userGift> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<userGift> list = SqlMap.QueryForList<userGift>("userGift.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("userGift.GetCount", null);
        }

        public int GetMaxuserGift_id()
        {
            return (int)SqlMap.QueryForObject("userGift.GetMaxuserGift_id", null);
        }





    }
}




