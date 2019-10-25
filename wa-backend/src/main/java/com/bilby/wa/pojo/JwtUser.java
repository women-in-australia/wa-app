package com.bilby.wa.pojo;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class JwtUser implements UserDetails {

    private Integer uid;
    private String email;
    private String password;
    private String name;
    private String address;
    private String motivation;
    private String experience;
    private String phone;

    private Collection<? extends GrantedAuthority> authorities;
    private boolean enabled;

    public JwtUser(Integer uid,
                   String email,
                   String password,
                   String name,
                   String address,
                   String motivation,
                   String experience,
                   Collection<? extends GrantedAuthority> authorities,
                   boolean enabled) {
        this.uid = uid;
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = address;
        this.motivation = motivation;
        this.experience = experience;
        this.authorities = authorities;
        this.enabled = enabled;
    }

    public JwtUser(User user) {
        this.uid = user.getUid();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.address = user.getAddress();
        this.motivation = user.getMotivation();
        this.experience = user.getExperience();
        this.authorities = Collections.singleton(new SimpleGrantedAuthority(user.getRole().getRoleName()));
        this.enabled = user.getEnabled() == 1;
        this.phone = user.getPhone();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Integer getUid() {
        return uid;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String getName() {
        return name;
    }
}
