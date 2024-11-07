import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageVisibilityService {
  public isRecentVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAddVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isProcessedVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isProfileVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isRestaurantVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCartVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isHistoryVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserprofileVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}
  showRecent() {
    this.isRecentVisible.next(true);
    this.hideAllExcept('recentorder');
  }
  showAdd() {
    this.isAddVisible.next(true);
    this.hideAllExcept('addfood');
  }
  showProcessed() {
    this.isProcessedVisible.next(true);
    this.hideAllExcept('processedorder');
  }
  showProfile() {
    this.isProfileVisible.next(true);
    this.hideAllExcept('profile');
  }
  showRestaurant() {
    this.isRestaurantVisible.next(true);
    this.hideAllExcept('restaurant');
  }
  showCart() {
    this.isCartVisible.next(true);
    this.hideAllExcept('cartitems');
  }
  showHistory() {
    this.isHistoryVisible.next(true);
    this.hideAllExcept('orderhistory');
  }
  showUserprofile() {
    this.isUserprofileVisible.next(true);
    this.hideAllExcept('userprofile');
  }
  private hideAllExcept(except: string) {

    const all = [this.isRecentVisible, this.isAddVisible, this.isProcessedVisible ,this.isProfileVisible,
      this.isRestaurantVisible, this.isCartVisible, this.isHistoryVisible ,this.isUserprofileVisible
    ];
    all.forEach(subject => {
      if (subject && subject !== this.getSubjectByName(except)) {
        subject.next(false);
      }
    });
  }

  private getSubjectByName(name: string): BehaviorSubject<boolean> {
    switch (name) {
      case 'recentorder':
        return this.isRecentVisible;
      case 'addfood':
        return this.isAddVisible;
      case 'processedorder':
        return this.isProcessedVisible;
      case 'profile':
        return this.isProfileVisible;
      case 'restaurant':
        return this.isRestaurantVisible;
      case 'cartitems':
        return this.isCartVisible;
      case 'orderhistory':
        return this.isHistoryVisible;
      case 'userprofile':
        return this.isUserprofileVisible;
      default:
          return new BehaviorSubject<boolean>(false);
          // Return default BehaviorSubject
      }
    }
}
