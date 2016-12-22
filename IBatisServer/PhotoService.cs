

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class photoService : BaseService
    {

        public photoService()
        {

        }

        public void Update(photo photo)
        {
            SqlMap.Update("photo.Update", photo);
        }

        public void Delete(photo photo)
        {
            SqlMap.Delete("photo.Delete", photo);
        }
        public void Add2(photo photo)
        {
            SqlMap.Insert("photo.Add2", photo);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(photo photo)
        {
            int Id = (int)SqlMap.Insert("photo.Add", photo);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<photo> GetModelList()
        {
            IList<photo> list = SqlMap.QueryForList<photo>("photo.GetModelList", null);
            return list;
        }
        public IList<photo> GetModelList(string strWhere)
        {
            IList<photo> list = SqlMap.QueryForList<photo>("photo.GetModelListWhere", strWhere);
            return list;
        }
        public photo GetModelById(int photo_id)
        {
            photo photo = SqlMap.QueryForObject<photo>("photo.GetModelById", photo_id);
            return photo;
        }

        public IList<photo> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<photo> list = SqlMap.QueryForList<photo>("photo.GetListByPage", dict);

            return list;
        }

        public IList<photo> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<photo> list = SqlMap.QueryForList<photo>("photo.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("photo.GetCount", null);
        }

        public int GetMaxphoto_id()
        {
            return (int)SqlMap.QueryForObject("photo.GetMaxphoto_id", null);
        }





    }
}




