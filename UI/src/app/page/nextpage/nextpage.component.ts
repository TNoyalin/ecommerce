import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductRelatedService } from 'src/app/service/product-related.service';

@Component({
  selector: 'app-nextpage',
  templateUrl: './nextpage.component.html',
  styleUrls: ['./nextpage.component.css']
})
export class NextpageComponent {
  allProduct: any = sessionStorage.getItem("allData");
  ProductsArray: any = [];
  Products: any;
  pageArray: any = [];
  howManyPage: any;
  pro: any;
  constructor(private router: Router, private productRelatedService: ProductRelatedService, private _sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.ProductsArray = sessionStorage.getItem("curretPageDetails");
    this.ProductsArray = JSON.parse(this.ProductsArray);
    console.log("Details", this.ProductsArray);
    this.pageArray = sessionStorage.getItem("pageArray");
    this.pageArray = JSON.parse(this.pageArray);
    this.pro = [];
    for (let i = 0; i < this.ProductsArray.length; i++) {
      try {
        const imageUrl = 'data:image/png;base64,' + this.ProductsArray[i].imageByte;
        const safeImageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
        this.pro.push(safeImageUrl);
      } catch (error) {
        console.error("Error converting data URL for product", i, ":", error);
        this.pro.push('path_to_placeholder_image.jpg');
      }
    }
  }

  showFullDetails(value: any) {
    this.router.navigate(['Product'])
    sessionStorage.setItem("productDeatails", JSON.stringify(value));
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
      else{
        curretPageDetails.push(allProduct[i]);
      }   
    }
    if (value === 1) {
      this.router.navigate(['home'])
    }
    else {
      sessionStorage.setItem("curretPageDetails", JSON.stringify(curretPageDetails));
      this.router.navigate(['nextPage']);
      window.location.reload();
    }
  }
}
