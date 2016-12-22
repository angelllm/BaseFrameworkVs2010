using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductSkuService : BaseService
    {

        public ProductSkuService()
        {

        }

        public void Update(product_sku product_sku)
        {
            SqlMap.Update("product_sku.Update", product_sku);
        }

        public void Delete(product_sku product_sku)
        {
            SqlMap.Delete("product_sku.Delete", product_sku);
        }
        public void Add2(product_sku product_sku)
        {
            SqlMap.Insert("product_sku.Add2", product_sku);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_sku product_sku)
        {
            int Id = (int)SqlMap.Insert("product_sku.Add", product_sku);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_sku> GetModelList()
        {
            IList<product_sku> list = SqlMap.QueryForList<product_sku>("product_sku.GetModelList", null);
            return list;
        }
        public IList<product_sku> GetModelList(string strWhere)
        {
            IList<product_sku> list = SqlMap.QueryForList<product_sku>("product_sku.GetModelListWhere", strWhere);
            return list;
        }
        public product_sku GetModelById(int product_sku_id)
        {
            product_sku product_sku = SqlMap.QueryForObject<product_sku>("product_sku.GetModelById", product_sku_id);
            return product_sku;
        }

        public IList<product_sku> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku> list = SqlMap.QueryForList<product_sku>("product_sku.GetListByPage", dict);

            return list;
        }

        public IList<product_sku> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_sku> list = SqlMap.QueryForList<product_sku>("product_sku.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_sku.GetCount", null);
        }

        public int GetMaxsku_id()
        {
            return (int)SqlMap.QueryForObject("product_sku.GetMaxsku_id", null);
        }





    }
}




