package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class OrderRequest {
  private String userLogin;
  private String address;
  @JsonFormat(pattern="dd.MM.yyyy HH:mm")
  private LocalDateTime deliveryTime;

  public String getUserLogin() { return userLogin; }
  public void setUserLogin(String userLogin) { this.userLogin = userLogin; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public LocalDateTime getDeliveryTime() { return deliveryTime; }
  public void setDeliveryTime(LocalDateTime deliveryTime) { this.deliveryTime = deliveryTime; }

  public OrderRequest() {}
  public OrderRequest(String userLogin, String address, LocalDateTime deliveryTime) {
    this.userLogin = userLogin;
    this.address = address;
    this.deliveryTime = deliveryTime;
  }
}
