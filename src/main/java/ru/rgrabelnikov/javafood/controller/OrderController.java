package ru.rgrabelnikov.javafood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javafood.entity.OrderRequest;
import ru.rgrabelnikov.javafood.service.OrderService;

@RestController
@RequestMapping("api/order")
public class OrderController {
  @Autowired
  private OrderService orderService;

  @PostMapping
  public boolean createOrder(@RequestBody OrderRequest orderRequest) {
    return orderService.createOrder(orderRequest);
  }

  @DeleteMapping("/admin")
  public boolean deleteOrder(@RequestBody String orderId) {
    return orderService.deleteOrder(Long.parseLong(orderId));
  }
}
