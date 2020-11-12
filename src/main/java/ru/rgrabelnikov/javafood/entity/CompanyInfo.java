package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "company_info", schema = "public")
public class CompanyInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "company_info_id_seq")
  private Long id;
  @Column
  private String description;
  @Column
  private String phone;
  @Column
  private String email;
  @Column
  private String address;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }

  public CompanyInfo() {}
  public CompanyInfo(String description, String phone, String email, String address) {
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}
