// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ride-details',
  
//   templateUrl: './ride-details.component.html',
//   styleUrl: './ride-details.component.css'
// })
// export class RideDetailsComponent {

// }
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../utils/apiService';
import { API_ENDPOINTS } from '../../utils/endPoints';
interface rideData {
  ride_id: string;
  customer_id: string;
  driver_id: string;
  pickup_location: string;
  pickup_latitude: string;
  pickup_longitude:string;
  distance_km:string;
  drop_location: string;
  drop_latitude: string;
  drop_longitude: string;
  estimated_time: number;
  estimated_fare: string;
  fare_discount: string;
  city_id: string;
  zone_id: string;
  ride_status: string;
  created_at: string;
  updated_at:string;
  vehicle_type_id:string;
  pickup_locality: string;
  drop_locality:string;
  canceled_user_type: string;
  canceled_by:string;
  canceled_reason:string;



}

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {
  
  dashboardTitle: string = '';
  someData: string = '0';
  rideDetails: rideData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'RIDE-DETAILS';
    this.getRideDetails();
  }

  getRideDetails() {
    this.apiService.getApi<any[]>(API_ENDPOINTS.GET_RIDE_DETAILS).subscribe({
      next: (data: any) => {
        console.log('Success:', data);
        if (data && Array.isArray(data.result)) {
          this.rideDetails = data.result;
          this.totalDocuments = this.rideDetails.length;
          console.log('rideDetails List:', this.rideDetails);
        } else {
          console.error(
            'The API response does not contain a valid "result" array:',
            data
          );
          this.rideDetails = [];
        }
      },
      error: (error) => {
        console.error('Error fetching rides:', error);
      },
    });
  }
  viewRideDetails(ride_id: string) {
    // Navigate to the ride details page with the rideId
    this.router.navigate([`/ride-details/${ride_id}`]);
  }
  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getRideDetails(); // Fetch new page data
  }

}  

  
  