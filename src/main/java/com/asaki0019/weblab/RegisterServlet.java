package com.asaki0019.weblab;

import com.alibaba.fastjson.JSONObject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "RegisterServlet", value = "/register-servlet")
public class RegisterServlet extends HttpServlet {
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
            throws IOException {
        response.setContentType("application/json");

        boolean success; // 这里可以替换为实际的注册逻辑
        String message;

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        PrintWriter out = response.getWriter();

        if (username == null || username.isEmpty() ||
                password == null || password.isEmpty()) {
            success = false;
            message = "please enter a username and password";
        }else {
            // TODO: 这里可以添加数据库存储的逻辑，伪代码如下:
            // success = userService.registerUser(username, hashPassword(password), email);
            // 这是假设你有一个 userService 来处理数据库操作

            // 假设注册总是成功
            success = true;
            message = "register successful！";
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("success", success);
        jsonResponse.put("message", message);

        // 返回 JSON 响应
        out.print(jsonResponse);
        out.flush();
    }
}
