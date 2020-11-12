package ru.rgrabelnikov.javafood.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(name = "dish", schema = "public")
public class Dish {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "dish_id_seq")
  @JsonView(Views.Dish.class)
  private Long id;
  @Column
  @JsonView(Views.Dish.class)
  private String name;
  @Column
  @JsonView(Views.Dish.class)
  private int weight;
  @Column
  @JsonView(Views.Dish.class)
  private String description;
  @Column(name = "image_address")
  @JsonView(Views.Dish.class)
  private String imageAddress;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "dish_type_id")
  private DishType dishType;
  @Column
  @JsonView(Views.Dish.class)
  private int price;
  @Transient
  @JsonView(Views.Dish.class)
  private String dishTypeName;

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
  public int getPrice() { return price; }
  public void setPrice(int price) { this.price = price; }
  public String getDishTypeName() { return dishTypeName; }
  public void setDishTypeName(String dishTypeName) { this.dishTypeName = dishTypeName; }

  public Dish() {}
  public Dish(String name, int weight, String description, String imageAddress, DishType dishType, int price) {
    this.name = name;
    this.weight = weight;
    this.description = description;
    this.imageAddress = imageAddress;
    this.dishType = dishType;
    this.price = price;
  }
}
