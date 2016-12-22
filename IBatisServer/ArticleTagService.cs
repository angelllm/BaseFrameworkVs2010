

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ArticleTagService : BaseService
    {

        public ArticleTagService()
        {

        }

        public IList<article_tag> GetModelListByPage(string sql)
        {
            IList<article_tag> list = SqlMap.QueryForList<article_tag>("article_tag.GetModelListByPage", sql);
            return list;
        }
        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("article_tag.GetPageinfoCount", sql);
        }

        public void Update(article_tag article_tag)
        {
            SqlMap.Update("article_tag.Update", article_tag);
        }

        public void Delete(article_tag article_tag)
        {
            SqlMap.Delete("article_tag.Delete", article_tag);
        }
        public void Add2(article_tag article_tag)
        {
            SqlMap.Insert("article_tag.Add2", article_tag);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(article_tag article_tag)
        {
            int Id = (int)SqlMap.Insert("article_tag.Add", article_tag);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<article_tag> GetModelList()
        {
            IList<article_tag> list = SqlMap.QueryForList<article_tag>("article_tag.GetModelList", null);
            return list;
        }
        public IList<article_tag> GetModelList(string strWhere)
        {
            IList<article_tag> list = SqlMap.QueryForList<article_tag>("article_tag.GetModelListWhere", strWhere);
            return list;
        }
        public article_tag GetModelById(int article_tag_id)
        {
            article_tag article_tag = SqlMap.QueryForObject<article_tag>("article_tag.GetModelById", article_tag_id);
            return article_tag;
        }

        public IList<article_tag> GetListByPage(int startIndex, int endIndex)
        {

            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<article_tag> list = SqlMap.QueryForList<article_tag>("article_tag.GetListByPage", dict);

            return list;
        }

        public IList<article_tag> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("strWhere", strWhere);
            dict.Add("orderby", orderby);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<article_tag> list = SqlMap.QueryForList<article_tag>("article_tag.GetListByPage", dict);

            return list;
        }


        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("article_tag.GetCount", null);
        }

        public int GetMaxtag_id()
        {
            return (int)SqlMap.QueryForObject("article_tag.GetMaxtag_id", null);
        }





    }
}




