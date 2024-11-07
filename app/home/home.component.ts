import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router from @angular/router


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {

  }
  redirectToLogin():void {
    console.log("Navigating to login page...");
    this.router.navigate(['/login']);
  }

}
