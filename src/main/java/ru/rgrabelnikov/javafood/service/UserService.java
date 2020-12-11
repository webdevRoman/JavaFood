package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.config.jwt.JwtProvider;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.entity.Role;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.repository.RoleRepository;
import ru.rgrabelnikov.javafood.repository.UserRepository;

import java.util.List;

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

  public List<User> getUsers() {
    List<User> users = userRepository.findAll();
    users.forEach(user -> user.setRoleName(user.getRole().getName().equals("ROLE_USER") ? "user" : "admin"));
    return users;
  }

  public User saveUser(User user) {
    User userFromDb = findByLogin(user.getLogin());
    if (userFromDb == null) {
      Role userRole = roleRepository.findByName("ROLE_USER");
      user.setRole(userRole);
      user.setRoleName("user");
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setToken(jwtProvider.generateToken(user.getLogin()));
      return userRepository.save(user);
    }
    return null;
  }

  public User findByLogin(String login) {
    return userRepository.findByLogin(login);
  }

  public User findByLoginAndPassword(String login, String password) {
    User user = findByLogin(login);
    if (user != null)
      if (passwordEncoder.matches(password, user.getPassword())) {
        user.setRoleName(user.getRole().getName().equals("ROLE_USER") ? "user" : "admin");
        return user;
      }
    return null;
  }

  public User updateUser(User user) {
    User userFromDb;
    if (user.getOldLogin() != null)
      userFromDb = findByLogin(user.getOldLogin());
    else
      userFromDb = findByLogin(user.getLogin());
    if (userFromDb != null) {
      BeanUtils.copyProperties(user, userFromDb, "id", "password", "role");
      userFromDb.setRoleName(userFromDb.getRole().getName().equals("ROLE_USER") ? "user" : "admin");
      return userRepository.save(userFromDb);
    }
    return null;
  }

  public User updateUserPassword(User user) {
    User userFromDb = findByLoginAndPassword(user.getLogin(), user.getOldPassword());
    if (userFromDb != null) {
      userFromDb.setPassword(passwordEncoder.encode(user.getPassword()));
      userFromDb.setRoleName(userFromDb.getRole().getName().equals("ROLE_USER") ? "user" : "admin");
      return userRepository.save(userFromDb);
    }
    return null;
  }

  public User updateUserRole(User user) {
    User userFromDb = findByLogin(user.getLogin());
    if (userFromDb != null) {
      Role userRole = roleRepository.findByName(user.getRoleName().equals("user") ? "ROLE_USER" : "ROLE_ADMIN");
      userFromDb.setRole(userRole);
      userFromDb.setRoleName(user.getRoleName());
      return userRepository.save(userFromDb);
    }
    return null;
  }

  public boolean deleteUser(String login) {
    User userFromDb = findByLogin(login);
    if (userFromDb != null) {
      userRepository.deleteByLogin(login);
      return true;
    }
    return false;
  }
}
