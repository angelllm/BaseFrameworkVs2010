

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ProductImageService : BaseService
    {

        public ProductImageService()
        {

        }

        public void Update(product_image product_image)
        {
            SqlMap.Update("product_image.Update", product_image);
        }

        public void Delete(product_image product_image)
        {
            SqlMap.Delete("product_image.Delete", product_image);
        }
        public void Add2(product_image product_image)
        {
            SqlMap.Insert("product_image.Add2", product_image);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(product_image product_image)
        {
            int Id = (int)SqlMap.Insert("product_image.Add", product_image);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<product_image> GetModelList()
        {
            IList<product_image> list = SqlMap.QueryForList<product_image>("product_image.GetModelList", null);
            return list;
        }
        public IList<product_image> GetModelList(string strWhere)
        {
            IList<product_image> list = SqlMap.QueryForList<product_image>("product_image.GetModelListWhere", strWhere);
            return list;
        }
        public product_image GetModelById(int product_image_id)
        {
            product_image product_image = SqlMap.QueryForObject<product_image>("product_image.GetModelById", product_image_id);
            return product_image;
        }

        public IList<product_image> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_image> list = SqlMap.QueryForList<product_image>("product_image.GetListByPage", dict);

            return list;
        }

        public IList<product_image> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<product_image> list = SqlMap.QueryForList<product_image>("product_image.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("product_image.GetCount", null);
        }

        public int GetMaximage_id()
        {
            return (int)SqlMap.QueryForObject("product_image.GetMaximage_id", null);
        }





    }
}




