// menu-dialog.component.ts

import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../services/cart-service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent {

  // menu-dialog.component.ts


  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Modify the addToCart method
addToCart(menuItem: any): void {
  const restaurantEmail = menuItem.email; // Assuming 'email' is the property that holds the restaurant's email
  const userEmail = localStorage.getItem('user') ?? ''; // Assuming you store the user's email in localStorage
  this.cartService.addToCart(menuItem, restaurantEmail, userEmail).subscribe(
    (response: any) => {
      console.log('Item added to cart:', response);
      // Show a snackbar with the response message
      this.openSnackBar(response.message);
    },
    (error: any) => {
      console.error('Error adding item to cart:', error);
      // Show a snackbar with the error message
      this.openSnackBar('Failed to add item to cart');
    }
  );
}

// Helper method to open a snackbar
openSnackBar(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000, // Duration in milliseconds
    horizontalPosition: 'center',
    verticalPosition: 'top' as MatSnackBarVerticalPosition, // Display at the top
  });
}
  onClose(): void {
    this.dialogRef.close();
  }
}
