package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "dish_type", schema = "public")
public class DishType {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "dish_type_id_seq")
  private Long id;
  @Column
  private String name;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public DishType() {}
  public DishType(String name) {
    this.name = name;
  }
}
