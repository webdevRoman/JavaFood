package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(name = "basket_dish", schema = "public")
public class BasketDish {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "basket_dish_id_seq")
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "basket_id")
  private Basket basket;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "dish_id")
  @JsonView(Views.BasketDish.class)
  private Dish dish;
  @Column
  @JsonView(Views.BasketDish.class)
  private Integer amount;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Basket getBasket() { return basket; }
  public void setBasket(Basket basket) { this.basket = basket; }
  public Dish getDish() { return dish; }
  public void setDish(Dish dish) { this.dish = dish; }
  public Integer getAmount() { return amount; }
  public void setAmount(Integer amount) { this.amount = amount; }

  public BasketDish() {}
  public BasketDish(Basket basket, Dish dish, Integer amount) {
    this.basket = basket;
    this.dish = dish;
    this.amount = amount;
  }
}
