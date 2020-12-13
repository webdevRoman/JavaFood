package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.entity.CompanyInfo;
import ru.rgrabelnikov.javafood.entity.Dish;
import ru.rgrabelnikov.javafood.repository.CompanyInfoRepository;

@Service
public class CompanyInfoService {
  @Autowired
  private CompanyInfoRepository companyInfoRepository;

  public CompanyInfo getCompanyInfo() {
    return companyInfoRepository.findById((long) 1).orElse(null);
  }

  public CompanyInfo updateCompanyInfo(CompanyInfo companyInfo) {
    CompanyInfo companyInfoFromDb = companyInfoRepository.findById(1L).orElse(null);
    if (companyInfoFromDb != null) {
      BeanUtils.copyProperties(companyInfo, companyInfoFromDb, "id");
      return companyInfoRepository.save(companyInfoFromDb);
    }
    return null;
  }
}
