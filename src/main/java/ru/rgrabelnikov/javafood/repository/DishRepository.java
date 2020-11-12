package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.Dish;

import java.util.Optional;

public interface DishRepository extends JpaRepository<Dish, Long> {
  Optional<Dish> findById(Long id);
}
