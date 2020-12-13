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

  @PutMapping("/admin")
  public CompanyInfo updateCompanyInfo(@RequestBody CompanyInfo companyInfo) {
    return companyInfoService.updateCompanyInfo(companyInfo);
  }
}
