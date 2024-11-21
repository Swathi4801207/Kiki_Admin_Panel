import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { DatePipe } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule,MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GoogleMapsModule  } from '@angular/google-maps';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { NavBarComponent } from './side-menu/side-menu';
import { HeaderComponent } from './header/header';
import { DashBoardComponent } from './dashboard/home/home';
import { ZonesComponent } from './dashboard/zones/zones';
import { BasefaresComponent } from './dashboard/basefares/basefares.component';
import { RidesComponent } from './dashboard/rides/rides.component';
import { CustomersComponent } from './dashboard/customers/customers.component';

import { MapComponent } from './map/map';
import { AddZone } from './add-zone/add-zone';
import { SamuraisDetails } from './samurai-info/verify/details-samurai/details-samurai';
import { ListSamurai } from './samurai-info/verify/samurai-list/list-samurai';
import { SamuraiFullData } from './samurai-info/samurai-data';
import { SamuraiProfile } from './samurai-info/profile/samurai-profile/profile';
import { CitiesComponent } from './dashboard/cities/cities.component';
import { RideTypesComponent } from './dashboard/ride-types/ride-types.component';
import { DistancebasefareComponent } from './dashboard/distancebasefare/distancebasefare.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { AdminsComponent } from './dashboard/admins/admins.component';
import { Ride } from './models/ride.model';
import { AddBasefareComponent } from './add-basefare/add-basefare.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { StatesComponent } from './dashboard/states/states.component';
import { DistrictsComponent } from './dashboard/districts/districts.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { VerticalsComponent } from './dashboard/verticals/verticals.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { MasterdataComponent } from './dashboard/masterdata/masterdata.component';
import { RideDetailsComponent } from './dashboard/ride-details/ride-details.component';
import { RatecardComponent } from './dashboard/ratecard/ratecard.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddDistancebasefareComponent } from './add-distancebasefare/add-distancebasefare.component';
import { VehiclesComponent } from './dashboard/vehicles/vehicles.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { CancelReasonsComponent } from './dashboard/cancel-reasons/cancel-reasons.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddCityComponent } from './add-city/add-city.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddCancelReasonsComponent } from './add-cancel-reasons/add-cancel-reasons.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HeaderComponent,
    DashBoardComponent,
    ZonesComponent,
    CustomersComponent,
    MapComponent,
    AddZone,
    SamuraiFullData,
    ListSamurai,
    SamuraisDetails,
    SamuraiProfile,
    RidesComponent,
   BasefaresComponent,
    DistancebasefareComponent,
    CitiesComponent,
    RideTypesComponent,
    AdminsComponent,
   RideDetailsComponent,
   RatecardComponent,
   AddAdminComponent,
   AddBasefareComponent,
   AddDistancebasefareComponent,
   ServicesComponent,
   AddServiceComponent,
   AddCityComponent,
   VehiclesComponent,
   AddVehicleComponent,
   CancelReasonsComponent,
   AddCancelReasonsComponent,
  
],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRadioGroup,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatTabsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NgxPaginationModule,
    MatExpansionModule,
    FooterComponent,
    StatesComponent,
    DistrictsComponent,
    RolesComponent,
    VerticalsComponent,
    ReportsComponent,
    MasterdataComponent,
   
    
    
    
   
  ],

  providers:   [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, provideAnimationsAsync(),{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}],
 
  bootstrap: [AppComponent],
})
export class AppModule {}
