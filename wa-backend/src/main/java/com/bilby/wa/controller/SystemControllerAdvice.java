package com.bilby.wa.controller;

import com.bilby.wa.exception.UploadException;
import com.bilby.wa.pojo.ResponseInfo;
import io.jsonwebtoken.JwtException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Exception handler
 */
@ControllerAdvice
public class SystemControllerAdvice {

    @ResponseBody
    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public ResponseInfo parameterError(MissingServletRequestParameterException e) {
        return ResponseInfo.buildFailure(1006, e.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public ResponseInfo methodErrorHandler(HttpRequestMethodNotSupportedException e) {
        return ResponseInfo.buildFailure(1004, e.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity accessErrorHandler(AccessDeniedException e) {
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @ResponseBody
    @ExceptionHandler(value = DataAccessException.class)
    public ResponseInfo databaseErrorHandler(DataAccessException e) {
        e.printStackTrace();
        return ResponseInfo.buildFailure(1005, "Database error");
    }

    @ResponseBody
    @ExceptionHandler(value = UploadException.class)
    public ResponseEntity uploadErrorHandler(UploadException e) {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ResponseBody
    @ExceptionHandler(value = AuthenticationException.class)
    public ResponseInfo authMethodErrorHandler(AuthenticationException e) {
        return ResponseInfo.buildFailure(1004, e.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public ResponseInfo errorHandler(Exception e) {
        e.printStackTrace();
        return ResponseInfo.buildFailure(1000, "Unknown error");
    }

    @ResponseBody
    @ExceptionHandler(value = JwtException.class)
    public ResponseEntity errorTokenHandler(JwtException e) {
        return new ResponseEntity("Token expired", HttpStatus.UNAUTHORIZED);
    }
}
