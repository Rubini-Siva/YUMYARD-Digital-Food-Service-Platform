import { Component } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.css'
})
export class OrderhistoryComponent {

  constructor(private util: NodeutilityService, private router: Router) {}

  msg: string = '';
  user: string | null = '';
  selectedFile: File | undefined;
  history: any[] = []; // Array to hold food items

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log('user');
    this.fetchOrder();
  }

  fetchOrder() {
    if (this.user) {
      // Call service method to fetch food items based on the user's email
      this.util.getOrder(this.user).subscribe((data) => {
        if (data.status) {
          this.history = data.history;
          console.error("Order fetched for user");// Assuming the server returns food items in 'foodItems' property
        } else {
          console.error('Error fetching food items:', data.message);
        }
      });
    }
  }

  cancel(foodItem: any): void {
    if(foodItem.status==='Delivered')
    {
        alert("It is already delivered.");
        return;
    }
    if (confirm("Are you sure you want to cancel this order?")) {
      const email = localStorage.getItem('user');
      if (!email) {
        console.error('User email not found in local storage.');
        return;
      }
      // Call the service method to cancel the order
      this.util.cancelOrder(email, foodItem.orderno).subscribe((data) => {
        if (data.status) {
          // If cancellation is successful, update the status of the order
          foodItem.status = 'Cancelled';
          console.log("Order cancelled successfully");
          this.fetchOrder();
          // Optionally, you can display a success message or perform any other action
        } else {
          // If cancellation fails, display an error message or handle the error accordingly
          console.error('Error cancelling order:', data.message);
        }
      });
    }
  }

}
