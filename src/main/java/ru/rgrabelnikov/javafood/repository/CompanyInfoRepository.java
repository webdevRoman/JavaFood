package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.CompanyInfo;

import java.util.Optional;

public interface CompanyInfoRepository extends JpaRepository<CompanyInfo, Long> {
  Optional<CompanyInfo> findById(Long id);
}
