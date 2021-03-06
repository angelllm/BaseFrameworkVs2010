﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using Maticsoft.DBUtility;

namespace llm.DBUtility
{
    public interface IBaseDB
    {
        //#region 公用方法
        ///// <summary>
        ///// 判断是否存在某表的某个字段
        ///// </summary>
        ///// <param name="tableName">表名称</param>
        ///// <param name="columnName">列名称</param>
        ///// <returns>是否存在</returns>
        //bool ColumnExists(string tableName, string columnName);
        //int GetMaxID(string FieldName, string TableName);
        //bool Exists(string strSql);
        ///// <summary>
        ///// 表是否存在
        ///// </summary>
        ///// <param name="TableName"></param>
        ///// <returns></returns>
        //bool TabExists(string TableName);
        //bool Exists(string strSql, params SqlParameter[] cmdParms);
        //#endregion

        //#region  执行简单SQL语句

        ///// <summary>
        ///// 执行SQL语句，返回影响的记录数
        ///// </summary>
        ///// <param name="SQLString">SQL语句</param>
        ///// <returns>影响的记录数</returns>
        //int ExecuteSql(string SQLString);

        //int ExecuteSqlByTime(string SQLString, int Times);

        ///// <summary>
        ///// 执行Sql和Oracle滴混合事务
        ///// </summary>
        ///// <param name="list">SQL命令行列表</param>
        ///// <param name="oracleCmdSqlList">Oracle命令行列表</param>
        ///// <returns>执行结果 0-由于SQL造成事务失败 -1 由于Oracle造成事务失败 1-整体事务执行成功</returns>
        //int ExecuteSqlTran(List<CommandInfo> list, List<CommandInfo> oracleCmdSqlList);
        ///// <summary>
        ///// 执行多条SQL语句，实现数据库事务。
        ///// </summary>
        ///// <param name="SQLStringList">多条SQL语句</param>		
        //int ExecuteSqlTran(List<String> SQLStringList);
        ///// <summary>
        ///// 执行带一个存储过程参数的的SQL语句。
        ///// </summary>
        ///// <param name="SQLString">SQL语句</param>
        ///// <param name="content">参数内容,比如一个字段是格式复杂的文章，有特殊符号，可以通过这个方式添加</param>
        ///// <returns>影响的记录数</returns>
        //int ExecuteSql(string SQLString, string content);
        ///// <summary>
        ///// 执行带一个存储过程参数的的SQL语句。
        ///// </summary>
        ///// <param name="SQLString">SQL语句</param>
        ///// <param name="content">参数内容,比如一个字段是格式复杂的文章，有特殊符号，可以通过这个方式添加</param>
        ///// <returns>影响的记录数</returns>
        //object ExecuteSqlGet(string SQLString, string content);
        ///// <summary>
        ///// 向数据库里插入图像格式的字段(和上面情况类似的另一种实例)
        ///// </summary>
        ///// <param name="strSQL">SQL语句</param>
        ///// <param name="fs">图像字节,数据库的字段类型为image的情况</param>
        ///// <returns>影响的记录数</returns>
        //int ExecuteSqlInsertImg(string strSQL, byte[] fs);

        ///// <summary>
        ///// 执行一条计算查询结果语句，返回查询结果（object）。
        ///// </summary>
        ///// <param name="SQLString">计算查询结果语句</param>
        ///// <returns>查询结果（object）</returns>
        //object GetSingle(string SQLString);
        //object GetSingle(string SQLString, int Times);
        ///// <summary>
        ///// 执行查询语句，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        ///// </summary>
        ///// <param name="strSQL">查询语句</param>
        ///// <returns>SqlDataReader</returns>
        //SqlDataReader ExecuteReader(string strSQL);
        ///// <summary>
        ///// 执行查询语句，返回DataSet
        ///// </summary>
        ///// <param name="SQLString">查询语句</param>
        ///// <returns>DataSet</returns>
        //DataSet Query(string SQLString);
        //DataSet Query(string SQLString, int Times);

        //#endregion

        //#region 执行带参数的SQL语句

