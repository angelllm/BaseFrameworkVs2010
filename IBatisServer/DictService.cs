

using System;
using System.Collections.Generic;
using System.Text;
using llm.Model;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Configuration.Statements;
using IBatisNet.DataMapper.MappedStatements;
using IBatisNet.DataMapper.Scope;
using System.Data;
using IBatisNet.Common;

namespace IBatisServer
{
    public class dictService : BaseService
    {

        public dictService()
        {

        }

        public void Update(dict dict)
        {
            SqlMap.Update("dict.Update", dict);
        }

        public void Delete(dict dict)
        {
            SqlMap.Delete("dict.Delete", dict);
        }
        public void Add2(dict dict)
        {
            SqlMap.Insert("dict.Add2", dict);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();

        }
        public int Add(dict dict)
        {
            int Id = (int)SqlMap.Insert("dict.Add", dict);
            SqlMap.BeginTransaction();
            SqlMap.CommitTransaction();
            return Id;
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

            RequestScope request = statement.Sql.GetRequestScope(paramObject, session);
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

        public IList<dict> GetModelList()
        {
            IList<dict> list = SqlMap.QueryForList<dict>("dict.GetModelList", null);
            return list;
        }
        public IList<dict> GetModelList(string strWhere)
        {
            //string sql = SqlMap.GetMappedStatement("GetModelListWhere").Statement.Sql.ToString();
            IList<dict> list = SqlMap.QueryForList<dict>("dict.GetModelListWhere", strWhere);

            return list;
        }
        public dict GetModelById(int dict_id)
        {
            dict dict = SqlMap.QueryForObject<dict>("dict.GetModelById", dict_id);
            return dict;
        }

        public dict GetModelByGuid(string dict_guid)
        {
            dict dict = SqlMap.QueryForObject<dict>("dict.GetModelByGuid", dict_guid);
            return dict;
        }
        

    }
}




