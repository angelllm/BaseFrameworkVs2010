using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductSkuValueService : BaseService
    {

        public ProductSkuValueService()
        {

        }

        public void Update(product_sku_value product_sku_value)
        {
            SqlMap.Update("product_sku_value.Update", product_sku_value);
        }

        public void Delete(product_sku_value product_sku_value)
        {
            SqlMap.Delete("product_sku_value.Delete", product_sku_value);
        }
        public void Add2(product_sku_value product_sku_value)
        {
            SqlMap.Insert("product_sku_value.Add2", product_sku_value);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_sku_value product_sku_value)
        {
            int Id = (int)SqlMap.Insert("product_sku_value.Add", product_sku_value);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_sku_value> GetModelList()
        {
            IList<product_sku_value> list = SqlMap.QueryForList<product_sku_value>("product_sku_value.GetModelList", null);
            return list;
        }
        public IList<product_sku_value> GetModelList(string strWhere)
        {
            IList<product_sku_value> list = SqlMap.QueryForList<product_sku_value>("product_sku_value.GetModelListWhere", strWhere);
            return list;
        }
        public product_sku_value GetModelById(int product_sku_value_id)
        {
            product_sku_value product_sku_value = SqlMap.QueryForObject<product_sku_value>("product_sku_value.GetModelById", product_sku_value_id);
            return product_sku_value;
        }
        public product_sku_value GetModelBySkuId(int value_sku_id)
        {
            product_sku_value product_sku_value = SqlMap.QueryForObject<product_sku_value>("product_sku_value.GetModelBySkuId", value_sku_id);
            return product_sku_value;
        }

        
        public IList<product_sku_value> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku_value> list = SqlMap.QueryForList<product_sku_value>("product_sku_value.GetListByPage", dict);

            return list;
        }

        public IList<product_sku_value> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku_value> list = SqlMap.QueryForList<product_sku_value>("product_sku_value.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_sku_value.GetCount", null);
        }

        public int GetMaxvalue_id()
        {
            return (int)SqlMap.QueryForObject("product_sku_value.GetMaxvalue_id", null);
        }





    }
}




