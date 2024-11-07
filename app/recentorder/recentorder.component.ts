import { Component, OnInit } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';

@Component({
  selector: 'app-recentorder',
  templateUrl: './recentorder.component.html',
  styleUrls: ['./recentorder.component.css']
})
export class RecentorderComponent implements OnInit {
  user1: string | null = '';
  recentOrders: any[] = [];

  constructor(private util: NodeutilityService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user1 = localStorage.getItem('user1');
    if (this.user1) {
      this.fetchRecentOrders();
    }
  }

  fetchRecentOrders() {
    if (this.user1) {
      this.util.getRecentOrders(this.user1).subscribe((data: { status: boolean, orders: any[] }) => {
        if (data.status) {
          this.recentOrders = data.orders.filter(order => order.status !== 'Delivered');
        }
      });
    }
  }

  openStatusDialog(order: any): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '250px',
      data: { currentStatus: order.status }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        // Update the status in the database
        this.updateOrderStatus(order, result);
      }
    });
  }

  updateOrderStatus(order: any, newStatus: string): void {
    // Call your service method to update the status in the database
    // Example: this.util.updateOrderStatus(order.id, newStatus).subscribe(...)
    const email=localStorage.getItem('user1');
    if (!email) {
      console.error('User email not found in local storage.');
      return;
    }
    console.log("Email:", email);
    console.log("Order No: ",order.orderno);
    console.log("New Status:",newStatus);
    this.util.updateOrder(email,order.orderno,newStatus).subscribe((data)=>{
      if(data.status)
        {
          order.order_status=newStatus;
          this.fetchRecentOrders();
          console.log("Status Updated successfully");
        }
        else{
          console.error('Error updating status:',data.message);
        }
    });
  }

}


