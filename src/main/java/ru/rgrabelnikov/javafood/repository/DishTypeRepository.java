package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.DishType;

public interface DishTypeRepository extends JpaRepository<DishType, Long> {

}
