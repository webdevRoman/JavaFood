package ru.rgrabelnikov.javafood.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.entity.Views;
import ru.rgrabelnikov.javafood.service.DishService;

import java.util.List;

@RestController
@RequestMapping("api/dish")
public class DishController {
  @Autowired
  private DishService dishService;

  @GetMapping
  @JsonView(Views.Dish.class)
  public List<Dish> getDishes() { return dishService.getDishes(); }

  @PostMapping("/admin")
  @JsonView(Views.Dish.class)
  public Dish addDish(@RequestBody Dish dish) { return dishService.saveDish(dish); }

  @PutMapping("/admin")
  @JsonView(Views.Dish.class)
  public Dish updateDish(@RequestBody Dish dish) {
    return dishService.updateDish(dish);
  }

  @PutMapping("/admin/type")
  @JsonView(Views.Dish.class)
  public Dish updateDishType(@RequestBody Dish dish) {
    return dishService.updateDishType(dish);
  }

  @DeleteMapping("/admin")
  public boolean deleteDish(@RequestBody String idStr) {
    return dishService.deleteDish(Long.parseLong(idStr));
  }
}
