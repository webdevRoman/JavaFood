package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class OrderRequest {
  private Long id;
  private String userLogin;
  private String address;
  private String phone;
  @JsonFormat(pattern="dd.MM.yyyy HH:mm")
  private LocalDateTime deliveryTime;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getUserLogin() { return userLogin; }
  public void setUserLogin(String userLogin) { this.userLogin = userLogin; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public LocalDateTime getDeliveryTime() { return deliveryTime; }
  public void setDeliveryTime(LocalDateTime deliveryTime) { this.deliveryTime = deliveryTime; }

  public OrderRequest() {}
  public OrderRequest(String userLogin, String address, LocalDateTime deliveryTime) {
    this.userLogin = userLogin;
    this.address = address;
    this.deliveryTime = deliveryTime;
  }
  public OrderRequest(Long id, String userLogin, String address, String phone, LocalDateTime deliveryTime) {
    this.id = id;
    this.userLogin = userLogin;
    this.address = address;
    this.phone = phone;
    this.deliveryTime = deliveryTime;
  }
}
