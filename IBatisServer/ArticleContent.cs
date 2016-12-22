

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;


namespace IBatisServer
{
    public class ArticleContentService : BaseService
    {

        public ArticleContentService()
        {

        }

        public void Update(article_content article_content)
        {
            SqlMap.Update("article_content.Update",  article_content);
        }

        public void Delete(article_content article_content)
        {
            SqlMap.Delete("article_content.Delete", article_content);
        }
        public void Add2(article_content article_content)
        {
            SqlMap.Insert("article_content.Add2", article_content);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
          
        }
        public int Add(article_content article_content)
        {
            int Id = (int)SqlMap.Insert("article_content.Add", article_content);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction(); 
            return Id;
        }
        
        public IList<article_content> GetModelList()
        {
            IList<article_content> list = SqlMap.QueryForList<article_content>("article_content.GetModelList", null);
            return list;
        }
        public IList<article_content> GetModelList(string strWhere)
        {
            //string sql = SqlMap.GetMappedStatement("GetModelListWhere").Statement.Sql.ToString();
            IList<article_content> list = SqlMap.QueryForList<article_content>("article_content.GetModelListWhere", strWhere);
            
            return list;
        }
        public article_content GetModelById(int article_content_id)
        {
            article_content article_content = SqlMap.QueryForObject<article_content>("article_content.GetModelById", article_content_id);
            return article_content;
        }

         

    }
}



    
