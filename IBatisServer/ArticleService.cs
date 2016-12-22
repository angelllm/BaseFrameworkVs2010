

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ArticleService : BaseService
    {

        public ArticleService()
        {

        }

        public article GetLastUpdateTime()
        {
            article article = SqlMap.QueryForObject<article>("article.GetLastUpdateTime", null);
            return article;
        } 
        public IList<article> GetPrevNext(int article_id)
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetPrevNext", article_id);
            return list;
        } 
        public IList<article> GetArchives()
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetArchives", null);
            return list;
        } 
        public IList<article> GetModelListByPageUseTop(int pagesize, int pageindex, string strwhere)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            dict.Add("strwhere", strwhere);
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelListByPageUseTop", dict);
              
            return list;
        } 
        public IList<article> GetModelListByPageUseTopForLand(int pagesize, int pageindex, string strwhere)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            dict.Add("strwhere", strwhere);
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelListByPageUseTopForLand", dict);
              
            return list;
        }

        

        public article GetTotalCountAndNewCount()
        {
            article article = SqlMap.QueryForObject<article>("article.GetTotalCountAndNewCount", null);
            return article;
        }
        public IList<article> GetModelListByPage(string sql)
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelListByPage", sql);
            return list;
        }
        public IList<article> GetModelListByPage2(string sql)
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelListByPage2", sql);
            return list;
        }

        public IList<article> GetModelListByPage3(string sql)
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelListByPage3", sql);
            return list;
        }

        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("article.GetPageinfoCount", sql);
        }
        public void Update(article article)
        {
            SqlMap.Update("article.Update", article);
        }
        public void UpdateLike(article article)
        {
            SqlMap.Update("article.UpdateLike", article);
        }
        public void Delete(article article)
        {
            SqlMap.Delete("article.Delete", article);
        }
        public void Add2(article article)
        {
            SqlMap.Insert("article.Add2", article);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(article article)
        {
            int Id = (int)SqlMap.Insert("article.Add", article);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }
        public int GetCount()
        {
            int Id = (int)SqlMap.QueryForObject("article.GetCount", null);
            return Id;
        }
        public IList<article> GetModelList()
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelList", null);
            return list;
        }
        public IList<article> GetModelList(string strWhere)
        {
            //string sql = SqlMap.GetMappedStatement("GetModelListWhere").Statement.Sql.ToString();
            IList<article> list = SqlMap.QueryForList<article>("article.GetModelListWhere", strWhere);

            return list;
        }
        public IList<article> GetTopModelList(int top)
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetTopModelList", top);
            return list;
        }
        public article GetModelById(int article_id)
        {
            article article = SqlMap.QueryForObject<article>("article.GetModelById", article_id);
            return article;
        }

        public IList<article> GetListByPage(string sql)
        {
            IList<article> list = SqlMap.QueryForList<article>("article.GetListByPage", sql);
            return list;
        }

    }
}




