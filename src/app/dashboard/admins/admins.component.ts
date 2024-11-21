import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  
} from '@angular/core';
import { ApiService } from '../../utils/apiService';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../utils/endPoints';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { delay } from 'rxjs';


export interface admin {
  full_name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-admins',
  
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  adminList: admin[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of documents per page
  totalDocuments: number = 0;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'ADMINS';
    this.getAdmins();
  }

  editAdmin(admin: any) {
    console.log('Editing admin:', admin);
    // Add logic to open an edit form or modal with employee details
  }
  deleteAdmin(admin: any) {
    console.log('Deleting admin:', admin);
    // Add logic to confirm deletion and call an API or service method to delete the employee
  }
  // Method for fetching employees
  

  getAdmins() {
    this.apiService.getApi<any[]>(API_ENDPOINTS.GET_ADMINS).subscribe({
      next: (data: any) => {
        console.log('Success:', data);
        if (data && Array.isArray(data.result)) {
          this.adminList = data.result;
          this.totalDocuments = this.adminList.length;
          console.log('adminList List:', this.adminList) ;
        } else {
          console.error(
            'The API response does not contain a valid "result" array:',
            data
          );
          this.adminList = [];
        }
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
      },
    });
  }

  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getAdmins(); // Fetch new page data
  }

}