package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javafood.entity.User;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByLogin(String login);

  @Modifying
  @Transactional
  @Query(value = "delete from user where login = :login", nativeQuery = true)
  void deleteByLogin(@Param("login") String login);
}
