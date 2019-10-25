package com.bilby.wa.filter;

import javax.servlet.*;
import java.io.IOException;
import java.util.Objects;

/**
 * @author Yangzhe Xie
 * @date 2019-08-26
 * Outermost filter to catch exception threw by other filters and re-throw it to the ControllerAdvice
 */
public class ExceptionFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        boolean isRethrow = !Objects.isNull(request.getAttribute("Exception"));
        /* Whether this exception has already been re-threw */
        if (isRethrow) {
            chain.doFilter(request, response);
            return;
        }
        try {
            chain.doFilter(request, response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            request.setAttribute("Exception", e);
            /* rethrow it to exception hander controller */
            request.getRequestDispatcher("/error/rethrow").forward(request, response);
        }
    }

    @Override
    public void destroy() {

    }
}
