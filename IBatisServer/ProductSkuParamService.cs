

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductSkuParamService : BaseService
    {

        public ProductSkuParamService()
        {

        }

        public void Update(product_sku_param product_sku_param)
        {
            SqlMap.Update("product_sku_param.Update", product_sku_param);
        }

        public void Delete(product_sku_param product_sku_param)
        {
            SqlMap.Delete("product_sku_param.Delete", product_sku_param);
        }
        public void Add2(product_sku_param product_sku_param)
        {
            SqlMap.Insert("product_sku_param.Add2", product_sku_param);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_sku_param product_sku_param)
        {
            int Id = (int)SqlMap.Insert("product_sku_param.Add", product_sku_param);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_sku_param> GetModelList()
        {
            IList<product_sku_param> list = SqlMap.QueryForList<product_sku_param>("product_sku_param.GetModelList", null);
            return list;
        }
        public IList<product_sku_param> GetModelList(string strWhere)
        {
            IList<product_sku_param> list = SqlMap.QueryForList<product_sku_param>("product_sku_param.GetModelListWhere", strWhere);
            return list;
        }
        public product_sku_param GetModelById(int product_sku_param_id)
        {
            product_sku_param product_sku_param = SqlMap.QueryForObject<product_sku_param>("product_sku_param.GetModelById", product_sku_param_id);
            return product_sku_param;
        }

        public IList<product_sku_param> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku_param> list = SqlMap.QueryForList<product_sku_param>("product_sku_param.GetListByPage", dict);

            return list;
        }

        public IList<product_sku_param> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku_param> list = SqlMap.QueryForList<product_sku_param>("product_sku_param.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_sku_param.GetCount", null);
        }

        public int GetMaxparam_id()
        {
            return (int)SqlMap.QueryForObject("product_sku_param.GetMaxparam_id", null);
        }





    }
}




