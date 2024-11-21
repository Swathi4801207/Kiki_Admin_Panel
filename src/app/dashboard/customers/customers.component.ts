import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';

interface CustomerData {
  id: string;
  role: string;
  phone_number: string;
  active: number;
  created_by: string;
  full_name: string;
  email: string;
  profile_picture_url: string;
  vehicle_type: string;
  vehicle_number: string;

}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';
 samuraiData: any;
  CustomerList: CustomerData[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {
    this.dashboardTitle = 'SAMURAI USERS';
    this.getSamuraisAsUsers();
  }
  

 

  // Fetch samurai data and use it as user data
  getSamuraisAsUsers() {
    this.apiService.getApi<any[]>('/samurai/samuraisList?role=Samurai').subscribe({
      next: (data: any) => {
        if (data && Array.isArray(data.result)) {
          this.CustomerList = data.result;
          this.totalDocuments = this.CustomerList.length;
          console.log('Samurai User List:', this.CustomerList);
        } else {
          console.error('Invalid data format:', data);
          this.CustomerList = [];
        }
      },
      error: (error) => console.error('Error fetching samurais:', error),
    });
  }

  navigateTo(endPoint: string) {
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getSamuraisAsUsers(); // Fetch new page data if paginated from backend
  }
  
  }


