import { Component, OnInit } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  constructor(private util: NodeutilityService, private router: Router,private dialog:MatDialog) {}
  someCondition: boolean = false; // Define someCondition property

  msg: string = '';
  user: string | null = '';
  selectedFile: File | undefined;
  foodItems: any[] = []; // Array to hold food items


  ngOnInit(): void {
    this.user = localStorage.getItem('user1');
    console.log('user1')
    this.fetchFoodItems();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    if (!this.validateForm()) {
      return;
    }

    if (!this.selectedFile) {
      console.error('No file selected.');
      this.msg = 'Upload the image.';
      return;
    }

    const formData = new FormData();
    if (this.user) { // Check if this.user is not null
      formData.append('email', this.user); // Append user email
    }
    formData.append('product_name', form.value.product_name);
    formData.append('product_price', form.value.product_price);
    formData.append('product_image', this.selectedFile, this.selectedFile.name);

    this.util.add(formData).subscribe((data) => {
      if (data.status) {
        this.msg = data.message;
        this.fetchFoodItems();
      } else {
        this.msg = data.message;
      }
    });
  }

  validateForm(): boolean {
    const productNameInput =<HTMLInputElement> document.querySelector('#product_name');
    const productPriceInput = <HTMLInputElement>document.querySelector('#product_price');
    const fileInput = <HTMLInputElement>document.querySelector('#product_image');

    if (!productNameInput || !productPriceInput || !fileInput) {
      console.error('One or more elements not found.');
      this.msg='No elements found';
      // Handle the error, such as displaying a message to the user or returning early from the function.
      return false;
    }

    const product_name = productNameInput.value;
    const product_price = parseFloat(productPriceInput.value);
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error('No file selected.');
      this.msg = 'Upload the image.';
      return false;
    }

    const product_image = fileInput.files[0];
    if (!product_name || !product_image) {
      this.msg = 'Please fill in all fields.';
      return false;
    }

    if (isNaN(product_price) || product_price < 0) {
      this.msg = 'Price should be a valid positive number.';
      return false;
    }

    return true;
  }

  fetchFoodItems() {
    if (this.user) {
      // Call service method to fetch food items based on the user's email
      this.util.getFoodItems(this.user).subscribe((data) => {
        if (data.status) {
          this.foodItems = data.foodItems; // Assuming the server returns food items in 'foodItems' property
        } else {
          console.error('Error fetching food items:', data.message);
        }
      });
    }
  }

  editedPrice: number | undefined;

  // Method to toggle between viewing and editing modes for the price
  editPrice(foodItem: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { currentPrice: foodItem.product_price, newPrice: foodItem.product_price } // Change this line
    });

    dialogRef.afterClosed().subscribe((result: number | undefined) => {
      if (result !== undefined && result !== foodItem.product_price) {
        this.updatePrice(foodItem, result);
      }
    });
  }
  // Method to update the price in the database
  updatePrice(foodItem: any, newPrice: number) {
    const email = localStorage.getItem('user1');
    if (!email) {
      console.error('User email not found in local storage.');
      return;
    }
    console.log("Email:", email);
    console.log("Product Name:", foodItem.product_name);
    console.log("New Price:", newPrice); // Ensure this is not undefined
    this.util.updateFoodItemPrice(email, foodItem.product_name, newPrice).subscribe((data) => {
      if (data.status) {
        // If update is successful, update the price in the local array
        foodItem.product_price = newPrice;
        this.fetchFoodItems();
        console.log("Successfully Updated");
        // Optionally, you can display a success message or perform any other action
      } else {
        // If update fails, display an error message or handle the error accordingly
        console.error('Error updating price:', data.message);
      }
    });
  }

  deleteFoodItem(foodItem: any) {
    if (confirm("Are you sure you want to delete this food item?")) {
      const email = localStorage.getItem('user1');
      if (!email) {
        console.error('User email not found in local storage.');
        return;
      }

      // Call the service method to delete the food item
      this.util.deleteFoodItem(email, foodItem.product_name).subscribe((data) => {
        if (data.status) {
          // If deletion is successful, remove the item from the local array
          const index = this.foodItems.indexOf(foodItem);
          if (index !== -1) {
            this.foodItems.splice(index, 1);
            this.fetchFoodItems();
            console.log("Successfully Deleted");
            // Optionally, you can display a success message or perform any other action
          }
        } else {
          // If deletion fails, display an error message or handle the error accordingly
          console.error('Error deleting food item:', data.message);
        }
      });
    }
  }

}
