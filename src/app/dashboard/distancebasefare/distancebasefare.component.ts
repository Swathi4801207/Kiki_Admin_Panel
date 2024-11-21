// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-distancebasefare',
  
//   templateUrl: './distancebasefare.component.html',
//   styleUrl: './distancebasefare.component.css'
// })
// export class DistancebasefareComponent {

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface DistanceBaseData {
  id: string;
  city_id: string;
  zone_id: string;
  vehicle_type_id: string;
  base_fare_amount: string;
  per_km_rate: string;
  per_minute_rate: string;
  upto_km: string;
  platform_fee: string;
  created_at: string;
  updated_at: string;
  icon_path: string;
}

@Component({
     selector: 'app-distancebasefare',
    
   templateUrl: './distancebasefare.component.html',
    styleUrl: './distancebasefare.component.css'
 })
 export class DistancebasefareComponent {

  
  
  dashboardTitle: string = '';
  someData: string = '0';

  distancebasefareList: DistanceBaseData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'DISTANCEBASEFARE';
    this.getDistanceBaseFares();
  }
  getDistanceBaseFares() {
    const payload = {
      role: 'Admin'
    };
  
    this.apiService.postApi<any[]>(API_ENDPOINTS.GET_DISTANCE_BASEFARES).subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Log the full API response
        if (data && Array.isArray(data.result)) {
          this.distancebasefareList = data.result;
          this.totalDocuments = this.distancebasefareList.length;
          console.log('distancebasefareList:', this.distancebasefareList);
        } else {
          console.error('The API response does not contain a valid "result" array:', data);
          this.distancebasefareList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching distance basefare:', error);
      },
    });
  }
  
  

  navigateTo(endPoint: string) {
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getDistanceBaseFares();
  }
}
