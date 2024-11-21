import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrl: './add-admin.component.css'
  })
export class AddAdminComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  
 

  full_name: any = null; 
  email: any = null; 
  phone: any = null; 
  gender: any = null; 
  dob: any = null; 
  employee: any = null; 

  adminForm!: FormGroup;
  employees = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Super Admin' },
   
  ];
  apiUrl = 'https://your-api-endpoint.com/admin'; // Replace with your actual API URL


  ngOnInit(): void {
    this.dashboardTitle = 'ADD-ADMIN';
   

    this.adminForm = this.formBuilder.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        employee: ['', Validators.required]
    });
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  
  // Method to handle map clicks
  

  

  
  onSubmit() {
    if (this.adminForm.valid) {
      const formData = this.adminForm.value;
      console.log('Form Submitted:', formData);

      

      const body = {
        full_name: this.adminForm.get('full_name')?.value,
        email: this.adminForm.get('email')?.value,
        phone: this.adminForm.get('phone')?.value,
        gender: this.adminForm.get('gender')?.value,
        dob: this.adminForm.get('dob')?.value,
        employee: this.adminForm.get('employee')?.value,
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body,API_ENDPOINTS.INSERT_ADMIN)
        .subscribe({
          next: (data: any) => {
            const msg = data.message;
            this.openSnackBar(msg, 'OKAY');
            console.log('Success:', msg);
            setTimeout(() => {
              this.router.navigate(['/admins']);
            }, 2000); // Adjust the delay as needed (in milliseconds)
          },
          error: (error) => {
            console.error('Error fetching admins:', error);
          },
        });
    }
  }

  // Function to open snackbar
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, undefined, {
      duration: 2000, // Duration of the snackbar in milliseconds
      horizontalPosition: 'right', // Snackbar position
      verticalPosition: 'bottom', // Snackbar position
    });
  }
}
