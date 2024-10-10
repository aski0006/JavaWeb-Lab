package com.asaki0019.weblab;

import com.alibaba.fastjson.JSONObject;
import com.asaki0019.weblab.database.InitDatabase;
import com.asaki0019.weblab.database.RegisterToTable;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "RegisterServlet", value = "/register-servlet")
public class RegisterServlet extends HttpServlet {
    private final RegisterToTable registerToTable = new RegisterToTable();

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        boolean success;
        String message;

        String nickname = request.getParameter("nickname");
        String account = request.getParameter("username");
        String password = request.getParameter("password");

        PrintWriter out = response.getWriter();

        if (account == null || account.isEmpty() || password == null || password.isEmpty()) {
            success = false;
            message = "Please enter a username and password";
        } else {
            // 调用 RegisterToTable 类的 register 方法
            success = registerToTable.register(nickname, account, password);
            if (success) {
                message = "Register successful!";
            } else {
                message = "Username already exists or registration failed";
            }
        }

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("success", success);
        jsonResponse.put("message", message);
        jsonResponse.put("username",nickname);

        // 返回 JSON 响应
        out.print(jsonResponse);
        out.flush();
    }
}