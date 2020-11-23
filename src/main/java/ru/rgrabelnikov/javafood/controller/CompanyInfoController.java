package ru.rgrabelnikov.javafood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javafood.entity.CompanyInfo;
import ru.rgrabelnikov.javafood.service.CompanyInfoService;

@RestController
@RequestMapping("api/company")
public class CompanyInfoController {
  @Autowired
  private CompanyInfoService companyInfoService;

  @GetMapping
  public CompanyInfo getCompanyInfo() {
    return companyInfoService.getCompanyInfo();
  }

  @PutMapping("/admin/description")
  public boolean updateDescription(@RequestBody String description) {
    return companyInfoService.updateDescription(description);
  }

  @PutMapping("/admin/phone")
  public boolean updatePhone(@RequestBody String phone) {
    return companyInfoService.updatePhone(phone);
  }

  @PutMapping("/admin/email")
  public boolean updateEmail(@RequestBody String email) {
    return companyInfoService.updateEmail(email);
  }

  @PutMapping("/admin/address")
  public boolean updateAddress(@RequestBody String address) {
    return companyInfoService.updateAddress(address);
  }
}
