using System;
using System.Collections.Generic;
using System.Text;

/// <summary>
/// 构造分页后的SQL语句
/// </summary>
public static class PagingHelper
{
    /// <summary>
    /// 获取分页SQL语句，排序字段需要构成唯一记录
    /// </summary>
    /// <param name="recordCount">记录总数</param>
    /// <param name="pageSize">每页记录数</param>
    /// <param name="pageNum">当前页数</param>
    /// <param name="safeSql">SQL查询语句</param>
    /// <param name="orderField">排序字段，多个则用“,”隔开</param>
    /// <returns>分页SQL语句</returns>
    public static string CreatePagingSql(int recordCount, int pageSize, int pageNum, string safeSql, string orderField)
    {
        //重新组合排序字段，防止有错误
        string[] arrStrOrders = orderField.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        StringBuilder sbOriginalOrder = new StringBuilder(); //原排序字段
        StringBuilder sbReverseOrder = new StringBuilder(); //与原排序字段相反，用于分页
        for (int i = 0; i < arrStrOrders.Length; i++)
        {
            arrStrOrders[i] = arrStrOrders[i].Trim();  //去除前后空格
            if (i != 0)
            {
                sbOriginalOrder.Append(", ");
                sbReverseOrder.Append(", ");
            }
            sbOriginalOrder.Append(arrStrOrders[i]);

            int index = arrStrOrders[i].IndexOf(" "); //判断是否有升降标识
            if (index > 0)
            {
                //替换升降标识，分页所需
                bool flag = arrStrOrders[i].IndexOf(" DESC", StringComparison.OrdinalIgnoreCase) != -1;
                sbReverseOrder.AppendFormat("{0} {1}", arrStrOrders[i].Remove(index), flag ? "ASC" : "DESC");
            }
            else
            {
                sbReverseOrder.AppendFormat("{0} DESC", arrStrOrders[i]);
            }
        }

        //计算总页数
        pageSize = pageSize == 0 ? recordCount : pageSize;
        int pageCount = (recordCount + pageSize - 1) / pageSize;

        //检查当前页数
        if (pageNum < 1)
        {
            pageNum = 1;
        }
        else if (pageNum > pageCount)
        {
            pageNum = pageCount;
        }

        StringBuilder sbSql = new StringBuilder();
        //第一页时，直接使用TOP n，而不进行分页查询
        if (pageNum == 1)
        {
            sbSql.AppendFormat(" SELECT TOP {0} * ", pageSize);
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }
        //最后一页时，减少一个TOP n 
        else if (pageNum == pageCount)
        {
            sbSql.Append(" SELECT * FROM ");
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} * ", recordCount - pageSize * (pageNum - 1));
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbReverseOrder.ToString());
            sbSql.Append(" ) AS T ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }
        //前半页数时的分页
        else if (pageNum < (pageCount / 2 + pageCount % 2))
        {
            sbSql.Append(" SELECT * FROM ");
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} * FROM ", pageSize);
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} * ", pageSize * pageNum);
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
            sbSql.Append(" )  ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbReverseOrder.ToString());
            sbSql.Append(" ) AS T ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }
        //后半页数时的分页
        else
        {
            sbSql.AppendFormat(" SELECT TOP {0} * FROM ", pageSize);
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} * ", ((recordCount - pageSize * (pageCount - 1)) + pageSize * (pageCount - pageNum)));
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbReverseOrder.ToString());
            sbSql.Append(" ) AS T ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }

        return sbSql.ToString();
    }

    /// <summary>
    /// 获取分页SQL语句，排序字段需要构成唯一记录
    /// </summary>
    /// <param name="recordCount">记录总数</param>
    /// <param name="pageSize">每页记录数</param>
    /// <param name="pageNum">当前页数</param>
    /// <param name="safeSql">SQL查询语句</param>
    /// <param name="orderField">排序字段，多个则用“,”隔开</param>
    /// <returns>分页SQL语句</returns>
    public static string CreatePagingSql(int recordCount, int pageSize, int pageNum, string safeSql, string orderField, string column)
    {
        //重新组合排序字段，防止有错误
        string[] arrStrOrders = orderField.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        StringBuilder sbOriginalOrder = new StringBuilder(); //原排序字段
        StringBuilder sbReverseOrder = new StringBuilder(); //与原排序字段相反，用于分页
        for (int i = 0; i < arrStrOrders.Length; i++)
        {
            arrStrOrders[i] = arrStrOrders[i].Trim();  //去除前后空格
            if (i != 0)
            {
                sbOriginalOrder.Append(", ");
                sbReverseOrder.Append(", ");
            }
            sbOriginalOrder.Append(arrStrOrders[i]);

            int index = arrStrOrders[i].IndexOf(" "); //判断是否有升降标识
            if (index > 0)
            {
                //替换升降标识，分页所需
                bool flag = arrStrOrders[i].IndexOf(" DESC", StringComparison.OrdinalIgnoreCase) != -1;
                sbReverseOrder.AppendFormat("{0} {1}", arrStrOrders[i].Remove(index), flag ? "ASC" : "DESC");
            }
            else
            {
                sbReverseOrder.AppendFormat("{0} DESC", arrStrOrders[i]);
            }
        }

        //计算总页数
        pageSize = pageSize == 0 ? recordCount : pageSize;
        int pageCount = (recordCount + pageSize - 1) / pageSize;

        //检查当前页数
        if (pageNum < 1)
        {
            pageNum = 1;
        }
        else if (pageNum > pageCount)
        {
            pageNum = pageCount;
        }

        StringBuilder sbSql = new StringBuilder();
        //第一页时，直接使用TOP n，而不进行分页查询
        if (pageNum == 1)
        {
            sbSql.AppendFormat(" SELECT TOP {0} {1} ", pageSize, column);
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }
        //最后一页时，减少一个TOP n 
        else if (pageNum == pageCount)
        {
            sbSql.Append(" SELECT * FROM ");
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} {1} ", recordCount - pageSize * (pageNum - 1), column);
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbReverseOrder.ToString());
            sbSql.Append(" ) AS T ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }
        //前半页数时的分页
        else if (pageNum < (pageCount / 2 + pageCount % 2))
        {
            sbSql.Append(" SELECT * FROM ");
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} * FROM ", pageSize);
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} {1} ", pageSize * pageNum, column);
            sbSql.AppendFormat(" FROM {0} ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
            sbSql.Append(" ) as tt  ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbReverseOrder.ToString());
            sbSql.Append(" ) AS T ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }
        //后半页数时的分页
        else
        {
            sbSql.AppendFormat(" SELECT TOP {0} * FROM ", pageSize);
            sbSql.Append(" ( ");
            sbSql.AppendFormat(" SELECT TOP {0} {1} ", ((recordCount - pageSize * (pageCount - 1)) + pageSize * (pageCount - pageNum)), column);
            sbSql.AppendFormat(" FROM {0}  ", safeSql);
            sbSql.AppendFormat(" ORDER BY {0} ", sbReverseOrder.ToString());
            sbSql.Append(" ) AS T ");
            sbSql.AppendFormat(" ORDER BY {0} ", sbOriginalOrder.ToString());
        }

        return sbSql.ToString();
    }
    /// <summary>
    /// 获取记录总数SQL语句
    /// </summary>
    /// <param name="n">限定记录数</param>
    /// <param name="safeSql">SQL查询语句</param>
    /// <returns>记录总数SQL语句</returns>
    public static string CreateTopnSql(int n, string safeSql)
    {
        return string.Format(" SELECT TOP {0} * FROM ({1}) AS T ", n, safeSql);
    }
    /// <summary>
    /// 获取记录总数SQL语句
    /// </summary>
    /// <param name="n">限定记录数</param>
    /// <param name="safeSql">SQL查询语句</param>
    /// <returns>记录总数SQL语句</returns>
    public static string CreateTopnSql(int n, string safeSql,string cloum)
    {
        return string.Format(" SELECT TOP {0} {2} FROM ({1}) AS T ", n, safeSql, cloum);
    }
    /// <summary>
    /// 获取记录总数SQL语句
    /// </summary>
    /// <param name="safeSql">SQL查询语句</param>
    /// <returns>记录总数SQL语句</returns>
    public static string CreateCountingSql(string safeSql)
    {
        return string.Format(" SELECT COUNT(1) AS RecordCount FROM {0} ", safeSql);
    }

      /// <summary>
    /// 获取记录总数SQL语句
    /// </summary>
    /// <param name="safeSql">SQL查询语句</param>
    /// <returns>记录总数SQL语句</returns>
    public static string CreateJoinCountingSql(string safeSql)
    {
        return string.Format(" SELECT COUNT(1) AS RecordCount FROM (SELECT * FROM {0}) AS T ", safeSql);
    }
 
}