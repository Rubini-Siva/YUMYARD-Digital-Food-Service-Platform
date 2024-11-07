import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeutilityService {
  url:string="http://localhost:5000/";

  constructor(private HttpClient:HttpClient) { }

  insert2(email:string, password:string):Observable<any>{
    return this.HttpClient.get(this.url+"insert2?email="+email+"&password="+password);
  }

  insert1(email:string, password:string):Observable<any>{
    return this.HttpClient.get(this.url+"insert1?email="+email+"&password="+password);
  }

  insert(formData: FormData): Observable<any> {
    return this.HttpClient.post(this.url + "insert", formData);
  }

  insert3(name:string,email:string,phone:number,address:string,password:string):Observable<any>{
    return this.HttpClient.get(this.url+"insert3?name="+name+"&email="+email+"&phone="+phone+"&address="+address+
      "&password="+password);
  }

  add(formData: FormData): Observable<any> {
    return this.HttpClient.post(this.url + "add", formData);
  }

  getFoodItems(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}foodItems/${email}`);
  }

  updateFoodItemPrice(email: string, product_name: string, newPrice: number): Observable<any> {
    return this.HttpClient.post(this.url + "updatefood", { email, product_name, newPrice });
  }


  deleteFoodItem(email: string, foodName: string): Observable<any> {
  return this.HttpClient.delete<any>(`${this.url}foodItems/${email}/${foodName}`);
}

  getProcessed(email: string): Observable<any> {
  return this.HttpClient.get<any>(`${this.url}processed/${email}`);
}

  getRecentOrders(email: string): Observable<any> {
  return this.HttpClient.get<any>(`${this.url}recentOrders?email=${email}`);
}
  updateOrder(email:string,order_no:string,newStatus:string):Observable<any> {
    return this.HttpClient.post(this.url + "updateorderstatus", { email, order_no , newStatus });
  }

  getProfile(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}profile/${email}`);
  }
  getUProfile(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}userprofile/${email}`);
  }

  cancelOrder(email: string, order_no: string): Observable<any>{
    return this.HttpClient.post<any>(this.url+"cancelOrder", { email, order_no });
  }

  getOrder(email:string):Observable<any>{
    return this.HttpClient.get<any>(`${this.url}getorder/${email}`);
  }

  getRestaurants(): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}restaurants`); // Remove the extra forward slash
  }

  getMenuItems(restaurantEmail: string, userEmail: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}menu?restaurantEmail=${restaurantEmail}&userEmail=${userEmail}`); // Remove the extra forward slash
  }

  payment(formData: any,cartItems: any[]): Observable<any> {
    return this.HttpClient.post<any>(`${this.url}submitPayment`, {formData,cartItems});
  }

  deleteItemsFromCart(userEmail: string, cartItems: any[]): Observable<any> {
    return this.HttpClient.post<any>(`${this.url}deleteItemsFromCart`, { userEmail, cartItems });
  }

  insertOrder(formData: any, cartItems: any[]): Observable<any> {
    return this.HttpClient.post<any>(`${this.url}insertOrder`, { formData, cartItems });
  }

}

