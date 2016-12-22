

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductTypeAttrServices : BaseService
    {

        public ProductTypeAttrServices()
        {
             
        }

        public void Update(product_type_attr product_type_attr)
        {
            SqlMap.Update("product_type_attr.Update",  product_type_attr);
        }

        public void Delete(product_type_attr product_type_attr)
        {
            SqlMap.Delete("product_type_attr.Delete", product_type_attr);
        }
        public void Add2(product_type_attr product_type_attr)
        {
            SqlMap.Insert("product_type_attr.Add2", product_type_attr);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
          
        }
        public int Add(product_type_attr product_type_attr)
        {
            int Id = (int)SqlMap.Insert("product_type_attr.Add", product_type_attr);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction(); 
            return Id;
        }
        
        public IList<product_type_attr> GetModelList()
        {
            IList<product_type_attr> list = SqlMap.QueryForList<product_type_attr>("product_type_attr.GetModelList", null);
            return list;
        }
        public IList<product_type_attr> GetModelList(string strWhere)
        {
            IList<product_type_attr> list = SqlMap.QueryForList<product_type_attr>("product_type_attr.GetModelListWhere", strWhere);
            return list;
        }
        public product_type_attr GetModelById(int product_type_attr_id)
        {
            product_type_attr product_type_attr = SqlMap.QueryForObject<product_type_attr>("product_type_attr.GetModelById", product_type_attr_id);
            return product_type_attr;
        }
        public product_type_attr GetModelByAttrGuid(string attr_guid)
        {
            product_type_attr product_type_attr = SqlMap.QueryForObject<product_type_attr>("product_type_attr.GetModelByAttrGuid", attr_guid);
            return product_type_attr;
        }

        
        public IList<sys_type> GetListByPage(int startIndex, int endIndex)
        {
                        
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("product_type_attr.GetListByPage", dict);

            return list;
        }
        
        public IList<sys_type> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("product_type_attr.GetListByPage", dict);
            return list;
        }
        
        
        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_type_attr.GetCount", null);
        }
        
        
        

         

    }
}



    
