

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class configService : BaseService
    {

        public configService()
        {

        }

        public void Update(config config)
        {
            SqlMap.Update("config.Update", config);
        }

        public void Delete(config config)
        {
            SqlMap.Delete("config.Delete", config);
        }
        public void Add2(config config)
        {
            SqlMap.Insert("config.Add2", config);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(config config)
        {
            int Id = (int)SqlMap.Insert("config.Add", config);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<config> GetModelList()
        {
            IList<config> list = SqlMap.QueryForList<config>("config.GetModelList", null);
            return list;
        }
        public IList<config> GetModelList(string strWhere)
        {
            IList<config> list = SqlMap.QueryForList<config>("config.GetModelListWhere", strWhere);
            return list;
        }
        public config GetModelById(int config_id)
        {
            config config = SqlMap.QueryForObject<config>("config.GetModelById", config_id);
            return config;
        }
        public config GetModelByCode(string config_code)
        {
            config config = SqlMap.QueryForObject<config>("config.GetModelByCode", config_code);
            return config;
        }
        public IList<config> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<config> list = SqlMap.QueryForList<config>("config.GetListByPage", dict);

            return list;
        }

        public IList<config> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<config> list = SqlMap.QueryForList<config>("config.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("config.GetCount", null);
        }

        public int GetMaxconfig_id()
        {
            return (int)SqlMap.QueryForObject("config.GetMaxconfig_id", null);
        }





    }
}




