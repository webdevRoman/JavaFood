package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "basket", schema = "public")
public class Basket {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "basket_id_seq")
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id")
  private User user;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }

  public Basket() {}
  public Basket(User user) {
    this.user = user;
  }
}
