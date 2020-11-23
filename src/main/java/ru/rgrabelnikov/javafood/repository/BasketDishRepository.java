package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javafood.entity.Basket;
import ru.rgrabelnikov.javafood.entity.BasketDish;
import ru.rgrabelnikov.javafood.entity.Dish;

import javax.transaction.Transactional;
import java.util.List;

public interface BasketDishRepository extends JpaRepository<BasketDish, Long> {
  BasketDish findByBasketAndDish(Basket basket, Dish dish);
  List<BasketDish> findAllByBasket(Basket basket);
  @Modifying
  @Transactional
  @Query(value = "delete from basket_dish where id = :basketDishId", nativeQuery = true)
  void deleteById(@Param("basketDishId") Long basketDishId);
  @Modifying
  @Transactional
  @Query(value = "delete from basket_dish where basket_id = :basketId", nativeQuery = true)
  void deleteAllByBasketId(@Param("basketId") Long basketId);
}
