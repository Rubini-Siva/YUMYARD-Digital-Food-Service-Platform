// cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = "http://localhost:5000";
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private HttpClient:HttpClient) { }


  addToCart(menuItem: any, restaurantEmail: string, userEmail: string): Observable<any> {
    const cartItem = {
      restemail: restaurantEmail,
      useremail: userEmail,
      product_name: menuItem.product_name,
      product_price: menuItem.product_price,
      product_image: menuItem.product_image,
      quantity: 1 // Initially, set quantity to 1
    };
    return this.HttpClient.post<any>(`${this.url}/cart/add`, cartItem);
  }

  getCartItems(userEmail: string): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/cart/items/${userEmail}`);
  }


  updateCartItem(item: any): Observable<any> {
    return this.HttpClient.put<any>(`${this.url}/cart/items/${item._id}`, item);
  }

  removeItem(item: any): Observable<any> {
    return this.HttpClient.delete<any>(`${this.url}/cart/items/${item._id}`);
  }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(userEmail: string, item: any): Observable<any> {
    return this.HttpClient.delete<any>(`${this.url}/cart/items/${item.restemail}/${userEmail}/${item.product_name}`);
  }

  removeAllCart(): Observable<any> {
    return this.HttpClient.delete<any>(`${this.url}/cart/items`);
  }

}
