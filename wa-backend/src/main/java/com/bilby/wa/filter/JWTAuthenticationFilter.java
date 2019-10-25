package com.bilby.wa.filter;

import com.bilby.wa.common.JwtTokenUtils;
import com.bilby.wa.pojo.*;
import com.google.gson.Gson;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

/**
 * Filter that implements authentication
 */
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        super.setFilterProcessesUrl("/auth/login");
    }

    /**
     * Before authentication
     * @param request user request
     * @param response user response
     * @return Authentication
     * @throws AuthenticationException error in authentication process
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        /* Request method has to be POST */
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        /* Instantiate a LoginUser object and send it to authenticationManager */
        LoginUser loginUser = new LoginUser(request.getParameter("email"), request.getParameter("password"));
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword())
        );
    }

    /**
     * Successfully authenticated
     * @param request user request
     * @param response user response
     * @param chain filter chain
     * @param authResult authentication result
     * @throws IOException exception
     * @throws ServletException exception
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        /* In our case the principal is a object of JwtUser, which implemented UserDetails  */
        JwtUser jwtUser = (JwtUser) authResult.getPrincipal();

        String role = "";
        Collection<? extends GrantedAuthority> authorities = jwtUser.getAuthorities();
        /* User role */
        for (GrantedAuthority authority : authorities) {
            role = authority.getAuthority();
        }

        /* Create a token for this user and send back as the HTTP response */
        String token = JwtTokenUtils.createToken(jwtUser.getUsername(), role, false);
        TokenResponse tokenResponse = new TokenResponse(token, new ResponseUser(jwtUser.getUid(), jwtUser.getUsername(), role, jwtUser.getName()));

        response.getWriter().write(new Gson().toJson(ResponseInfo.buildSuccess(tokenResponse)));
    }

    /**
     * Unsuccessfully authenticated
     * @param request user request
     * @param response user response
     * @param failed exception
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        int code;
        String msg;

        if (failed == null || failed.getMessage() == null) {
            code = 1001;
            msg = "Wrong username or password";
        } else if (failed.getMessage().equalsIgnoreCase("User is disabled")) {
            code = 1002;
            msg = "User have not been verified yet";
        } else if (failed.getMessage().equalsIgnoreCase("Bad credentials")
                || failed.getMessage().equalsIgnoreCase("User not found")) {
            code = 1001;
            msg = "Wrong username or password";
        } else {
            code = 1000;
            msg = failed.getMessage();
        }
        response.getWriter().write(new Gson().toJson(ResponseInfo.buildFailure(code, msg)));
    }

}

