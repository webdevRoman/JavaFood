package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javafood.entity.Basket;

import javax.transaction.Transactional;

public interface BasketRepository extends JpaRepository<Basket, Long> {
  @Query(value = "select * from basket where user_id = :userId and is_unordered = :isUnordered", nativeQuery = true)
  Basket findByUserAndUnordered(@Param("userId") Long userId, @Param("isUnordered") boolean isUnordered);
  @Modifying
  @Transactional
  @Query(value = "delete from basket where id = :basketId", nativeQuery = true)
  void deleteById(@Param("basketId") Long basketId);
}
