package ru.rgrabelnikov.javafood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.rgrabelnikov.javafood.entity.CompanyInfo;
import ru.rgrabelnikov.javafood.repository.CompanyInfoRepository;

@Service
public class CompanyInfoService {
  @Autowired
  private CompanyInfoRepository companyInfoRepository;

  public CompanyInfo getCompanyInfo() {
    return companyInfoRepository.findById((long) 1).orElse(null);
  }

  public boolean updateDescription(String description) {
    System.out.println(description);
    CompanyInfo infoFromDb = companyInfoRepository.findById((long) 1).orElse(null);
    if (infoFromDb != null) {
      infoFromDb.setDescription(description);
      System.out.println(infoFromDb.getDescription());
      companyInfoRepository.save(infoFromDb);
      return true;
    }
    return false;
  }

  public boolean updatePhone(String phone) {
    CompanyInfo infoFromDb = companyInfoRepository.findById((long) 1).orElse(null);
    if (infoFromDb != null) {
      infoFromDb.setPhone(phone);
      companyInfoRepository.save(infoFromDb);
      return true;
    }
    return false;
  }

  public boolean updateEmail(String email) {
    CompanyInfo infoFromDb = companyInfoRepository.findById((long) 1).orElse(null);
    if (infoFromDb != null) {
      infoFromDb.setEmail(email);
      companyInfoRepository.save(infoFromDb);
      return true;
    }
    return false;
  }

  public boolean updateAddress(String address) {
    CompanyInfo infoFromDb = companyInfoRepository.findById((long) 1).orElse(null);
    if (infoFromDb != null) {
      infoFromDb.setAddress(address);
      companyInfoRepository.save(infoFromDb);
      return true;
    }
    return false;
  }
}
