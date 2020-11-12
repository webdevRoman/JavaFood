package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "favourite", schema = "public")
public class Favourite {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "favourite_id_seq")
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id")
  private User user;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "dish_id")
  private Dish dish;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }
  public Dish getDish() { return dish; }
  public void setDish(Dish dish) { this.dish = dish; }

  public Favourite() {}
  public Favourite(User user, Dish dish) {
    this.user = user;
    this.dish = dish;
  }
}
