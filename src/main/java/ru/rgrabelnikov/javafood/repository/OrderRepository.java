package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
