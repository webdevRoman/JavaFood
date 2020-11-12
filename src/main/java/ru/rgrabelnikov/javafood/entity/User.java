package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(name = "user", schema = "public")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "users_id_seq")
  @JsonView(Views.Auth.class)
  private Long id;
  @Column
  @JsonView(Views.Auth.class)
  private String login;
  @Column
  private String password;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "role_id")
  private Role role;
  @Column(name = "first_name")
  @JsonView(Views.Auth.class)
  private String firstName;
  @Column(name = "last_name")
  @JsonView(Views.Auth.class)
  private String lastName;
  @Column(name = "mid_name")
  @JsonView(Views.Auth.class)
  private String midName;
  @Column
  @JsonView(Views.Auth.class)
  private String phone;
  @Transient
  @JsonView(Views.Auth.class)
  private String token;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getLogin() { return login; }
  public void setLogin(String login) { this.login = login; }
  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
  public Role getRole() { return role; }
  public void setRole(Role role) { this.role = role; }
  public String getFirstName() { return firstName; }
  public void setFirstName(String firstName) { this.firstName = firstName; }
  public String getLastName() { return lastName; }
  public void setLastName(String lastName) { this.lastName = lastName; }
  public String getMidName() { return midName; }
  public void setMidName(String midName) { this.midName = midName; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getToken() { return token; }
  public void setToken(String token) { this.token = token; }

  public User() {}
  public User(String login, String password, Role role, String firstName, String lastName, String midName, String phone) {
    this.login = login;
    this.password = password;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.midName = midName;
    this.phone = phone;
  }
}
