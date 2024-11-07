import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodpageComponent } from './foodpage/foodpage.component';
import { RecentorderComponent } from './recentorder/recentorder.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { ProcessedorderComponent } from './processedorder/processedorder.component';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CartitemsComponent } from './cartitems/cartitems.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { MenuModelComponent } from './menu-model/menu-model.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { ContactformComponent } from './contactform/contactform.component';
import { SpecialoffersComponent } from './specialoffers/specialoffers.component';

const routes: Routes = [
  {path: "",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"adminl",component:AdminloginComponent},
  {path:"adminr",component:AdminregisterComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"foodpage",component:FoodpageComponent},
  {path:"recentorder",component:RecentorderComponent},
  {path:"addfood",component:AddfoodComponent},
  {path:"processedorder",component:ProcessedorderComponent},
  {path:"profile",component:ProfileComponent},
  {path:"userprofile",component:UserprofileComponent},
  {path:"cartitems",component:CartitemsComponent},
  {path:"restaurant",component:RestaurantComponent},
  {path:"orderhistory",component:OrderhistoryComponent},
  {path:"menumodel",component:MenuModelComponent},
  {path:"paymentgateway",component:PaymentgatewayComponent},
  {path:"contactform",component:ContactformComponent},
  {path:"specialoffers",component:SpecialoffersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
