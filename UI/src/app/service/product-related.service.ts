import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductRelatedService {
  baseUrl = "http://localhost:8080/api/product/";
  constructor(private httpClient: HttpClient) { }

  getAllProduct(data: any): Observable<any> {
    const url = this.baseUrl + 'get';
    return this.httpClient.get(url);
  }
  addProduct(formData: any): Observable<any> {
    const url = this.baseUrl + 'add';
    return this.httpClient.post(url, formData);
  }
  updateProduct(formData: any, id: number): Observable<any> {
    const url = this.baseUrl + 'update/' + id
    return this.httpClient.put(url, formData);
  }
  deleteProduct(id: number): Observable<any> {
    const url = this.baseUrl + 'delete/' + id
    return this.httpClient.delete(url);
  }
  searchProduct(id: any): Observable<any> {
    const url = this.baseUrl + 'search/' + id
    return this.httpClient.get(url);
  }
}
