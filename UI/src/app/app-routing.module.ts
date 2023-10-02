import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './page/product/product.component';
import { HomeComponent } from './page/home/home.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { AddProductComponent } from './page/add-product/add-product.component';
import { EditComponent } from './page/edit/edit.component';
import { NextpageComponent } from './page/nextpage/nextpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'editPage', component: EditProductComponent },
  { path: 'adduser', component: AddProductComponent },
  { path: 'edit', component: EditComponent },
  { path: 'nextPage', component: NextpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
