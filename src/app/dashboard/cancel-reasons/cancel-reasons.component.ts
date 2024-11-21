 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface CancelData {
  id: string;
 service_icon: string;
  canceled_reason: string;
 sub_reason: string;
 service_list: string;
status: string;

}

@Component({
  selector: 'app-cancel-reasons',
  
  templateUrl: './cancel-reasons.component.html',
  styleUrl: './cancel-reasons.component.css'
 })
 export class CancelReasonsComponent implements OnInit {

 
  
  dashboardTitle: string = '';
  someData: string = '0';

  cancelList: CancelData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'CANCEL-REASONS';
    this.getReasons();
  }
  getReasons() {
    const payload = {
      role: 'Admin'
    };
  
    this.apiService.postApi<any[]>(API_ENDPOINTS.GET_REASONS).subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Log the full API response
        if (data && Array.isArray(data.result)) {
          this.cancelList = data.result;
          this.totalDocuments = this.cancelList.length;
          console.log('cancelList:', this.cancelList);
        } else {
          console.error('The API response does not contain a valid "result" array:', data);
          this.cancelList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching reasons:', error);
      },
    });
  }
  
  

  navigateTo(endPoint: string) {
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getReasons();
  }
}
