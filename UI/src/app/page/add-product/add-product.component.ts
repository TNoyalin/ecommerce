import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductRelatedService } from 'src/app/service/product-related.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  Products: any;
  addProduct: FormGroup;
  selectedFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private productRelatedService: ProductRelatedService,
    private router: Router
  ) {
    this.addProduct = this.formBuilder.group({
      "name": new FormControl('', [Validators.required]),
      "price": new FormControl('', [Validators.required]),
      "category": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "usage": new FormControl('', [Validators.required]),
      "image": new FormControl('', [Validators.required])
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  submit() {
    if (!this.addProduct.value.name) {
      alert('Please provide a product name.');
      return;
    }
    else if (!this.addProduct.value.price) {
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
      name: this.addProduct.value.name,
      price: this.addProduct.value.price,
      category: this.addProduct.value.category,
      description: this.addProduct.value.description,
      directions: this.addProduct.value.usage
    };
    const blobOverrides = new Blob([JSON.stringify(overrides)], {
      type: 'application/json',
    });
    formData.append('product', blobOverrides);
    this.productRelatedService.addProduct(formData).subscribe((res: any) => {
      this.Products = res.data;   
    });
    alert('Product Created Successfully');
    this.router.navigate(['home']);
  }
}
