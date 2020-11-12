package ru.rgrabelnikov.javafood.config.jwt;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtProvider {
  private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(JwtProvider.class.getName());

  @Value("$(jwt.secret)")
  private String jwtSecret;

  public String generateToken(String login) {
    Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(ZoneId.systemDefault()).toInstant());
    return Jwts.builder()
        .setSubject(login)
        .setExpiration(date)
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
      return true;
    } catch (ExpiredJwtException ex) {
      log.severe("Token expired");
    } catch (UnsupportedJwtException ex) {
      log.severe("Unsupported jwt");
    } catch (MalformedJwtException ex) {
      log.severe("Malformed jwt");
    } catch (Exception ex) {
      log.severe("invalid token");
    }
    return false;
  }

  public String getLoginFromToken(String token) {
    Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
    return claims.getSubject();
  }
}
