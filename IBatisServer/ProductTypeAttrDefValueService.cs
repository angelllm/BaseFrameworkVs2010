

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductTypeAttrDefValueService : BaseService
    {

        public ProductTypeAttrDefValueService()
        {

        }

        public void Update(product_type_attr_def_value product_type_attr_def_value)
        {
            SqlMap.Update("product_type_attr_def_value.Update", product_type_attr_def_value);
        }

        public void Delete(product_type_attr_def_value product_type_attr_def_value)
        {
            SqlMap.Delete("product_type_attr_def_value.Delete", product_type_attr_def_value);
        }
        public void Add2(product_type_attr_def_value product_type_attr_def_value)
        {
            SqlMap.Insert("product_type_attr_def_value.Add2", product_type_attr_def_value);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_type_attr_def_value product_type_attr_def_value)
        {
            int Id = (int)SqlMap.Insert("product_type_attr_def_value.Add", product_type_attr_def_value);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_type_attr_def_value> GetModelList()
        {
            IList<product_type_attr_def_value> list = SqlMap.QueryForList<product_type_attr_def_value>("product_type_attr_def_value.GetModelList", null);
            return list;
        }
        public IList<product_type_attr_def_value> GetModelList(string strWhere)
        {
            IList<product_type_attr_def_value> list = SqlMap.QueryForList<product_type_attr_def_value>("product_type_attr_def_value.GetModelListWhere", strWhere);
            return list;
        }
        public product_type_attr_def_value GetModelById(int product_type_attr_def_value_id)
        {
            product_type_attr_def_value product_type_attr_def_value = SqlMap.QueryForObject<product_type_attr_def_value>("product_type_attr_def_value.GetModelById", product_type_attr_def_value_id);
            return product_type_attr_def_value;
        }

        public IList<sys_type> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("product_type_attr_def_value.GetListByPage", dict);

            return list;
        }

        public IList<sys_type> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("product_type_attr_def_value.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_type_attr_def_value.GetCount", null);
        }

        public int GetMaxvalue_id()
        {
            return (int)SqlMap.QueryForObject("product_type_attr_def_value.GetMaxvalue_id", null);
        }




    }
}




