import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dashboard/home/home';
import { ZonesComponent } from './dashboard/zones/zones';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { AdminsComponent } from './dashboard/admins/admins.component';
import { RidesComponent } from './dashboard/rides/rides.component';

import { DistancebasefareComponent } from './dashboard/distancebasefare/distancebasefare.component';
import { CitiesComponent } from './dashboard/cities/cities.component';
import { RideTypesComponent } from './dashboard/ride-types/ride-types.component';
import { MapComponent } from './map/map';
import { AddZone } from './add-zone/add-zone';
import { SamuraiFullData } from './samurai-info/samurai-data';
import { SamuraiProfile } from './samurai-info/profile/samurai-profile/profile';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './dashboard/footer/footer.component';
import { Ride } from './models/ride.model';
import { StatesComponent } from './dashboard/states/states.component';
import { DistrictsComponent } from './dashboard/districts/districts.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { VerticalsComponent } from './dashboard/verticals/verticals.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { MasterdataComponent } from './dashboard/masterdata/masterdata.component';
import { BasefaresComponent } from './dashboard/basefares/basefares.component';
import { RideDetailsComponent } from './dashboard/ride-details/ride-details.component';
import { RatecardComponent } from './dashboard/ratecard/ratecard.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddBasefareComponent } from './add-basefare/add-basefare.component';
import { AddDistancebasefareComponent } from './add-distancebasefare/add-distancebasefare.component';
import { VehiclesComponent } from './dashboard/vehicles/vehicles.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { CancelReasonsComponent } from './dashboard/cancel-reasons/cancel-reasons.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddCityComponent } from './add-city/add-city.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddCancelReasonsComponent } from './add-cancel-reasons/add-cancel-reasons.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashBoardComponent },
    { path: 'drivers',component: SamuraiFullData},
    { path: 'samurai-profile', component: SamuraiProfile },
    { path: 'customers', component: CustomersComponent },
     { path:'admins', component: AdminsComponent },
     { path:'add-admin', component:AddAdminComponent }, 
     { path:'vehicles', component: VehiclesComponent },
     { path:'add-vehicle', component:AddVehicleComponent },
     { path:'rides', component:RidesComponent },
     { path: 'ride-details/:id', component: RideDetailsComponent } ,
     { path:'cities', component:CitiesComponent },
     { path:'add-city', component:AddCityComponent },
     { path: 'zones', component: ZonesComponent },
     { path: 'add-zone', component: AddZone },
      { path:'services', component:ServicesComponent },
      { path:'add-service', component:AddServiceComponent },
      { path:'basefares', component:BasefaresComponent },
      { path:'add-basefare', component:AddBasefareComponent }, 
     { path:'distancebasefare', component:DistancebasefareComponent },
     { path:'add-distancebasefare', component:AddDistancebasefareComponent },
     { path:'ratecard', component:RatecardComponent },
     { path:'cancel-reasons', component: CancelReasonsComponent },
     { path:'add-cancel-reasons', component:AddCancelReasonsComponent },
    { path:'ride-types', component:RideTypesComponent },
    { path: 'map', component: MapComponent },
 
   
   
  
 
   
 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    bootstrap: [AppComponent]
  })
  export class AppRoutingModule {}

