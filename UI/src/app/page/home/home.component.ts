import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductRelatedService } from 'src/app/service/product-related.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allProduct: any = sessionStorage.getItem("allData");
  [x: string]: any;
  Products: any;
  pro: any;
  howManyPage: any;
  pageArray: any = []
  ProductsArray: any = [];
  pageData: any = []
  constructor(private productRelatedService: ProductRelatedService, private router: Router, private httpClient: HttpClient, private _sanitizer: DomSanitizer) { }
  ngOnInit() {
    console.log("HomePage");
    this.productRelatedService.getAllProduct({}).subscribe((res: any) => {
      this.Products = res;
      sessionStorage.setItem("allData", JSON.stringify(this.Products))
      this.pro = [];
      for (let i = 0; i < this.Products.length; i++) {
        try {
          const imageUrl = 'data:image/png;base64,' + this.Products[i].imageByte;
          const safeImageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
          this.pro.push(safeImageUrl);
        } catch (error) {
          console.error("Error converting data URL for product", i, ":", error);
          this.pro.push('path_to_placeholder_image.jpg');
        }
      }
      this.howManyPage = this.Products.length / 3;
      let j = 0;
      for (let i = 1; i <= Math.ceil(this.howManyPage); i++) {
        let examplArray = {
          pageNumber: i,
          idNeedToBeStart: j
        }
        this.pageArray.push(i);
        this.pageData.push(examplArray);
        j = j + 3;
      }
      sessionStorage.setItem("pageArray", JSON.stringify(this.pageArray))
      sessionStorage.setItem("pageData", JSON.stringify(this.pageData))
      for (let i = 0; i < 3; i++) {
        this.ProductsArray.push(this.Products[i]);
      }
      sessionStorage.setItem("lastIdWeUse", "2");
    });
  }
  showFullDetails(value: any) {
    window.location.reload();
    this.router.navigate(['Product'])
    sessionStorage.setItem("productDetail", JSON.stringify(value));
  }

  nextPage(value: any) {
    let allProduct: any = sessionStorage.getItem("allData");
    allProduct = JSON.parse(allProduct);
    let pageData: any = sessionStorage.getItem("pageData");
    let curretPageDetails = [];
    pageData = JSON.parse(pageData)
    for (let i = pageData[value - 1].idNeedToBeStart; i < pageData[value - 1].idNeedToBeStart + 3; i++) {
      if (allProduct[i] == null) {
        break;
      }
      else {
        curretPageDetails.push(allProduct[i]);
      }
    }
    if (value === 1) {
    }
    else {
      sessionStorage.setItem("curretPageDetails", JSON.stringify(curretPageDetails));
      this.router.navigate(['nextPage']);
    }
  }
}