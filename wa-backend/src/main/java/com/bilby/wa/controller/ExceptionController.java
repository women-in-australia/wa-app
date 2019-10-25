package com.bilby.wa.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Yangzhe Xie
 * @date 2019-08-26
 */
@RestController
public class ExceptionController {

    @Resource
    private HttpServletRequest request;

    /**
     * Rethrow a exception from filters or interceptors
     * @throws Exception exception
     */
    @RequestMapping("/error/rethrow")
    public void rethrow() throws Exception {
        throw (Exception) request.getAttribute("Exception");
    }
}
