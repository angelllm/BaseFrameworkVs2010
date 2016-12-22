using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class UserCardService : BaseService
    {

        public UserCardService()
        {

        }

        public void Update(userCard userCard)
        {
            SqlMap.Update("userCard.Update", userCard);
        }

        public void Delete(userCard userCard)
        {
            SqlMap.Delete("userCard.Delete", userCard);
        }
        public void Add2(userCard userCard)
        {
            SqlMap.Insert("userCard.Add2", userCard);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(userCard userCard)
        {
            int Id = (int)SqlMap.Insert("userCard.Add", userCard);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }
        public IList<userCard> GetListByPage(string sql)
        {
            IList<userCard> list = SqlMap.QueryForList<userCard>("userCard.GetListByPage", sql);
            return list;
        }
        public IList<userCard> GetModelList()
        {
            IList<userCard> list = SqlMap.QueryForList<userCard>("userCard.GetModelList", null);
            return list;
        }
        public IList<userCard> GetModelList(string strWhere)
        {
            IList<userCard> list = SqlMap.QueryForList<userCard>("userCard.GetModelListWhere", strWhere);
            return list;
        }
        public userCard GetModelById(int userCard_id)
        {
            userCard userCard = SqlMap.QueryForObject<userCard>("userCard.GetModelById", userCard_id);
            return userCard;
        }
        public userCard GetModelByMid(int userCard_mid)
        {
            userCard userCard = SqlMap.QueryForObject<userCard>("userCard.GetModelByMid", userCard_mid);
            return userCard;
        }
        

        public IList<userCard> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<userCard> list = SqlMap.QueryForList<userCard>("userCard.GetListByPage", dict);

            return list;
        }

        public IList<userCard> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<userCard> list = SqlMap.QueryForList<userCard>("userCard.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("userCard.GetCount", null);
        }

        public int GetMaxuserCard_id()
        {
            return (int)SqlMap.QueryForObject("userCard.GetMaxuserCard_id", null);
        }





    }
}




