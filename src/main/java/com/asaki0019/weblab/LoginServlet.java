package com.asaki0019.weblab;

import com.alibaba.fastjson.JSONObject;
import com.asaki0019.weblab.database.InitDatabase;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "LoginServlet", value = "/login-servlet")
public class LoginServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(LoginServlet.class);

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        boolean success = false;
        String message;
        String username = null;

        String account = request.getParameter("username");
        String password = request.getParameter("password");

        PrintWriter out = response.getWriter();

        if (account == null || account.isEmpty() || password == null || password.isEmpty()) {
            message = "Please enter a username and password";
        } else {
            success = authenticateUser(account, password);
            if (success) {
                username = InitDatabase.getUsernameByAccount(account);
                message = "Login successful";
            } else {
                message = "Login failed";
            }
        }

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("success", success);
        jsonResponse.put("message", message);
        jsonResponse.put("username", username);

        // 返回 JSON 响应
        out.print(jsonResponse);
        out.flush();
    }

    private boolean authenticateUser(String account, String password) {
        String sql = "SELECT COUNT(*) FROM users WHERE accounts = ? AND password = ?";

        try (Connection con = InitDatabase.getConnection();
             PreparedStatement params = con.prepareStatement(sql)) {

            params.setString(1, account);
            params.setString(2, password);
            ResultSet rs = params.executeQuery();

            if (rs.next()) {
                int count = rs.getInt(1);
                return count > 0;
            }
        } catch (SQLException e) {
            logger.error("Failed to authenticate user", e);
        }
        return false;
    }
}