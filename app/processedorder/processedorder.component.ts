import { Component } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-processedorder',
  templateUrl: './processedorder.component.html',
  styleUrl: './processedorder.component.css'
})
export class ProcessedorderComponent {
  constructor(private util: NodeutilityService, private router: Router,private dialog:MatDialog) {}
  msg: string = '';
  user: string | null = '';
  foodItems: any[] = []; // Array to hold food items
  ngOnInit(): void {
    this.user = localStorage.getItem('user1');
    console.log('user1')
    this.fetchProcessedOrder();
  }

  fetchProcessedOrder() {
    if (this.user) {
      // Call service method to fetch food items based on the user's email
      this.util.getProcessed(this.user).subscribe((data) => {
        if (data.status) {
          this.foodItems = data.foodItems; // Assuming the server returns food items in 'foodItems' property
        } else {
          console.error('Error fetching food items:', data.message);
        }
      });
    }
  }
}
