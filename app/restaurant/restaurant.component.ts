import { Component, ViewChild } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { MenuModelComponent } from '../menu-model/menu-model.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  restaurants: any[] = [];
  selectedRestaurant: any = null;
  menuItems: any[] = [];
  @ViewChild(MenuModelComponent) menuModel!: MenuModelComponent;

  constructor(private util: NodeutilityService,private dialog: MatDialog) {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.util.getRestaurants().subscribe((data) => {
      if (data.status) {
        this.restaurants = data.restaurants;
      } else {
        console.error('Error fetching restaurants:', data.message);
      }
    });
  }


  showMenu(restaurant: any): void {
    this.selectedRestaurant = restaurant;
    const restaurantEmail: string = this.selectedRestaurant.email;
    const userEmail: string = localStorage.getItem('user') ?? '';

    this.util.getMenuItems(restaurantEmail, userEmail).subscribe((data) => {
      if (data.status) {
        this.menuItems = data.menuItems;
        console.log(this.menuItems);

        // Open the menu dialog and pass restaurant and menuItems data
        const dialogRef = this.dialog.open(MenuDialogComponent, {
          width: '500px',
          data: { restaurant: restaurant, menuItems: this.menuItems }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      } else {
        console.error('Error fetching menu items:', data.message);
      }
    });
  }


  openModal(): void {
    this.menuModel.selectedRestaurant = this.selectedRestaurant;
    this.menuModel.menuItems = this.menuItems;
  }

  closeModal(): void {
    // Logic to close the modal
    // For example, you can reset selectedRestaurant and menuItems
    this.selectedRestaurant = null;
    this.menuItems = [];
  }
}
