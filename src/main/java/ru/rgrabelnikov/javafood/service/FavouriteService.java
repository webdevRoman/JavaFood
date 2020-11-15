package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.entity.Favourite;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.repository.DishRepository;
import ru.rgrabelnikov.javafood.repository.FavouriteRepository;
import ru.rgrabelnikov.javafood.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavouriteService {
  @Autowired
  private FavouriteRepository favouriteRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private DishRepository dishRepository;

  public List<Dish> getFavourites(String userLogin) {
    User userFromDb = userRepository.findByLogin(userLogin);
    List<Favourite> favourites = favouriteRepository.findAllByUser(userFromDb);
    List<Dish> dishes = favourites.stream().map(f -> f.getDish()).collect(Collectors.toList());
    dishes.forEach(d -> d.setDishTypeName(d.getDishType().getName()));
    return dishes;
  }

  public boolean saveFavourite(String userLogin, Long dishId) {
    User userFromDb = userRepository.findByLogin(userLogin);
    Dish dishFromDb = dishRepository.findById(dishId).orElse(null);
    if (userFromDb != null && dishFromDb != null) {
      Favourite favouriteFromDb = favouriteRepository.findByUserAndDish(userFromDb, dishFromDb);
      if (favouriteFromDb == null) {
        userFromDb.setRoleName(userFromDb.getRole().getName().equals("ROLE_USER") ? "user" : "admin");
        dishFromDb.setDishTypeName(dishFromDb.getDishType().getName());
        Favourite favourite = favouriteRepository.save(new Favourite(userFromDb, dishFromDb));
        return true;
      }
    }
    return false;
  }

  public boolean deleteFavourite(String userLogin, Long dishId) {
    User userFromDb = userRepository.findByLogin(userLogin);
    Dish dishFromDb = dishRepository.findById(dishId).orElse(null);
    if (userFromDb != null && dishFromDb != null && favouriteRepository.findByUserAndDish(userFromDb, dishFromDb) != null) {
      favouriteRepository.deleteByUserIdAndDishId(userFromDb.getId(), dishFromDb.getId());
      return true;
    }
    return false;
  }
}