        ///// <summary>
        ///// 执行SQL语句，返回影响的记录数
        ///// </summary>
        ///// <param name="SQLString">SQL语句</param>
        ///// <returns>影响的记录数</returns>
        //int ExecuteSql(string SQLString, params SqlParameter[] cmdParms);


        ///// <summary>
        ///// 执行多条SQL语句，实现数据库事务。
        ///// </summary>
        ///// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        //void ExecuteSqlTran(Hashtable SQLStringList);
        ///// <summary>
        ///// 执行多条SQL语句，实现数据库事务。
        ///// </summary>
        ///// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        //int ExecuteSqlTran(System.Collections.Generic.List<CommandInfo> cmdList);
        ///// <summary>
        ///// 执行多条SQL语句，实现数据库事务。
        ///// </summary>
        ///// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        //void ExecuteSqlTranWithIndentity(System.Collections.Generic.List<CommandInfo> SQLStringList);
        ///// <summary>
        ///// 执行多条SQL语句，实现数据库事务。
        ///// </summary>
        ///// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
        //void ExecuteSqlTranWithIndentity(Hashtable SQLStringList);
        ///// <summary>
        ///// 执行一条计算查询结果语句，返回查询结果（object）。
        ///// </summary>
        ///// <param name="SQLString">计算查询结果语句</param>
        ///// <returns>查询结果（object）</returns>
        //object GetSingle(string SQLString, params SqlParameter[] cmdParms);

        ///// <summary>
        ///// 执行查询语句，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        ///// </summary>
        ///// <param name="strSQL">查询语句</param>
        ///// <returns>SqlDataReader</returns>
        //SqlDataReader ExecuteReader(string SQLString, params SqlParameter[] cmdParms);

        ///// <summary>
        ///// 执行查询语句，返回DataSet
        ///// </summary>
        ///// <param name="SQLString">查询语句</param>
        ///// <returns>DataSet</returns>
        //DataSet Query(string SQLString, params SqlParameter[] cmdParms);

        //void PrepareCommand(SqlCommand cmd, SqlConnection conn, SqlTransaction trans, string cmdText, SqlParameter[] cmdParms);

        //#endregion

        //#region 存储过程操作

        ///// <summary>
        ///// 执行存储过程，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        ///// </summary>
        ///// <param name="storedProcName">存储过程名</param>
        ///// <param name="parameters">存储过程参数</param>
        ///// <returns>SqlDataReader</returns>
        //SqlDataReader RunProcedure(string storedProcName, IDataParameter[] parameters);


        ///// <summary>
        ///// 执行存储过程
        ///// </summary>
        ///// <param name="storedProcName">存储过程名</param>
        ///// <param name="parameters">存储过程参数</param>
        ///// <param name="tableName">DataSet结果中的表名</param>
        ///// <returns>DataSet</returns>
        //DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName);
        //DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName, int Times);

        ///// <summary>
        ///// 构建 SqlCommand 对象(用来返回一个结果集，而不是一个整数值)
        ///// </summary>
        ///// <param name="connection">数据库连接</param>
        ///// <param name="storedProcName">存储过程名</param>
        ///// <param name="parameters">存储过程参数</param>
        ///// <returns>SqlCommand</returns>
        //SqlCommand BuildQueryCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters);

        ///// <summary>
        ///// 执行存储过程，返回影响的行数		
        ///// </summary>
        ///// <param name="storedProcName">存储过程名</param>
        ///// <param name="parameters">存储过程参数</param>
        ///// <param name="rowsAffected">影响的行数</param>
        ///// <returns></returns>
        //int RunProcedure(string storedProcName, IDataParameter[] parameters, out int rowsAffected);
       

        ///// <summary>
        ///// 创建 SqlCommand 对象实例(用来返回一个整数值)	
        ///// </summary>
        ///// <param name="storedProcName">存储过程名</param>
        ///// <param name="parameters">存储过程参数</param>
        ///// <returns>SqlCommand 对象实例</returns>
        //SqlCommand BuildIntCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters);
        //#endregion

    }
}
