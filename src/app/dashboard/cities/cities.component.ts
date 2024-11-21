import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface CityData {
  city_id: string;
  city_name: string;
  city_code: string;
  state: string;
  state_id: string;
  district: string;
  district_id: string;
 
  center_latitude: string;
  radius_km: string;
  created_at: string;
  updated_at: string;
}

@Component({
    selector: 'app-cities',
    
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
  })
  export class CitiesComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  cityList: CityData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'CITIES';
    this.getCities();
  }

  getCities() {
    this.apiService.getApi<any[]>(API_ENDPOINTS.GET_CITIES).subscribe({
      next: (data: any) => {
        console.log('Success:', data);
        if (data && Array.isArray(data.result)) {
          this.cityList = data.result;
          this.totalDocuments = this.cityList.length;
          console.log('citiesList List:', this.cityList);
        } else {
          console.error(
            'The API response does not contain a valid "result" array:',
            data
          );
          this.cityList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
      },
    });
  }

  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getCities(); // Fetch new page data
  }

}
