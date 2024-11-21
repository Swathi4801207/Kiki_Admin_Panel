import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface ServiceData {
  id: string;
  name: string;
  type: string;
  priority: string;
  icon: string;
}
@Component({
   selector: 'app-services',
  templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
  })
export class ServicesComponent implements OnInit {
dashboardTitle: string = '';
  someData: string = '0';

  serviceList: ServiceData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'SERVICES';
    this.getServices();
  }
  getServices() {
    const payload = {
      role: 'Admin'
    };
  
    this.apiService.postApi<any[]>(API_ENDPOINTS.GET_SERVICES).subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Log the full API response
        if (data && Array.isArray(data.result)) {
          this.serviceList = data.result;
          this.totalDocuments = this.serviceList.length;
          console.log('serviceList:', this.serviceList);
        } else {
          console.error('The API response does not contain a valid "result" array:', data);
          this.serviceList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching basefare:', error);
      },
    });
  }
  
  

  navigateTo(endPoint: string) {
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getServices();
  }
}

