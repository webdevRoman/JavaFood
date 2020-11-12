//package ru.rgrabelnikov.javafood.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebMvc
//public class WebConfig implements WebMvcConfigurer {
//  @Override
//  public void addCorsMappings(CorsRegistry registry) {
//    registry.addMapping("/**")
//        .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS")
//        .allowedOrigins("http://localhost/3000")
//        .allowedHeaders("*")
//        .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
//        .allowCredentials(true);
//  }
//}
