package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByLogin(String login);
}
