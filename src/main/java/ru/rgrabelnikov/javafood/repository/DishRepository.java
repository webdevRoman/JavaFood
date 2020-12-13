package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javafood.entity.Dish;

import javax.transaction.Transactional;
import java.util.Optional;

public interface DishRepository extends JpaRepository<Dish, Long> {
  Optional<Dish> findById(Long id);

  @Modifying
  @Transactional
  @Query(value = "delete from dish where id = :id", nativeQuery = true)
  void deleteById(@Param("id") Long id);
}
