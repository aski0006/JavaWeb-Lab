package com.asaki0019.weblab.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RegisterToTable {
    private static final Logger logger = LoggerFactory.getLogger(RegisterToTable.class);

    public boolean register(String nickname, String account, String password) {
        // 检查用户名是否已经存在
        if (isUsernameExists(account)) {
            logger.warn("Username already exists: {}", account);
            return false;
        }

        String sql = "INSERT INTO users (nickname, accounts, password, avatar_url) VALUES (?, ?, ?, ?)";

        try (Connection con = InitDatabase.getConnection();
             PreparedStatement params = con.prepareStatement(sql)) {

            params.setString(1, nickname);
            params.setString(2, account);
            params.setString(3, password);
            params.setString(4, ""); // 假设 avatar_url 默认为空字符串

            params.executeUpdate();
            return true;
        } catch (SQLException e) {
            logger.error("Failed to register user", e);
            return false;
        }
    }

    private boolean isUsernameExists(String account) {
        String sql = "SELECT COUNT(*) FROM users WHERE accounts = ?";

        try (Connection con = InitDatabase.getConnection();
             PreparedStatement params = con.prepareStatement(sql)) {

            params.setString(1, account);
            ResultSet rs = params.executeQuery();

            if (rs.next()) {
                int count = rs.getInt(1);
                return count > 0;
            }
        } catch (SQLException e) {
            logger.error("Failed to check if username exists", e);
        }
        return false;
    }
}