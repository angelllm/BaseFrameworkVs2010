using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PanGu.HighLight;
using PanGu;
using Lucene.Net.Analysis.PanGu;
using llm.Model;
using Lucene.Net.Analysis;
using System.Web;
using System.IO;
using Lucene.Net.Index;
using Lucene.Net.Documents;
using Lucene.Net.Search;
using Lucene.Net.QueryParsers;
using System.Diagnostics;
using IBatisServer;


namespace Util
{
    public class LuceneHelper
    {
        private string strIndexPath = string.Empty;
        protected string txtTitle = string.Empty;
        protected string txtContent = string.Empty;
        protected long lSearchTime = 0;
        public IList<article> list = new List<article>();
        public IList<product> plist = new List<product>();
        protected string txtPageFoot = string.Empty;

        public LuceneHelper() { PanGu.Segment.Init(PanGuXmlPath); }
        public LuceneHelper(int pageSize, int pageIndex) { 
            PanGu.Segment.Init(PanGuXmlPath);
            this.PageSize = pageSize;
            this.PageIndex = pageIndex;
        }

        #region 配置

        
        /// <summary>
        /// 索引存放目录
        /// </summary>
        protected string IndexDic
        {
            get
            {
                return HttpContext.Current.Server.MapPath("/Content/File/IndexDic");
            }
        }
        /// <summary>
        /// 索引存放目录
        /// </summary>
        protected string ProductIndexDic
        {
            get
            {
                return HttpContext.Current.Server.MapPath("/Content/File/ProductIndexDic");
            }
        }
        /// <summary>
        /// 盘古分词的配置文件
        /// </summary>
        protected string PanGuXmlPath
        {
            get
            {
                return HttpContext.Current.Server.MapPath("/Content/File/PanGu/PanGu.xml");
            }
        }

        /// <summary>
        /// 盘古分词器
        /// </summary>
        protected Analyzer PanGuAnalyzer
        {
            get { return new PanGuAnalyzer(); }
        }

        /// <summary>
        /// 处理关键字为索引格式
        /// </summary>
        /// <param name="keywords"></param>
        /// <returns></returns>
        private string GetKeyWordsSplitBySpace(string keywords)
        {
            PanGuTokenizer ktTokenizer = new PanGuTokenizer();
            StringBuilder result = new StringBuilder();
            ICollection<WordInfo> words = ktTokenizer.SegmentToWordInfos(keywords);
            foreach (WordInfo word in words)
            {
                if (word == null)
                {
                    continue;
                }
                result.AppendFormat("{0}^{1}.0 ", word.Word, (int)Math.Pow(3, word.Rank));
            }
            return result.ToString().Trim();
        }

        #endregion
         
        #region 建立文章索引

        /// <summary>
        /// 设置关键字高亮
        /// </summary>
        /// <param name="dicKeywords">关键字列表</param>
        /// <param name="model">返回的数据模型</param>
        /// <returns></returns>
        private article SetHighlighter(Dictionary<string, string> dicKeywords, article model)
        {
            SimpleHTMLFormatter simpleHTMLFormatter = new PanGu.HighLight.SimpleHTMLFormatter("<font color=\"#C60\">", "</font>");
            Highlighter highlighter = new PanGu.HighLight.Highlighter(simpleHTMLFormatter, new Segment());
            highlighter.FragmentSize = 50;
            string strTitle = string.Empty;
            string strContent = string.Empty;
            dicKeywords.TryGetValue("title", out strTitle);
            dicKeywords.TryGetValue("content", out strContent);
            if (!string.IsNullOrEmpty(strTitle))
            {
                model.article_title = highlighter.GetBestFragment(strTitle, model.article_title);
            }
            if (!string.IsNullOrEmpty(strContent))
            {
                model.article_content = highlighter.GetBestFragment(strContent, model.article_content);
            }
            return model;
        }
        
        /// <summary>
        /// 创建索引
        /// </summary>
        public bool CreateIndex(bool isCreate)
        {
            //创建索引目录
            if (!Directory.Exists(IndexDic))
            {
                Directory.CreateDirectory(IndexDic);
            }
            //IndexWriter第三个参数:true指重新创建索引,false指从当前索引追加....此处为新建索引所以为true
            //IndexWriter writer = new IndexWriter(IndexDic, PanGuAnalyzer, isCreate, Lucene.Net.Index.IndexWriter.MaxFieldLength.LIMITED);
            IndexWriter writer = new IndexWriter(IndexDic, PanGuAnalyzer, isCreate);
            ArticleService ass = new ArticleService();
            IList<article> list = ass.GetModelList("1=1");
            foreach (var item in list)
                AddIndex(writer, item.article_title, item.article_content,item.article_id.ToString(),item.commite_count.ToString(), item.article_tag, item.article_time + "");
            writer.Optimize();
            writer.Close();
            return true;
        }



