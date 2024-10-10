package com.asaki0019.weblab.database;

import java.sql.*;

public class InitDatabase {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/user_info";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "root";

    public static Connection getConnection() throws SQLException {
        // 动态加载 MySQL JDBC 驱动
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // MySQL 8.x 的驱动类名
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found.", e);
        }

        // 返回数据库连接
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    public static String getUsernameByAccount(String account) {
        String sql = "SELECT nickname FROM users WHERE accounts = ?";

        try (Connection con = InitDatabase.getConnection();
             PreparedStatement params = con.prepareStatement(sql)) {

            params.setString(1, account);
            ResultSet rs = params.executeQuery();

            if (rs.next()) {
                return rs.getString("nickname");
            }
        } catch (SQLException ignored) {
        }
        return null;
    }
}