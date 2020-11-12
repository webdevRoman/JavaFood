package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.BasketDish;

public interface BasketDishRepository extends JpaRepository<BasketDish, Long> {
}
