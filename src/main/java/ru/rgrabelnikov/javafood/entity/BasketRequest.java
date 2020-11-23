package ru.rgrabelnikov.javafood.entity;

public class BasketRequest {
  private String userLogin;
  private long dishId;
  private int amount;

  public String getUserLogin() { return userLogin; }
  public void setUserLogin(String userLogin) { this.userLogin = userLogin; }
  public long getDishId() { return dishId; }
  public void setDishId(long dishId) { this.dishId = dishId; }
  public int getAmount() { return amount; }
  public void setAmount(int amount) { this.amount = amount; }

  public BasketRequest() {}
  public BasketRequest(String userLogin, int dishId, int amount) {
    this.userLogin = userLogin;
    this.dishId = dishId;
    this.amount = amount;
  }
}
