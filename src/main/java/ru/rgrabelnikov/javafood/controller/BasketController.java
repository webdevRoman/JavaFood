package ru.rgrabelnikov.javafood.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javafood.entity.BasketDish;
import ru.rgrabelnikov.javafood.entity.BasketRequest;
import ru.rgrabelnikov.javafood.entity.Views;
import ru.rgrabelnikov.javafood.service.BasketService;

import java.util.List;

@RestController
@RequestMapping("api/basket")
public class BasketController {
  @Autowired
  private BasketService basketService;

  @GetMapping
  @JsonView(Views.BasketDish.class)
  public List<BasketDish> getBasket(@RequestBody String userLogin) {
    return basketService.getBasket(userLogin);
  }

  @PostMapping
  public boolean createBasket(@RequestBody BasketRequest basketRequest) {
    return basketService.createBasketAndAddDish(basketRequest);
  }

  @PutMapping("/add")
  public boolean addDish(@RequestBody BasketRequest basketRequest) {
    return basketService.addDish(basketRequest);
  }

  @PutMapping("/amount")
  public boolean changeDishAmount(@RequestBody BasketRequest basketRequest) {
    return basketService.changeDishAmount(basketRequest);
  }

  @DeleteMapping("/dish")
  public boolean deleteDish(@RequestBody BasketRequest basketRequest) {
    return basketService.deleteDish(basketRequest);
  }

  @DeleteMapping("/basket")
  public boolean deleteBasket(@RequestBody String userLogin) {
    return basketService.deleteBasket(userLogin);
  }
}
