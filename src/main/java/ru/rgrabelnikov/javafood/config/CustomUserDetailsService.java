package ru.rgrabelnikov.javafood.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.service.UserService;

import javax.transaction.Transactional;

@Component
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private UserService userService;

  @Transactional
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userService.findByLogin(username);
    return CustomUserDetails.userToCustomUserDetails(user);
  }
}
