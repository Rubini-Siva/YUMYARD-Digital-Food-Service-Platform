import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NodeutilityService } from './nodeutility.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodpageComponent } from './foodpage/foodpage.component';
import { FormsModule } from '@angular/forms';
import { RecentorderComponent } from './recentorder/recentorder.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { ProcessedorderComponent } from './processedorder/processedorder.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CartitemsComponent } from './cartitems/cartitems.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DialogComponent } from './dialog/dialog.component'; // Import FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModelComponent } from './menu-model/menu-model.component';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { ContactformComponent } from './contactform/contactform.component';
import { SpecialoffersComponent } from './specialoffers/specialoffers.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminloginComponent,
    AdminregisterComponent,
    DashboardComponent,
    FoodpageComponent,
    RecentorderComponent,
    AddfoodComponent,
    ProcessedorderComponent,
    ProfileComponent,
    RestaurantComponent,
    CartitemsComponent,
    OrderhistoryComponent,
    UserprofileComponent,
    DialogComponent,
    StatusDialogComponent,
    MenuModelComponent,
    MenuDialogComponent,
    PaymentgatewayComponent,
    ContactformComponent,
    SpecialoffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Add FormsModule here,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,// Make sure to import MatFormFieldModule here
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    NgbModule,
  ],
  providers: [NodeutilityService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
