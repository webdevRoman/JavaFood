package ru.rgrabelnikov.javafood.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.rgrabelnikov.javafood.config.jwt.JwtProvider;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.entity.Views;
import ru.rgrabelnikov.javafood.service.UserService;

@RestController
@RequestMapping("api/auth")
public class AuthController {
  @Autowired
  private UserService userService;
  @Autowired
  private JwtProvider jwtProvider;

  @PostMapping("/register")
  @JsonView(Views.User.class)
  public User registerUser(@RequestBody User user) { return userService.saveUser(user); }

  @PostMapping("/login")
  @JsonView(Views.User.class)
  public User auth(@RequestBody User user) {
    User userFromDb = userService.findByLoginAndPassword(user.getLogin(), user.getPassword());
    if (userFromDb != null) {
      userFromDb.setToken(jwtProvider.generateToken(userFromDb.getLogin()));
      return userFromDb;
    }
    return null;
  }
}
