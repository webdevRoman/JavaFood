package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class OrderRequest {
  private long basketId;
  private String address;
  @JsonFormat(pattern="dd.MM.yyyy HH:mm")
  private LocalDateTime deliveryTime;

  public long getBasketId() { return basketId; }
  public void setBasketId(long basketId) { this.basketId = basketId; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public LocalDateTime getDeliveryTime() { return deliveryTime; }
  public void setDeliveryTime(LocalDateTime deliveryTime) { this.deliveryTime = deliveryTime; }

  public OrderRequest() {}
  public OrderRequest(long basketId, String address, LocalDateTime deliveryTime) {
    this.basketId = basketId;
    this.address = address;
    this.deliveryTime = deliveryTime;
  }
}
