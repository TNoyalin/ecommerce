import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './page/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ProductComponent } from './page/product/product.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { AddProductComponent } from './page/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './page/edit/edit.component';
import { NextpageComponent } from './page/nextpage/nextpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ProductComponent,
    EditProductComponent,
    AddProductComponent,
    EditComponent,
    NextpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
