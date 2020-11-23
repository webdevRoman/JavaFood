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
  @Column(name = "is_unordered")
  private boolean isUnordered;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }
  public boolean isUnordered() { return isUnordered; }
  public void setUnordered(boolean unordered) {isUnordered = unordered; }

  public Basket() {}
  public Basket(User user, boolean isUnordered) {
    this.user = user;
    this.isUnordered = isUnordered;
  }
}
