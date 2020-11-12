package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "dish", schema = "public")
public class Dish {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "dish_id_seq")
  private Long id;
  @Column
  private String name;
  @Column
  private int weight;
  @Column
  private String description;
  @Column(name = "image_address")
  private String imageAddress;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "dish_type_id")
  private DishType dishType;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public int getWeight() { return weight; }
  public void setWeight(int weight) { this.weight = weight; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getImageAddress() { return imageAddress; }
  public void setImageAddress(String imageAddress) { this.imageAddress = imageAddress; }
  public DishType getDishType() { return dishType; }
  public void setDishType(DishType dishType) { this.dishType = dishType; }

  public Dish() {}
  public Dish(String name, int weight, String description, String imageAddress, DishType dishType) {
    this.name = name;
    this.weight = weight;
    this.description = description;
    this.imageAddress = imageAddress;
    this.dishType = dishType;
  }
}
