

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;
using IBatisNet.Common;
using System.Data;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Configuration.Statements;
using IBatisNet.DataMapper.MappedStatements;
using IBatisNet.DataMapper.Scope;


namespace IBatisServer
{
    public class SysTypeService : BaseService
    {

        public SysTypeService()
        {

        }


        public IList<sys_type> GetlListWithArticleTypeListCount(string strWhere)
        {
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetlListWithArticleTypeListCount", strWhere);
            return list;
        }

        public IList<sys_type> GetlListWithArticleCount(string strWhere)
        {
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetlListWithArticleCount", strWhere);
            return list;
        }

        public IList<sys_type> GetModelListByPageUseTop(int pagesize, int pageindex, string strwhere)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            dict.Add("strwhere", strwhere);
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelListByPageUseTop", dict);

            return list;
        }
        public sys_type GetTotalCountAndNewCount(string strWhere)
        {
            sys_type sys_type = SqlMap.QueryForObject<sys_type>("sys_type.GetTotalCountAndNewCount", strWhere);
            return sys_type;
        }
        public void Update(sys_type type)
        {
            SqlMap.Update("sys_type.Update", type);
        }

        public void Delete(sys_type type)
        {
            SqlMap.Delete("sys_type.Delete", type);
        }
        public void Add2(sys_type type)
        {
            SqlMap.Insert("sys_type.Add2", type);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(sys_type type)
        {
            int Id = (int)SqlMap.Insert("sys_type.Add", type);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
        }

        public IList<sys_type> GetModelList()
        {
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelList", null);
            return list;
        }
        public IList<sys_type> GetModelListWithPhotoWhere(string strWhere)
        {
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelListWithPhotoWhere", strWhere);
            return list;
        }
        

        private IDbCommand GetDbCommand(string statementName, object paramObject)
        {
            IStatement statement = sqlMap.GetMappedStatement(statementName).Statement;
            IMappedStatement mapStatement = sqlMap.GetMappedStatement(statementName);
            IDalSession session = new SqlMapSession(sqlMap);

            if (sqlMap.LocalSession != null) 
                session = sqlMap.LocalSession; 
            else 
                session = sqlMap.OpenConnection(); 

            RequestScope request = statement.Sql.GetRequestScope( paramObject, session);
            mapStatement.PreparedCommand.Create(request, session, statement, paramObject);

            return request.IDbCommand;

        }

        public System.Data.DataTable GetListWhere(string statementName, object paramObject)
        {
            DataSet ds = new DataSet();
            bool isSessionLocal = false;
            IDalSession session = sqlMap.LocalSession;
            if (session == null)
            {
                session = new SqlMapSession(sqlMap);
                session.OpenConnection();
                isSessionLocal = true;
            }

            IDbCommand cmd = GetDbCommand(statementName, paramObject);
            cmd.Connection = session.Connection;
            IDbDataAdapter adapter = session.CreateDataAdapter(cmd);
            adapter.Fill(ds);

            if (isSessionLocal) 
                session.CloseConnection(); 

            return ds.Tables[0];

        }
        
      
        public IList<sys_type> GetModelList(string strWhere)
        {
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelListWhere", strWhere);
            return list;
        }
        public IList<sys_type> GetModelList2(string strWhere)
        {
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelList2", strWhere);
            return list;
        }
        
        public sys_type GetModelById(int type_id)
        {
            sys_type type = SqlMap.QueryForObject<sys_type>("sys_type.GetModelById", type_id);
            return type;
        }

        public IList<sys_type> GetModelListByPage(int pagesize, int pageindex)
        {
            Dictionary<string, int> dict = new Dictionary<string, int>();
            dict.Add("pagesize", pagesize);
            dict.Add("pageindex", pageindex);
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelListByPage", dict);
            return list;
        }
        public IList<sys_type> GetModelListByPage(string sql)
        { 
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelListByPage2", sql);
            return list;
        }
        public int GetPageinfoCount(string sql)
        {
            return (int)SqlMap.QueryForObject("sys_type.GetPageinfoCount", sql); 
        }
        public IList<sys_type> GetModelListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by T." + orderby);
            }
            else
            {
                strSql.Append("order by T.type_id desc");
            }
            strSql.Append(")AS Row, T.*  from sys_type T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);

            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetModelListByPage", strSql.ToString());
            return list;
        }

        public int GetCount()
        {
            return (int)SqlMap.QueryForObject("sys_type.GetCount", null);
        }
        public IList<sys_type> GetListByPage(int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetListByPage", dict);
            return list;
        }
        public IList<sys_type> GetListByPage(string andwhere ,int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("andwhere", andwhere);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetListByPage", dict);
            return list;
        }

        public IList<sys_type> GetListByPage(string andwhere, string wherename, int startIndex, int endIndex)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("andwhere", andwhere);
            dict.Add("wherename", wherename);
            dict.Add("startindex", startIndex + "");
            dict.Add("endindex", endIndex + "");
            IList<sys_type> list = SqlMap.QueryForList<sys_type>("sys_type.GetListByPage", dict); 
            return list;
        }
    }
}




