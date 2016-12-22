

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class commiteService : BaseService
    {

        public commiteService()
        {

        }
        public IList<commite> GetModelListByPageUseTop(int pagesize, int pageindex, string strwhere)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            dict.Add("strwhere", strwhere);
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetModelListByPageUseTop", dict);

            return list;
        }

        public commite GetTotalCountAndNewCount(string strWhere)
        {
            commite page = SqlMap.QueryForObject<commite>("commite.GetTotalCountAndNewCount", strWhere);
            return page;
        }
        public IList<commite> GetCommiteList(int commite_article_id)
        {
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetCommiteList", commite_article_id);
            return list;
        }
        public IList<commite> GetTopList(int top)
        {
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetTopList", top);
            return list;
        }

        public IList<commite> GetModelListByPage(string sql)
        {
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetModelListByPage", sql);
            return list;
        }
        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("commite.GetPageinfoCount", sql);
        }
        public int GetCount(int id)
        {
            return (int)SqlMap.QueryForObject("commite.GetCount", id);
        }
         
        public void Update(commite commite)
        {
            SqlMap.Update("commite.Update", commite);
        }

        public void Delete(commite commite)
        {
            SqlMap.Delete("commite.Delete", commite);
        }
        public void Add2(commite commite)
        {
            SqlMap.Insert("commite.Add2", commite);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(commite commite)
        {
            int Id = (int)SqlMap.Insert("commite.Add", commite);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<commite> GetModelList()
        {
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetModelList", null);
            return list;
        }
        public IList<commite> GetModelList(string strWhere)
        {
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetModelListWhere", strWhere);
            return list;
        }
        public commite GetModelById(int commite_id)
        {
            commite commite = SqlMap.QueryForObject<commite>("commite.GetModelById", commite_id);
            return commite;
        }

        public IList<commite> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetListByPage", dict);

            return list;
        }

        public IList<commite> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<commite> list = SqlMap.QueryForList<commite>("commite.GetListByPage", dict);

            return list;
        }
        public IList<commite> GetSql(string sql)
        {
            IList<commite> list = SqlMap.QueryForList<commite>("commite.sql",null);
            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("commite.GetCount", null);
        }

        public int GetMaxcommite_id()
        {
            return (int)SqlMap.QueryForObject("commite.GetMaxcommite_id", null);
        }





    }
}




