package ru.rgrabelnikov.javafood.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.entity.Views;
import ru.rgrabelnikov.javafood.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping("/admin")
  @JsonView(Views.User.class)
  public List<User> getDishes() { return userService.getUsers(); }

  @PutMapping
  @JsonView(Views.User.class)
  public User updateUser(@RequestBody User user) {
    return userService.updateUser(user);
  }

  @PutMapping("/password")
  @JsonView(Views.User.class)
  public User updateUserPassword(@RequestBody User user) {
    return userService.updateUserPassword(user);
  }

  @PutMapping("/admin/role")
  @JsonView(Views.User.class)
  public User updateUserRole(@RequestBody User user) {
    return userService.updateUserRole(user);
  }

  @DeleteMapping
  public boolean deleteUser(@RequestBody String login) {
    return userService.deleteUser(login);
  }
}
