package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javafood.entity.Order;

import javax.transaction.Transactional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  @Modifying
  @Transactional
  @Query(value = "delete from \"order\" where id = :orderId", nativeQuery = true)
  void deleteById(@Param("orderId") Long orderId);
}
