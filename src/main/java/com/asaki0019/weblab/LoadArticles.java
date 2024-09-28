package com.asaki0019.weblab;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "LoadArticlesServlet", value = "/loadArticles-servlet")
public class LoadArticles extends HttpServlet {
    private String article = "Hello World";

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        List<String> articles = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            articles.add("<article><h3>" + i + "</h3><p>" + article + "</p></article>");
        }
        // 使用 for 循环添加文章
        for (String article : articles) {
            out.println(article);
        }
    }
}
