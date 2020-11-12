package ru.rgrabelnikov.javafood.entity;

import javax.persistence.*;

@Entity
@Table(name = "role", schema = "public")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "roles_id_seq")
  private Long id;
  @Column
  private String name;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
}
