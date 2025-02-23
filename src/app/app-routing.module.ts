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
import { UserProfilePageComponent } from './user/user-profile-page/user-profile-page.component'; 
import { VehicleListComponent } from './user/vehicle-list/vehicle-list.component'; 
import { ModeratorHomepageComponent } from './moderator/homepage/homepage.component'; 
import { AdminHomepageComponent } from './admin/homepage/homepage.component'; 
import { ModeratorProfileComponent } from './moderator/moderator-profile/moderator-profile.component'; 
import { DrivermanageComponent } from './moderator/DriverManage/drivermanage/drivermanage.component';
import { BookingmanageComponent } from './moderator/BookingManage/bookingmanage/bookingmanage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent }, // Default route (Homepage)
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'userProfile', component: UserProfilePageComponent },
  { path: 'listing', component: VehicleListComponent },

  { path: 'bookingViewPage/:id', component: BookingViewPageComponent },

  { path: 'moderator/Dashboard', component: ModeratorHomepageComponent },
  { path: 'moderatorProfile', component: ModeratorProfileComponent },
  { path: 'driversmanage', component: DrivermanageComponent },
  { path: 'bookingssmanage', component: BookingmanageComponent },
  
  { path: 'admin/Dashboard', component: AdminHomepageComponent },
  { path: 'admin/add-new-vehicle', component: AddNewVehicleComponent },
  { path: 'admin/manage-category', component: ManageCategoryComponent },
  { path: 'admin/manage-subcategory', component: ManageSubcategoryComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