        /// <summary>
        /// 创建索引
        /// </summary>
        /// <param name="analyzer"></param>
        /// <param name="title"></param>
        /// <param name="content"></param>
        private void AddIndex(IndexWriter writer, string title, string content, string date)
        {
            try
            {
                Document doc = new Document();
                doc.Add(new Field("Title", title, Field.Store.YES, Field.Index.ANALYZED));//存储且索引
                doc.Add(new Field("Content", content, Field.Store.YES, Field.Index.ANALYZED));//存储且索引
                doc.Add(new Field("AddTime", date, Field.Store.YES, Field.Index.NOT_ANALYZED));//存储不索引
                writer.AddDocument(doc);
            }
            catch (FileNotFoundException fnfe)
            {
                throw fnfe;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 创建索引
        /// </summary>
        /// <param name="analyzer"></param>
        /// <param name="title"></param>
        /// <param name="content"></param>
        private void AddIndex(IndexWriter writer, string title, string content, string id, string commitecount, string tag, string date)
        {
            try
            {
                Document doc = new Document();
                doc.Add(new Field("Title", title, Field.Store.YES, Field.Index.ANALYZED));//存储且索引
                doc.Add(new Field("Content", content, Field.Store.YES, Field.Index.ANALYZED));//存储且索引
                doc.Add(new Field("Tag", tag, Field.Store.YES, Field.Index.ANALYZED));//存储且索引
                doc.Add(new Field("Id", id, Field.Store.YES, Field.Index.NOT_ANALYZED));//存储不索引
                doc.Add(new Field("commite", commitecount, Field.Store.YES, Field.Index.NOT_ANALYZED));//存储不索引
                doc.Add(new Field("AddTime", date, Field.Store.YES, Field.Index.NOT_ANALYZED));//存储不索引
                writer.AddDocument(doc);
            }
            catch (FileNotFoundException fnfe)
            {
                throw fnfe;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 从索引搜索结果
        /// </summary>
        public void SearchIndex(string key)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            BooleanQuery bQuery = new BooleanQuery();
            string title = string.Empty;
            //string content = string.Empty;
            if (!string.IsNullOrEmpty(key))
            {
                title = GetKeyWordsSplitBySpace(key);
                //MultiFieldQueryParser multiParser = new MultiFieldQueryParser(Lucene.Net.Util.Version.LUCENE_CURRENT,new String[] { "Title", "Content" }, PanGuAnalyzer);
                ////multiParser.SetPhraseSlop(0);
                ////设置短语搜索的坡度为3,默认为0
                //multiParser.SetDefaultOperator(QueryParser.Operator.OR);
                ////设置以空格分开的短语是并的关系,默认为或的关系;
                //Query query = multiParser.Parse(title);

                QueryParser parse = new QueryParser(Lucene.Net.Util.Version.LUCENE_CURRENT ,"Title", PanGuAnalyzer);
                Query query = parse.Parse(title);
                //parse.SetDefaultOperator(QueryParser.Operator.AND); 
                bQuery.Add(query, BooleanClause.Occur.SHOULD);

                //QueryParser qp = new QueryParser(Lucene.Net.Util.Version.LUCENE_CURRENT, "Tag", PanGuAnalyzer);
                //Query qpq = qp.Parse(title);
                ////parse.SetDefaultOperator(QueryParser.Operator.AND); 
                //bQuery.Add(query, BooleanClause.Occur.SHOULD);

                dic.Add("title", key);
               // dic.Add("content", key);
            }
            if (bQuery != null && bQuery.GetClauses().Length > 0)
            {
                GetSearchResult(bQuery, dic);
            }
        }

        /// <summary>
        /// 获取
        /// </summary>
        /// <param name="bQuery"></param>
        private void GetSearchResult(BooleanQuery bQuery, Dictionary<string, string> dicKeywords)
        {
            IndexSearcher search = new IndexSearcher(IndexDic, true);
            Stopwatch stopwatch = Stopwatch.StartNew();
            //SortField构造函数第三个字段true为降序,false为升序
            Sort sort = new Sort(new SortField("AddTime", SortField.DOC, true));
            TopDocs docs = search.Search(bQuery, (Filter)null, PageSize * PageIndex, sort);
            stopwatch.Stop();
            if (docs != null && docs.totalHits > 0)
            {
                long lSearchTime = stopwatch.ElapsedMilliseconds;
                //txtPageFoot = GetPageFoot(PageIndex, PageSize, docs.totalHits, "sabrosus");
                for (int i = 0; i < docs.totalHits; i++)
                {
                    if (i >= (PageIndex - 1) * PageSize && i < PageIndex * PageSize)
                    {
                        Document doc = search.Doc(docs.scoreDocs[i].doc);
                        article model = new article()
                        {
                            article_title = doc.Get("Title").ToString(),
                            article_content = doc.Get("Content").ToString(),
                            article_tag = doc.Get("Tag").ToString(),
                            article_id = Convert.ToInt32(doc.Get("Id").ToString()),
                            commite_count = Convert.ToInt32(doc.Get("commite").ToString()),
                            article_time = Convert.ToDateTime(doc.Get("AddTime").ToString())
                        };
                        list.Add(SetHighlighter(dicKeywords, model));
                    }
                }
            }
        }

        #endregion

        #region 建立商品索引


        /// <summary>
        /// 创建索引
        /// </summary>
        public bool CreateGoodsIndex(bool isCreate)
        {
            //创建索引目录
            if (!Directory.Exists(ProductIndexDic))
            {
                Directory.CreateDirectory(ProductIndexDic);
            }
            //IndexWriter第三个参数:true指重新创建索引,false指从当前索引追加....此处为新建索引所以为true
            IndexWriter writer = new IndexWriter(ProductIndexDic, PanGuAnalyzer, isCreate);
            ProductService pss = new ProductService();
            IList<product> list = pss.GetModelList("1=1");
            foreach (var item in list)
                AddGoodsIndex(writer, item.product_name, item.product_time + "");
            writer.Optimize();
            writer.Close();
            return true;
        }



        /// <summary>
        /// 创建索引
        /// </summary>
        /// <param name="analyzer"></param>
        /// <param name="title"></param>
        /// <param name="content"></param>
        private void AddGoodsIndex(IndexWriter writer, string title, string date)
        {
            try
            {
                Document doc = new Document();
                doc.Add(new Field("product_name", title, Field.Store.YES, Field.Index.ANALYZED));//存储且索引
                doc.Add(new Field("product_time", date, Field.Store.YES, Field.Index.NOT_ANALYZED));//存储不索引
                writer.AddDocument(doc);
            }
            catch (FileNotFoundException fnfe)
            {
                throw fnfe;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 从索引搜索结果
        /// </summary>
        public void SearchGoodsIndex(string key)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            BooleanQuery bQuery = new BooleanQuery();
            string product_name = string.Empty;
            //string content = string.Empty;
            if (!string.IsNullOrEmpty(key))
            {
                product_name = GetKeyWordsSplitBySpace(key);
                QueryParser parse = new QueryParser("product_name", PanGuAnalyzer);
                Query query = parse.Parse(product_name);
                parse.SetDefaultOperator(QueryParser.Operator.AND);
                bQuery.Add(query, BooleanClause.Occur.MUST);
                dic.Add("product_name", key);
            }
            if (bQuery != null && bQuery.GetClauses().Length > 0)
            {
                GetGoodsSearchResult(bQuery, dic);
            }
        }

        /// <summary>
        /// 获取
        /// </summary>
        /// <param name="bQuery"></param>
        private void GetGoodsSearchResult(BooleanQuery bQuery, Dictionary<string, string> dicKeywords)
        {
            IndexSearcher search = new IndexSearcher(ProductIndexDic, true);
            Stopwatch stopwatch = Stopwatch.StartNew();
            //SortField构造函数第三个字段true为降序,false为升序
            Sort sort = new Sort(new SortField("product_time", SortField.DOC, true));
            TopDocs docs = search.Search(bQuery, (Filter)null, PageSize * PageIndex, sort);
            stopwatch.Stop();
            if (docs != null && docs.totalHits > 0)
            {
                long lSearchTime = stopwatch.ElapsedMilliseconds;
                //txtPageFoot = GetPageFoot(PageIndex, PageSize, docs.totalHits, "sabrosus");
                for (int i = 0; i < docs.totalHits; i++)
                {
                    if (i >= (PageIndex - 1) * PageSize && i < PageIndex * PageSize)
                    {
                        Document doc = search.Doc(docs.scoreDocs[i].doc);
                        product model = new product()
                        {
                            product_name = doc.Get("product_name").ToString(),
                            product_time = Convert.ToDateTime(doc.Get("product_time").ToString())
                        };
                        plist.Add(SetGoodsHighlighter(dicKeywords, model));
                    }
                }
            }
        }

        /// <summary>
        /// 设置关键字高亮
        /// </summary>
        /// <param name="dicKeywords">关键字列表</param>
        /// <param name="model">返回的数据模型</param>
        /// <returns></returns>
        private product SetGoodsHighlighter(Dictionary<string, string> dicKeywords, product model)
        {
            SimpleHTMLFormatter simpleHTMLFormatter = new PanGu.HighLight.SimpleHTMLFormatter("<font color=\"#C60\">", "</font>");
            Highlighter highlighter = new PanGu.HighLight.Highlighter(simpleHTMLFormatter, new Segment());
            highlighter.FragmentSize = 50;
            string strTitle = string.Empty;
            string strContent = string.Empty;
            dicKeywords.TryGetValue("product_name", out strTitle);
            //dicKeywords.TryGetValue("product_detail", out strContent);
            if (!string.IsNullOrEmpty(strTitle)) model.product_name = highlighter.GetBestFragment(strTitle, model.product_name);
            return model;
        }

        #endregion 

        #region pageinfo 参数

        private int _PageSize;

        public int PageSize
        {
            get { return _PageSize; }
            set { _PageSize = value; }
        }
        private int _PageIndex;

        public int PageIndex
        {
            get { return _PageIndex; }
            set { _PageIndex = value; }
        }
        
        #endregion



    }

}
