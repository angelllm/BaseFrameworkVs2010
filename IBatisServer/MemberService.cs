using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class memberService : BaseService
    {

        public memberService()
        {

        }
        public IList<member> GetModelListByPageUseTop(int pagesize, int pageindex, string strwhere)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            dict.Add("strwhere", strwhere);
            IList<member> list = SqlMap.QueryForList<member>("member.GetModelListByPageUseTop", dict);

            return list;
        }

        public member GetTotalCountAndNewCount(string strWhere)
        {
            member page = SqlMap.QueryForObject<member>("member.GetTotalCountAndNewCount", strWhere);
            return page;
        }
        public member GetModelByName(string member_name)
        {
            member member = SqlMap.QueryForObject<member>("member.GetModelByName", member_name);
            return member;
        }
        public member GetModelByPhone(string member_phone)
        {
            member member = SqlMap.QueryForObject<member>("member.GetModelByPhone", member_phone);
            return member;
        }
        public IList<member> GetModelListByPage(string sql)
        {
            IList<member> list = SqlMap.QueryForList<member>("member.GetModelListByPage", sql);
            return list;
        }
        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("member.GetPageinfoCount", sql);
        }
        public void Update(member member)
        {
            SqlMap.Update("member.Update", member);
        }

        public void Delete(member member)
        {
            SqlMap.Delete("member.Delete", member);
        }
        public void Add2(member member)
        {
            SqlMap.Insert("member.Add2", member);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        //public IList<member> GetModelListByPage(string sql)
        //{
        //    IList<member> list = SqlMap.QueryForList<member>("member.Sql", sql);
        //    return list;
        //}
        public int Add(member member)
        {
            int Id = (int)SqlMap.Insert("member.Add", member);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }
        public IList<member> GetListByPage(string sql)
        {
            IList<member> list = SqlMap.QueryForList<member>("member.GetListByPage", sql);
            return list;
        }
        public IList<member> GetModelList()
        {
            IList<member> list = SqlMap.QueryForList<member>("member.GetModelList", null);
            return list;
        }
        public IList<member> GetModelList(string strWhere)
        {
            IList<member> list = SqlMap.QueryForList<member>("member.GetModelListWhere", strWhere);
            return list;
        }
        public member GetModelById(int member_id)
        {
            member member = SqlMap.QueryForObject<member>("member.GetModelById", member_id);
            return member;
        }
      
        public IList<member> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<member> list = SqlMap.QueryForList<member>("member.GetListByPage", dict);

            return list;
        }

        public IList<member> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<member> list = SqlMap.QueryForList<member>("member.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("member.GetCount", null);
        }

        public int GetMaxmember_id()
        {
            return (int)SqlMap.QueryForObject("member.GetMaxmember_id", null);
        }





    }
}




