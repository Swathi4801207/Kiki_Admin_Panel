import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
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
    selector: 'app-rides',
    templateUrl: './rides.component.html',
  
    styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  ridesList: rideData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'RIDES';
    this.getRides();
  }

  getRides() {
    this.apiService.getApi<any[]>(API_ENDPOINTS.GET_RIDES).subscribe({
      next: (data: any) => {
        console.log('Success:', data);
        if (data && Array.isArray(data.result)) {
          this.ridesList = data.result;
          this.totalDocuments = this.ridesList.length;
          console.log('ridesList List:', this.ridesList);
        } else {
          console.error(
            'The API response does not contain a valid "result" array:',
            data
          );
          this.ridesList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching rides:', error);
      },
    });
  }
  viewRideDetails(id: string) {
    // Navigate to the ride details page with the rideId
    this.router.navigate([`/ride-details/${id}`]);
  }
  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getRides(); // Fetch new page data
  }

}  

  
  