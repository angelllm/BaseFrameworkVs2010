

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductParamService : BaseService
    {

        public ProductParamService()
        {

        }

        public void Update(product_param product_param)
        {
            SqlMap.Update("product_param.Update", product_param);
        }

        public void Delete(product_param product_param)
        {
            SqlMap.Delete("product_param.Delete", product_param);
        }
        public void Add2(product_param product_param)
        {
            SqlMap.Insert("product_param.Add2", product_param);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_param product_param)
        {
            int Id = (int)SqlMap.Insert("product_param.Add", product_param);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_param> GetModelList()
        {
            IList<product_param> list = SqlMap.QueryForList<product_param>("product_param.GetModelList", null);
            return list;
        }
        public IList<product_param> GetModelList(string strWhere)
        {
            IList<product_param> list = SqlMap.QueryForList<product_param>("product_param.GetModelListWhere", strWhere);
            return list;
        }
        public product_param GetModelById(int product_param_id)
        {
            product_param product_param = SqlMap.QueryForObject<product_param>("product_param.GetModelById", product_param_id);
            return product_param;
        }

        public IList<product_param> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_param> list = SqlMap.QueryForList<product_param>("product_param.GetListByPage", dict);

            return list;
        }

        public IList<product_param> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_param> list = SqlMap.QueryForList<product_param>("product_param.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_param.GetCount", null);
        }

        public int GetMaxparam_id()
        {
            return (int)SqlMap.QueryForObject("product_param.GetMaxparam_id", null);
        }





    }
}




