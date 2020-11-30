package ru.rgrabelnikov.javafood.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.entity.Favourite;
import ru.rgrabelnikov.javafood.entity.User;
import ru.rgrabelnikov.javafood.entity.Views;
import ru.rgrabelnikov.javafood.service.FavouriteService;

import java.util.List;

@RestController
@RequestMapping("api/favourite")
public class FavouriteController {
  @Autowired
  private FavouriteService favouriteService;

  @GetMapping
  @JsonView(Views.Dish.class)
  public List<Dish> getFavourites(@RequestParam String userLogin) {
    return favouriteService.getFavourites(userLogin);
  }

  @PostMapping
  public boolean addFavourite(@RequestBody Favourite favourite) {
    return favouriteService.saveFavourite(favourite.getUserLogin(), favourite.getDishId());
  }

  @DeleteMapping
  public boolean deleteFavourite(@RequestBody Favourite favourite) {
    return favouriteService.deleteFavourite(favourite.getUserLogin(), favourite.getDishId());
  }
}
