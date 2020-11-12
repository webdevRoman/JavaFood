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
@RequestMapping("api/")
public class AuthController {
  @Autowired
  private UserService userService;
  @Autowired
  private JwtProvider jwtProvider;

  @PostMapping("register")
  @JsonView(Views.Auth.class)
  public User registerUser(@RequestBody User user) { return userService.saveUser(user); }
  @PostMapping("login")
  @JsonView(Views.Auth.class)
  public User auth(@RequestBody User user) {
    User userFromDb = userService.fingByLoginAndPassword(user.getLogin(), user.getPassword());
    userFromDb.setToken(jwtProvider.generateToken(userFromDb.getLogin()));
    return userFromDb;
  }

//  @PostMapping("register")
//  public String registerUser(@RequestBody RegistrationRequest registrationRequest) {
//    User u = new User();
//    u.setPassword(registrationRequest.getPassword());
//    u.setLogin(registrationRequest.getLogin());
//    u.setFirstName(registrationRequest.getFirstName());
//    u.setLastName(registrationRequest.getLastName());
//    u.setMidName(registrationRequest.getMidName());
//    userService.saveUser(u);
//    return "OK";
//  }
//
//  @PostMapping("login")
//  public AuthResponse auth(@RequestBody AuthRequest authRequest) {
//    User user = userService.fingByLoginAndPassword(authRequest.getLogin(), authRequest.getPassword());
//    String token = jwtProvider.generateToken(user.getLogin());
//    return new AuthResponse(token);
//  }

//  @PostMapping("test")
//  public String test(@RequestBody RegistrationRequest registrationRequest) {
//    String reqBody = "Request body: " + registrationRequest.getLogin() + " | " + registrationRequest.getPassword() + " | " +registrationRequest.getFirstName() + " | " +registrationRequest.getLastName() + " | " +registrationRequest.getMidName();
//    return reqBody;
//  }
}
