package ru.rgrabelnikov.javafood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.rgrabelnikov.javafood.entity.CompanyInfo;

public interface CompanyInfoRepository extends JpaRepository<CompanyInfo, Long> {
  
}
