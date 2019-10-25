package com.bilby.wa.pojo;

public class TokenResponse {
    private String token;
    private ResponseUser user;

    public TokenResponse(String token, ResponseUser user) {
        this.token = token;
        this.user = user;
    }
}
