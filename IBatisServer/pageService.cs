

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class pageService : BaseService
    {

        public pageService()
        {

        }
        public IList<page> GetModelListByPageUseTop(int pagesize, int pageindex, string strwhere)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            dict.Add("strwhere", strwhere);
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetModelListByPageUseTop", dict);

            return list;
        }

        public page GetTotalCountAndNewCount(string strWhere)
        {
            page page = SqlMap.QueryForObject<page>("sysPage.GetTotalCountAndNewCount", strWhere);
            return page;
        }
        public page GetModelByTypeId(int page_type_id)
        {
            page page = SqlMap.QueryForObject<page>("sysPage.GetModelByTypeId", page_type_id);
            return page;
        }
        public page GetModelByTypeCode(string page_type_code)
        {
            page page = SqlMap.QueryForObject<page>("sysPage.GetModelByTypeCode", page_type_code);
            return page;
        }
        public void Update(page page)
        {
            SqlMap.Update("sysPage.Update", page);
        }

        public void Delete(page page)
        {
            SqlMap.Delete("sysPage.Delete", page);
        }
        public void Add2(page page)
        {
            SqlMap.Insert("sysPage.Add2", page);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(page page)
        {
            int Id = (int)SqlMap.Insert("sysPage.Add", page);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }


        public IList<page> GetModelListByPage(string sql)
        {
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetModelListByPage", sql);
            return list;
        }
        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("sysPage.GetPageinfoCount", sql);
        }
        public IList<page> GetModelList()
        {
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetModelList", null);
            return list;
        }
        public IList<page> GetModelList(string strWhere)
        {
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetModelListWhere", strWhere);
            return list;
        }
        public page GetModelById(int page_id)
        {
            page page = SqlMap.QueryForObject<page>("sysPage.GetModelById", page_id);
            return page;
        }
        public page GetModelByType(int page_type_id)
        {
            page page = SqlMap.QueryForObject<page>("sysPage.GetModelByType", page_type_id);
            return page;
        }
        public IList<page> GetModelListByType(int page_type_id)
        {
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetModelList2", page_type_id);
            return list;
        }
        public IList<page> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetListByPage", dict);

            return list;
        }

        public IList<page> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<page> list = SqlMap.QueryForList<page>("sysPage.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("sysPage.GetCount", null);
        }

        public int GetMaxpage_id()
        {
            return (int)SqlMap.QueryForObject("sysPage.GetMaxpage_id", null);
        }





    }
}




