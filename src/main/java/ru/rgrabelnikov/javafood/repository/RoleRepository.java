package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByName(String name);
}
