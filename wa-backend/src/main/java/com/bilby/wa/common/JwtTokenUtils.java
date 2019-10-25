package com.bilby.wa.common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;

/**
 * Utility to create JSON web token.
 */
public class JwtTokenUtils {
    public static final String TOKEN_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";

    private static final String SECRET = "women_in_australia";
    private static final String ISS = "nfaw";

    // key of role
    private static final String ROLE_CLAIMS = "rol";

    // 6 hours
    private static final long EXPIRATION = 21600L;

    // remember me - 7 days
    private static final long EXPIRATION_REMEMBER = 604800L;

    // create token
    public static String createToken(String username, String role, boolean isRememberMe) {
        long expiration = isRememberMe ? EXPIRATION_REMEMBER : EXPIRATION;
        HashMap<String, Object> map = new HashMap<>();
        map.put(ROLE_CLAIMS, role);
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .setClaims(map)
                .setIssuer(ISS)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .compact();
    }

    // get username from token
    public static String getUsername(String token) {
        return getTokenBody(token).getSubject();
    }

    // get role from token
    public static String getUserRole(String token) {
        return (String) getTokenBody(token).get(ROLE_CLAIMS);
    }

    public static boolean isExpiration(String token) {
        return getTokenBody(token).getExpiration().before(new Date());
    }

    private static Claims getTokenBody(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}
