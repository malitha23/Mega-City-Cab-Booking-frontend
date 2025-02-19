import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signing/signing.component';
import { SignupComponent } from './signiup/signiup.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { AddNewVehicleComponent } from './admin/add-new-vehicle/add-new-vehicle.component';  // Import the AddNewVehicleComponent
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component'; 
import { ManageSubcategoryComponent } from './admin/manage-subcategory/manage-subcategory.component'; 
import { HomepageComponent } from './user/homepage/homepage.component'; 
import { BookingViewPageComponent } from './user/booking-view-page/booking-view-page.component'; 

const routes: Routes = [
  { path: '', component: HomepageComponent }, // Default route (Homepage)
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'bookingViewPage/:id', component: BookingViewPageComponent },
  
  { path: 'admin/add-new-vehicle', component: AddNewVehicleComponent },
  { path: 'admin/manage-category', component: ManageCategoryComponent },
  { path: 'admin/manage-subcategory', component: ManageSubcategoryComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
