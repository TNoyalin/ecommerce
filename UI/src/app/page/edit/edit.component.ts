import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductRelatedService } from 'src/app/service/product-related.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  Products: any = sessionStorage.getItem("needToEdit");
  editProduct: FormGroup;
  editProductDetail: any;
  editProductData: any;
  selectedFile: any;
  constructor(private fromBuilder: FormBuilder, private productRelatedService: ProductRelatedService, private router: Router) {
    this.Products = JSON.parse(this.Products);
    this.editProduct = this.fromBuilder.group({
      "image": new FormControl('', [Validators.required]),
      "name": new FormControl(this.Products.first_name, [Validators.required]),
      "price": new FormControl(this.Products.first_name, [Validators.required]),
      "category": new FormControl(this.Products.first_name, [Validators.required]),
      "description": new FormControl(this.Products.first_name, [Validators.required]),
      "usage": new FormControl(this.Products.first_name, [Validators.required]),
    })
  }
  ngOnInit() {
    this.editProductDetail = sessionStorage.getItem("needToEdit");
    this.editProductData = JSON.parse(this.editProductDetail);
    this.editProduct.patchValue({
      id: this.editProductData.id,
      name: this.editProductData.name,
      price: this.editProductData.price,
      category: this.editProductData.category,
      description: this.editProductData.description,
      usage: this.editProductData.directions
    });

  }
  // For update
  submit() {
    if (!this.editProduct.value.name) {
      alert('Please provide a product name.');
      return;
    }
    else if (!this.editProduct.value.price) {
      alert('Please specify selling price');
      return;
    }
    else if (!this.selectedFile) {
      alert('Please upload an image');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    const overrides = {
      id: this.editProduct.value.id,
      name: this.editProduct.value.name,
      price: this.editProduct.value.price,
      category: this.editProduct.value.category,
      description: this.editProduct.value.description,
      directions: this.editProduct.value.usage
    };
    const blobOverrides = new Blob([JSON.stringify(overrides)], {
      type: 'application/json',
    });
    formData.append('product', blobOverrides);
    this.productRelatedService.updateProduct(formData, this.editProductData.id).subscribe((res: any) => {
      this.Products = res.data;
    });
    alert('Product Updated Successfully');
    this.router.navigate(['editPage']);
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

}
