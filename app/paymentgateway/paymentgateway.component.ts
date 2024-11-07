import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart-service';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrl: './paymentgateway.component.css'
})
export class PaymentgatewayComponent {
  public products: any = [];
  public grandTotal!: number;

  selectedMonth: string = '';
  selectedYear: string = '';

  constructor(private util: NodeutilityService, private router: Router,private http: HttpClient,private cartService: CartService) {}

  onSubmit(form: any): void {
    if (form.valid) {
      const userEmail: string | null = localStorage.getItem('user');
      const currentDate = new Date().toISOString(); // Get current date
      const formData = {
        name: form.value.name,
        email: userEmail,
        address: form.value.address,
        city: form.value.city,
        state: form.value.state,
        zip: form.value.zip,
        orderdate: currentDate, // Append current date to formData
        cardname: form.value.cardname,
        cardnum: form.value.cardnum,
        month: this.selectedMonth,
        year: this.selectedYear,
        cvv: form.value.cvv
      };

      if (userEmail)
        {
        // Step 1: Get cart items
        const cartItems: any[] = this.getCartItemsToDelete(userEmail,formData);
        console.log(cartItems);
          }
      }
  }

  getCartItemsToDelete(userEmail: string,formData:any): any[] {
    // Logic to retrieve items to delete from the cart based on user email
    if (userEmail) {
      this.cartService.getCartItems(userEmail).subscribe(
        (cartItems: any[]) => {
          this.products = cartItems;
          console.log("Cart Items",this.products);
          this.grandTotal = this.calculateGrandTotal();
          this.util.deleteItemsFromCart(userEmail, this.products).subscribe((deleteData) => {
            if (deleteData.status) {
              // Step 3: Insert items into order
              this.util.insertOrder(formData, this.products).subscribe((orderData) => {
                if (orderData.status) {
                  // Step 4: Make payment
                  this.util.payment(formData,this.products).subscribe((paymentData) => {
                    if (paymentData.status) {
                      this.generateBill(formData,this.products);
                      this.showSuccessPopup();
                    } else {
                      this.showErrorPopup(paymentData.message);
                    }
                  });
                } else {
                  this.showErrorPopup(orderData.message);
                }
              });
            } else {
              this.showErrorPopup(deleteData.message);
            }
          });
        },
        (error: any) => {
          console.error('Error fetching cart items:', error);
        }
      );
    }
    console.log("Cart Items is");
    console.log(this.products);
    return this.products;
  }

  calculateGrandTotal(): number {
    return this.products.reduce((total: number, item: any) => total + parseFloat(item.product_price), 0);
}

   showSuccessPopup(): void {
  // Logic to display success pop-up
    const totalAmount = this.grandTotal; // Assuming totalAmount is accessible here
    const successMessage = `Payment successful. Total amount paid: Rs.${totalAmount}`;
    alert(successMessage);
    this.router.navigate(['/foodpage']);
   }

   generateBill(formData:any,prod:any): void {
    // Constructing bill message
    let billMessage = '\t\tPAYMENT SUCCESSFUL\n\n';

    // Append form data
    billMessage += '******Billing Details:******\n\n';
    billMessage += `Name      : ${formData.name}\n`;
    billMessage += `Email     : ${formData.email}\n`;
    billMessage += `Address   : ${formData.address}\n`;
    billMessage += `City      : ${formData.city}\n`;
    billMessage += `State     : ${formData.state}\n`;
    billMessage += `Zip Code  : ${formData.zip}\n\n`;

    // Append items
    billMessage += '---------------------\n';
    billMessage += '    Ordered Items:\n';
    billMessage += '---------------------\n';
    prod.forEach((item: any) => {
      billMessage += `${item.product_name} - Quantity: ${item.quantity}, Price: Rs. ${item.product_price}\n`;
    });

    // Append total amount
    billMessage += `\nTotal Amount Paid: Rs.${this.grandTotal}\n`;

    // Displaying bill message
    alert(billMessage);
    // Redirect to foodpage
  }


  showErrorPopup(message: string): void {
  // Logic to display error pop-up with the provided message
     alert('Payment failed: ' + message);
   }
}
