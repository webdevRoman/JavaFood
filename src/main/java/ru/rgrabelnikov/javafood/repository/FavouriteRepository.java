package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.Favourite;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {

}
