import { Component } from '@angular/core';
import { NodeutilityService } from '../nodeutility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private util: NodeutilityService, private router: Router) {}

  msg: string = '';
  user: string | null = '';
  userProfile: any[] = []; // Array to hold food items

  ngOnInit(): void {
    this.user = localStorage.getItem('user1');
    console.log('user1')
    this.fetchProfile();
  }


  fetchProfile() {
    if (this.user) {
      // Call service method to fetch food items based on the user's email
      this.util.getProfile(this.user).subscribe((data) => {
        if (data.status) {
          this.userProfile = data.userProfile; // Assuming the server returns food items in 'foodItems' property
        } else {
          console.error('Error fetching food items:', data.message);
        }
      });
    }
  }

}
