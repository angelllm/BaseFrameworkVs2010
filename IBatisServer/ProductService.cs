

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductService : BaseService
    {

        public ProductService()
        {

        }
        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("product.GetPageinfoCount", sql);
        }
        public IList<product> GetModelListByPage(string sql)
        {
            IList<product> list = SqlMap.QueryForList<product>("product.GetModelListByPage", sql);
            return list;
        }
        public void Update(product product)
        {
            SqlMap.Update("product.Update", product);
        }

        public void Delete(product product)
        {
            SqlMap.Delete("product.Delete", product);
        }
        public void Add2(product product)
        {
            SqlMap.Insert("product.Add2", product);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product product)
        {
            int Id = (int)SqlMap.Insert("product.Add", product);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product> GetModelList()
        {
            IList<product> list = SqlMap.QueryForList<product>("product.GetModelList", null);
            return list;
        }
        public IList<product> GetModelList(string strWhere)
        {
            IList<product> list = SqlMap.QueryForList<product>("product.GetModelListWhere", strWhere);
            return list;
        }
        public product GetModelById(int product_id)
        {
            product product = SqlMap.QueryForObject<product>("product.GetModelById", product_id);
            return product;
        }

        public IList<product> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product> list = SqlMap.QueryForList<product>("product.GetListByPage", dict);

            return list;
        }

        public IList<product> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product> list = SqlMap.QueryForList<product>("product.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product.GetCount", null);
        }

        public int GetMaxproduct_id()
        {
            return (int)SqlMap.QueryForObject("product.GetMaxproduct_id", null);
        }





    }
}




