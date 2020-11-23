package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.entity.*;
import ru.rgrabelnikov.javafood.repository.BasketDishRepository;
import ru.rgrabelnikov.javafood.repository.BasketRepository;
import ru.rgrabelnikov.javafood.repository.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
  @Autowired
  private OrderRepository orderRepository;
  @Autowired
  private BasketRepository basketRepository;
  @Autowired
  private BasketDishRepository basketDishRepository;

  public boolean createOrder(OrderRequest orderRequest) {
    Basket basketFromDb = basketRepository.findById(orderRequest.getBasketId()).orElse(null);
    if (basketFromDb != null) {
      Order newOrder = orderRepository.save(new Order(basketFromDb, orderRequest.getAddress(), orderRequest.getDeliveryTime()));
      if (newOrder != null) {
        basketFromDb.setUnordered(false);
        basketRepository.save(basketFromDb);
        return true;
      }
    }
    return false;
  }

  public boolean deleteOrder(long orderId) {
    Order orderFromDb = orderRepository.findById(orderId).orElse(null);
    if (orderFromDb != null) {
      Basket basketFromDb = basketRepository.findById(orderFromDb.getBasket().getId()).orElse(null);
      if (basketFromDb != null) {
        basketDishRepository.deleteAllByBasketId(basketFromDb.getId());
        orderRepository.deleteById(orderFromDb.getId());
        basketRepository.deleteById(basketFromDb.getId());
        return true;
      }
    }
    return false;
  }
}
