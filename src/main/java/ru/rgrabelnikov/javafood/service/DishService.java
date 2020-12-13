package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.entity.DishType;
import ru.rgrabelnikov.javafood.repository.DishRepository;
import ru.rgrabelnikov.javafood.repository.DishTypeRepository;

import java.io.*;
import java.util.List;

@Service
public class DishService {
  @Autowired
  private DishRepository dishRepository;
  @Autowired
  private DishTypeRepository dishTypeRepository;

  public List<Dish> getDishes() {
    List<Dish> dishes = dishRepository.findAll();
    dishes.forEach(dish -> dish.setDishTypeName(dish.getDishType().getName()));
    return dishes;
  }

  private Dish setDishType(Dish dish) {
    DishType dishType = dishTypeRepository.findByName(dish.getDishTypeName());
    if (dishType != null)
      dish.setDishType(dishType);
    else
      dish.setDishType(dishTypeRepository.save(new DishType(dish.getDishTypeName())));
    return dish;
  }

  public Dish saveDish(Dish dish) {
    dish.setDishTypeName(dish.getDishTypeName());
    dish = setDishType(dish);
    Dish dishFromDb = dishRepository.save(dish);
    if (dishFromDb != null && dish.isHasImage()) {
      dishFromDb.setImageAddress("img-dishes/" + dishFromDb.getId() + ".jpg");
      dishFromDb.setDishTypeName(dishFromDb.getDishType().getName());
      return dishRepository.save(dishFromDb);
    }
    return dishFromDb;
  }

  public Dish saveDishImg(MultipartFile file) {
    if (saveFile("src/main/resources/static/img-dishes/", file) &&
        saveFile("build/resources/main/static/img-dishes/", file)) {
      Dish dishFromDb = dishRepository
          .findById(Long.parseLong(file.getOriginalFilename().split("\\.")[0])).orElse(null);
      dishFromDb.setDishTypeName(dishFromDb.getDishType().getName());
      return dishFromDb;
    } else {
      return null;
    }
  }

  private boolean saveFile(String pathToDir, MultipartFile file) {
    InputStream inputStream = null;
    OutputStream outputStream = null;
    String fileName = file.getOriginalFilename();
    File newFile = new File(pathToDir + fileName);

    try {
      inputStream = file.getInputStream();

      if (!newFile.exists())
        newFile.createNewFile();
      outputStream = new FileOutputStream(newFile);
      int read = 0;
      byte[] bytes = new byte[1024];

      while ((read = inputStream.read(bytes)) != -1)
        outputStream.write(bytes, 0, read);

      inputStream.close();
      outputStream.close();

      return true;
    } catch (IOException e) {
      e.printStackTrace();
      return false;
    }
  }

  public Dish updateDish(Dish dish) {
    Dish dishFromDb = dishRepository.findById(dish.getId()).orElse(null);
    if (dishFromDb != null) {
      BeanUtils.copyProperties(dish, dishFromDb, "id", "dishType", "imageAddress");
      dishFromDb.setDishTypeName(dishFromDb.getDishType().getName());
      return dishRepository.save(dishFromDb);
    }
    return null;
  }

  public Dish updateDishType(Dish dish) {
    Dish dishFromDb = dishRepository.findById(dish.getId()).orElse(null);
    if (dishFromDb != null) {
      dishFromDb.setDishTypeName(dish.getDishTypeName());
      dishFromDb = setDishType(dishFromDb);
      return dishRepository.save(dishFromDb);
    }
    return null;
  }

  public boolean deleteDish(Long id) {
    Dish dishFromDb = dishRepository.findById(id).orElse(null);
    if (dishFromDb != null) {
      dishRepository.deleteById(dishFromDb.getId());
      return true;
    }
    return false;
  }
}
