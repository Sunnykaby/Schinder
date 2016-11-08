package com.kami.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by shidian on 2016/11/4.
 */
@Controller
@RequestMapping("/springMVC")
public class HelloController {
    @RequestMapping("/hello")
    public String hello(){
        System.out.println("This is hello!");
        return "message";
    }
    @RequestMapping("/login")
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response, String name){
        String temp = name;
        ModelAndView modelAndView = new ModelAndView("login","message",temp);
        return  modelAndView;
    }
}
