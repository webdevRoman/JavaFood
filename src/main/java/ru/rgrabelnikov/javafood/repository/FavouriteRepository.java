package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.entity.Favourite;
import ru.rgrabelnikov.javafood.entity.User;

import javax.transaction.Transactional;
import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
  List<Favourite> findAllByUser(User user);
  Favourite findByUserAndDish(User user, Dish dish);
  @Modifying
  @Transactional
  @Query(value = "delete from favourite where user_id = :userId and dish_id = :dishId", nativeQuery = true)
  void deleteByUserIdAndDishId(@Param("userId") Long userId, @Param("dishId") Long dishId);
}
