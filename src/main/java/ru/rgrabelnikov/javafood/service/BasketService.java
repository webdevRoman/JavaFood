package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.entity.*;
import ru.rgrabelnikov.javafood.repository.BasketDishRepository;
import ru.rgrabelnikov.javafood.repository.BasketRepository;
import ru.rgrabelnikov.javafood.repository.DishRepository;
import ru.rgrabelnikov.javafood.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BasketService {
  @Autowired
  private BasketRepository basketRepository;
  @Autowired
  private BasketDishRepository basketDishRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private DishRepository dishRepository;

  public List<BasketDish> getBasket(String userLogin) {
    User userFromDb = userRepository.findByLogin(userLogin);
    if (userFromDb != null) {
      Basket basketFromDb = basketRepository.findByUserAndUnordered(userFromDb.getId(), true);
      if (basketFromDb != null) {
        return basketDishRepository.findAllByBasket(basketFromDb).stream().map(basketDish -> {
          Dish dish = basketDish.getDish();
          dish.setDishTypeName(dish.getDishType().getName());
          basketDish.setDish(dish);
          return basketDish;
        }).collect(Collectors.toList());
      }
    }
    return null;
  }

  public boolean createBasketAndAddDish(BasketRequest basketRequest) {
    User userFromDb = userRepository.findByLogin(basketRequest.getUserLogin());
    Dish dishFromDb = dishRepository.findById(basketRequest.getDishId()).orElse(null);
    if (userFromDb != null && dishFromDb != null) {
      Basket basketFromDb = basketRepository.findByUserAndUnordered(userFromDb.getId(), true);
      if (basketFromDb == null) {
        Basket newBasket = basketRepository.save(new Basket(userFromDb, true));
        if (newBasket != null)
          return basketDishRepository.save(new BasketDish(newBasket, dishFromDb, basketRequest.getAmount())) != null ? true : false;
      }
    }
    return false;
  }

  public boolean addDish(BasketRequest basketRequest) {
    User userFromDb = userRepository.findByLogin(basketRequest.getUserLogin());
    Dish dishFromDb = dishRepository.findById(basketRequest.getDishId()).orElse(null);
    if (userFromDb != null && dishFromDb != null) {
      Basket basketFromDb = basketRepository.findByUserAndUnordered(userFromDb.getId(), true);
      if (basketFromDb != null)
        return basketDishRepository.save(new BasketDish(basketFromDb, dishFromDb, basketRequest.getAmount())) != null ? true : false;
    }
    return false;
  }

  public boolean changeDishAmount(BasketRequest basketRequest) {
    User userFromDb = userRepository.findByLogin(basketRequest.getUserLogin());
    Dish dishFromDb = dishRepository.findById(basketRequest.getDishId()).orElse(null);
    if (userFromDb != null && dishFromDb != null) {
      Basket basketFromDb = basketRepository.findByUserAndUnordered(userFromDb.getId(), true);
      if (basketFromDb != null) {
        BasketDish basketDishFromDb = basketDishRepository.findByBasketAndDish(basketFromDb, dishFromDb);
        if (basketDishFromDb != null) {
          basketDishFromDb.setAmount(basketRequest.getAmount());
          return basketDishRepository.save(basketDishFromDb) != null ? true : false;
        }
      }
    }
    return false;
  }

  public boolean deleteDish(BasketRequest basketRequest) {
    User userFromDb = userRepository.findByLogin(basketRequest.getUserLogin());
    Dish dishFromDb = dishRepository.findById(basketRequest.getDishId()).orElse(null);
    if (userFromDb != null && dishFromDb != null) {
      Basket basketFromDb = basketRepository.findByUserAndUnordered(userFromDb.getId(), true);
      if (basketFromDb != null) {
        BasketDish basketDishFromDb = basketDishRepository.findByBasketAndDish(basketFromDb, dishFromDb);
        if (basketDishFromDb != null) {
          basketDishRepository.deleteById(basketDishFromDb.getId());
//          basketDishRepository.delete(basketDishFromDb);
          return true;
        }
      }
    }
    return false;
  }

  public boolean deleteBasket(String userLogin) {
    User userFromDb = userRepository.findByLogin(userLogin);
    if (userFromDb != null) {
      Basket basketFromDb = basketRepository.findByUserAndUnordered(userFromDb.getId(), true);
      if (basketFromDb != null) {
        basketDishRepository.deleteAllByBasketId(basketFromDb.getId());
        basketRepository.deleteById(basketFromDb.getId());
        return true;
      }
    }
    return false;
  }
}
