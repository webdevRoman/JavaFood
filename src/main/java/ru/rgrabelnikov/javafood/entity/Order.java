package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "order", schema = "public")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "order_id_seq")
  private Long id;
  @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "basket_id")
  private Basket basket;
  @Column
  private String address;
  @Column(name = "delivery_time")
  private String deliveryTime;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Basket getBasket() { return basket; }
  public void setBasket(Basket basket) { this.basket = basket; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getDeliveryTime() { return deliveryTime; }
  public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }

  public Order() {}
  public Order(Basket basket, String address, String deliveryTime) {
    this.basket = basket;
    this.address = address;
    this.deliveryTime = deliveryTime;
  }
}
