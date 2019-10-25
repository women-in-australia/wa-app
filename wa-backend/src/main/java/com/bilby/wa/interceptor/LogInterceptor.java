package com.bilby.wa.interceptor;

import com.bilby.wa.pojo.SysLog;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * Logger for all HTTP requests
 */
public class LogInterceptor implements HandlerInterceptor {

    private final Logger logger = LoggerFactory.getLogger(LogInterceptor.class);

    public LogInterceptor() {

    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        /* Instantiate a Log object */
        SysLog sysLog = new SysLog();
        String param = new Gson().toJson(request.getParameterMap());
        sysLog.setParams(param);
        sysLog.setMethod(request.getMethod());
        sysLog.setUrl(request.getRequestURI());
        sysLog.setRemoteAddress(request.getRemoteAddr());
        sysLog.setTime(new Date());
        if (!sysLog.getUrl().contains("/error")) {
            logger.info(sysLog.toString());
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) throws Exception {

    }
}
