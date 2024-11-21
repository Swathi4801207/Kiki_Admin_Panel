import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface ZoneData {
  zone_id: string;
  zone_name: string;
  zone_code: string;
  city_name: string;
  city_id: string;
  district: string;
  district_id: string;
  state: string;
  state_id: string;
  center_latitude: string;
  radius_km: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'zones',
  templateUrl: './zones.html',
  styleUrls: ['./zones.css'],
})
export class ZonesComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  zoneList: ZoneData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'ZONES';
    this.getZones();
  }

  getZones() {
    this.apiService.getApi<any[]>(API_ENDPOINTS.GET_ZONES).subscribe({
      next: (data: any) => {
        console.log('Success:', data);
        if (data && Array.isArray(data.result)) {
          this.zoneList = data.result;
          this.totalDocuments = this.zoneList.length;
          console.log('zonesList List:', this.zoneList);
        } else {
          console.error(
            'The API response does not contain a valid "result" array:',
            data
          );
          this.zoneList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching samurais:', error);
      },
    });
  }

  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getZones(); // Fetch new page data
  }

}
