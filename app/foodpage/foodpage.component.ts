import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeutilityService } from '../nodeutility.service';
import { PageVisibilityService } from '../services/pageVisibilityService';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrl: './foodpage.component.css'
})
export class FoodpageComponent {
  isRestaurantVisible!:boolean;
  user:string|null='';
  constructor(public pageVisibilityService:PageVisibilityService,private router: Router,private util:NodeutilityService){}
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log('user');
  }
  navigateToRestaurant(){
    this.pageVisibilityService.showRestaurant();
  }
  navigateToCart()
  {
    this.pageVisibilityService.showCart();
  }
  navigateToHistory(){
    this.pageVisibilityService.showHistory();
  }
  navigateToUserprofile(){
    this.pageVisibilityService.showUserprofile();
  }
  logout() {
    // Perform logout logic here, such as clearing authentication tokens or session data
    // For example:
    // localStorage.removeItem('accessToken');

    // Navigate to the login page after logout
    localStorage.clear()
    this.router.navigate(['/home']);
  }
}
