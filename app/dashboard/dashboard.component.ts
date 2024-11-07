import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeutilityService } from '../nodeutility.service';
import { PageVisibilityService } from '../services/pageVisibilityService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isRecentVisible!:boolean;
  user1:string|null='';
  isDarkMode: boolean = false;
  constructor(public pageVisibilityService:PageVisibilityService,private router: Router,private util:NodeutilityService){}
  ngOnInit(): void {
    this.user1 = localStorage.getItem('user1');
    if (this.user1) {
    }
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.body.classList.toggle('light-mode', !this.isDarkMode);
  }
  navigateToRecent(){
    this.pageVisibilityService.showRecent();
  }
  navigateToAdd()
  {
    this.pageVisibilityService.showAdd();
  }
  navigateToProcessed(){
    this.pageVisibilityService.showProcessed();
  }
  navigateToProfile(){
    this.pageVisibilityService.showProfile();
  }
  logout() {
    // Perform logout logic here, such as clearing authentication tokens or session data
    // For example:
    // localStorage.removeItem('accessToken');

    // Navigate to the login page after logout
    localStorage.clear()
    this.router.navigate(['/home']);
  }
}

