package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.Basket;

public interface BasketRepository extends JpaRepository<Basket, Long> {
  
}
