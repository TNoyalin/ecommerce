import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  constructor(private _sanitizer: DomSanitizer) { }
  productDetail: any;
  ngOnInit() {
    console.log("Single product full view page");   
    this.productDetail = sessionStorage.getItem("productDetail");   
    this.productDetail = JSON.parse(this.productDetail);
  }
}
