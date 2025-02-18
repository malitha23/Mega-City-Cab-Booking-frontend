import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signing/signing.component';
import { SignupComponent } from './signiup/signiup.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { AddNewVehicleComponent } from './admin/add-new-vehicle/add-new-vehicle.component';
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component';
import { CategoryService } from './services/CategoryService';
import { ManageSubcategoryComponent } from './admin/manage-subcategory/manage-subcategory.component';
import { SubCategoryService  } from './services/subcategoryServise';
import { ListVehicleComponent } from './admin/list-vehicle/list-vehicle.component';
import { HomepageComponent } from './user/homepage/homepage.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { SearchBarComponent } from './user/search-bar/search-bar.component';
import { VehicleListComponent } from './user/vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './user/vehicle-card/vehicle-card.component';
import { FeaturedSectionComponent } from './user/featured-section/featured-section.component';
import { FooterComponent } from './user/footer/footer.component';
import { OurServicesComponent } from './user/our-services/our-services.component';
import { BookingViewPageComponent } from './user/booking-view-page/booking-view-page.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { QuickLoginComponent } from './user/quick-login/quick-login.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from 'primeng/message';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AddNewVehicleComponent,
    ManageCategoryComponent,
    ManageSubcategoryComponent,
    ListVehicleComponent,
    HomepageComponent,
    NavbarComponent,
    SearchBarComponent,
    VehicleListComponent,
    VehicleCardComponent,
    FeaturedSectionComponent,
    FooterComponent,
    OurServicesComponent,
    BookingViewPageComponent,
    TimeAgoPipe,
    QuickLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    BrowserAnimationsModule,
    MessageModule
  ],
  providers: [CategoryService, SubCategoryService, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
