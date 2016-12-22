

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductSkuParamListService : BaseService
    {

        public ProductSkuParamListService()
        {

        }
        public int GetMax()
        {
            return (int)SqlMap.QueryForObject("product_sku_param_list.GetMax", null);
        }
         
        public void Update(product_sku_param_list product_sku_param_list)
        {
            SqlMap.Update("product_sku_param_list.Update", product_sku_param_list);
        }

        public void Delete(product_sku_param_list product_sku_param_list)
        {
            SqlMap.Delete("product_sku_param_list.Delete", product_sku_param_list);
        }
        public void Add2(product_sku_param_list product_sku_param_list)
        {
            SqlMap.Insert("product_sku_param_list.Add2", product_sku_param_list);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_sku_param_list product_sku_param_list)
        {
            int Id = (int)SqlMap.Insert("product_sku_param_list.Add", product_sku_param_list);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_sku_param_list> GetModelList()
        {
            IList<product_sku_param_list> list = SqlMap.QueryForList<product_sku_param_list>("product_sku_param_list.GetModelList", null);
            return list;
        }
        public IList<product_sku_param_list> GetModelList(string strWhere)
        {
            IList<product_sku_param_list> list = SqlMap.QueryForList<product_sku_param_list>("product_sku_param_list.GetModelListWhere", strWhere);
            return list;
        }
        public product_sku_param_list GetModelById(int product_sku_param_list_id)
        {
            product_sku_param_list product_sku_param_list = SqlMap.QueryForObject<product_sku_param_list>("product_sku_param_list.GetModelById", product_sku_param_list_id);
            return product_sku_param_list;
        }

        public IList<product_sku_param_list> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku_param_list> list = SqlMap.QueryForList<product_sku_param_list>("product_sku_param_list.GetListByPage", dict);

            return list;
        }

        public IList<product_sku_param_list> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku_param_list> list = SqlMap.QueryForList<product_sku_param_list>("product_sku_param_list.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_sku_param_list.GetCount", null);
        }

        public int GetMaxlist_id()
        {
            return (int)SqlMap.QueryForObject("product_sku_param_list.GetMaxlist_id", null);
        }





    }
}




