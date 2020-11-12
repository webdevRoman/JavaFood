package ru.rgrabelnikov.javafood.config.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import ru.rgrabelnikov.javafood.config.CustomUserDetails;
import ru.rgrabelnikov.javafood.config.CustomUserDetailsService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static org.springframework.util.StringUtils.hasText;

@Component
public class JwtFilter extends GenericFilterBean {
  private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(JwtFilter.class.getName());
  public static final String AUTHORIZATION = "Authorization";

  @Autowired
  private JwtProvider jwtProvider;
  @Autowired
  private CustomUserDetailsService customUserDetailsService;

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//    HttpServletRequest req = (HttpServletRequest) request;
//    String requestURI = req.getRequestURI();
//    if (requestURI.startsWith("/api")) {
//      logger.info("do filter...");
//      String token = getTokenFromRequest((HttpServletRequest) request);
//      if (token != null && jwtProvider.validateToken(token)) {
//        String userLogin = jwtProvider.getLoginFromToken(token);
//        CustomUserDetails customUserDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(userLogin);
//        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
//        SecurityContextHolder.getContext().setAuthentication(auth);
//      }
//      chain.doFilter(request, response);
//      return;
//    }
//    if (requestURI.equals("/")) {
//      chain.doFilter(request, response);
//      return;
//    }
//    request.getRequestDispatcher("/").forward(request, response);

    logger.info("do filter...");
    String token = getTokenFromRequest((HttpServletRequest) request);
    if (token != null && jwtProvider.validateToken(token)) {
      String userLogin = jwtProvider.getLoginFromToken(token);
      CustomUserDetails customUserDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(userLogin);
      UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(auth);
    }
    chain.doFilter(request, response);
  }

  private String getTokenFromRequest(HttpServletRequest request) {
    String bearer = request.getHeader(AUTHORIZATION);
    if (hasText(bearer) && bearer.startsWith("Bearer ")) {
      return bearer.substring(7);
    }
    return null;
  }
}
