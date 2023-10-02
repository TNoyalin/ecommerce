import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductRelatedService } from 'src/app/service/product-related.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  Products: any;
  productDetail: any;
  constructor(private productRelatedService: ProductRelatedService, private router: Router) { }
  ngOnInit() {
    console.log("Viewpage");
    this.productRelatedService.getAllProduct({}).subscribe((res: any) => {
      this.Products = res
    })
  }
  updateProduct(value: any) {
    this.router.navigate(['edit']);
    sessionStorage.setItem("needToEdit", JSON.stringify(value));
  }
  deleteProduct(id: number) {
    alert('Are you sure want to delete?');
    this.productRelatedService.deleteProduct(id).subscribe((res: any) => {
      console.log("Deleted record" ,res)
    })
    alert('Product Deleted Successfully');
    window.location.reload();
  }
  searchProduct(id: String) {
    this.productRelatedService.searchProduct(id).subscribe((res: any) => {
      console.log("Searched record ",res)
      if (res == null) {
        alert('Invalid Product ID')
      }
      else {
        sessionStorage.setItem("productDetail", JSON.stringify(res));
        this.router.navigate(['Product']);
      }
    })


  }






}
