package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

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
  @JsonFormat(pattern="dd.MM.yyyy HH:mm")
  private LocalDateTime deliveryTime;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Basket getBasket() { return basket; }
  public void setBasket(Basket basket) { this.basket = basket; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public LocalDateTime getDeliveryTime() { return deliveryTime; }
  public void setDeliveryTime(LocalDateTime deliveryTime) { this.deliveryTime = deliveryTime; }

  public Order() {}
  public Order(Basket basket, String address, LocalDateTime deliveryTime) {
    this.basket = basket;
    this.address = address;
    this.deliveryTime = deliveryTime;
  }
}
