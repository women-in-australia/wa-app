package com.bilby.wa.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.MultipartConfigElement;

/**
 * @author Yangzhe Xie
 * @date 2019-08-26
 */
@Configuration
public class UploadConfig {
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory config = new MultipartConfigFactory();
        config.setMaxFileSize("40MB");
        config.setMaxRequestSize("40MB");
        return config.createMultipartConfig();
    }

}
