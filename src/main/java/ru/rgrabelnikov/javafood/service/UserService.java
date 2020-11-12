package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.config.jwt.JwtProvider;
import ru.rgrabelnikov.javafood.entity.Role;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.repository.RoleRepository;
import ru.rgrabelnikov.javafood.repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private JwtProvider jwtProvider;

  public User saveUser(User user) {
    Role userRole = roleRepository.findByName("ROLE_USER");
    user.setRole(userRole);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setToken(jwtProvider.generateToken(user.getLogin()));
    return userRepository.save(user);
  }

  public User findByLogin(String login) {
    return userRepository.findByLogin(login);
  }
  public User fingByLoginAndPassword(String login, String password) {
    User user = findByLogin(login);
    if (user != null)
      if (passwordEncoder.matches(password, user.getPassword()))
        return user;
    return null;
  }
}
