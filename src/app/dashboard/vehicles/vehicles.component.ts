import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface VehicleData {
  id: string;
 vehicle_name: string;
  no_of_persons: string;
 service_name: string;
status: string;
icon: string;
}

@Component({
  selector: 'app-vehicles',
  
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
 })
  export class VehiclesComponent implements OnInit {

 
  
  dashboardTitle: string = '';
  someData: string = '0';

  vehicleList: VehicleData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'VEHICLES';
    this.getVehicles();
  }
  getVehicles() {
    const payload = {
      role: 'Admin'
    };
  
    this.apiService.postApi<any[]>(API_ENDPOINTS.GET_VEHICLES).subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Log the full API response
        if (data && Array.isArray(data.result)) {
          this.vehicleList = data.result;
          this.totalDocuments = this.vehicleList.length;
          console.log('vehicleList:', this.vehicleList);
        } else {
          console.error('The API response does not contain a valid "result" array:', data);
          this.vehicleList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching vehicle:', error);
      },
    });
  }
  
  

  navigateTo(endPoint: string) {
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getVehicles();
  }
}
