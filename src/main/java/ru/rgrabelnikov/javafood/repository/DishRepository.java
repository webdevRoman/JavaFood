package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.Dish;

public interface DishRepository extends JpaRepository<Dish, Long> {

}
