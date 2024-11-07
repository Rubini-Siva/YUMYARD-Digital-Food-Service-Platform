import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PageVisibilityService } from '../services/pageVisibilityService';



@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css']
})
export class CartitemsComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;

  constructor(private cartService: CartService, private dialog: MatDialog,private router: Router,private pageVisibilityService: PageVisibilityService) { }


  ngOnInit(): void {
    const userEmail: string | null = localStorage.getItem('user');
    if (userEmail) {
      this.cartService.getCartItems(userEmail).subscribe(
        (cartItems: any[]) => {
          this.products = cartItems;
          this.grandTotal = this.calculateGrandTotal();
          console.log(this.products);
        },
        (error: any) => {
          console.error('Error fetching cart items:', error);
        }
      );
      console.log(this.products);
    }
  }


  calculateGrandTotal(): number {
    return this.products.reduce((total: number, item: any) => total + (parseFloat(item.product_price)* parseInt(item.quantity)), 0);
}

proceedToCheckout() {
  // Navigate to the payment gateway page
  this.router.navigate(['/paymentgateway']);
}

removeItem(item: any): void {
  const userEmail: string | null = localStorage.getItem('user');
  if (userEmail) {
    this.cartService.removeCartItem(userEmail, item).subscribe(() => {
      // Item removed successfully
      // Remove item from UI
      const index = this.products.findIndex((product: any) => product._id === item._id);
      if (index !== -1) {
        this.products.splice(index, 1);
        // Update grand total
        this.grandTotal = this.calculateGrandTotal();
      }
    }, (error: any) => {
      console.error('Error removing item from cart:', error);
      // Optionally, handle error
    });
  } else {
    console.error('User email not found in local storage');
    // Optionally, handle this case
  }
}

  emptyCart(): void {
    this.cartService.removeAllCart().subscribe(() => {
      this.products = [];
      this.grandTotal = 0;
    }, (error: any) => {
      console.error('Error emptying cart:', error);
    });
  }
}
