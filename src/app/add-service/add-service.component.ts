 
import { Component, OnInit, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-add-service',
   
  templateUrl: './add-service.component.html',
     styleUrl: './add-service.component.css'
   })
  export class AddServiceComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  
 

  name: any = null; 
  type: any = null; 
  priority: any = null; 
  status: any = null; 
  home_title: any = null; 
  

  serviceForm!: FormGroup;
  types = [
    { id: 1, name: 'Login' },
    { id: 2, name: 'Ride Management' },
   
  ];
  

  apiUrl = 'https://your-api-endpoint.com/admin'; // Replace with your actual API URL


  ngOnInit(): void {
    this.dashboardTitle = 'ADD-SERVICE';
   

    this.serviceForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        type: ['', [Validators.required, Validators.email]],
        priority: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      status: ['', Validators.required],
        
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
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      console.log('Form Submitted:', formData);

      

      const body = {
        name: this.serviceForm.get('name')?.value,
        type: this.serviceForm.get('type')?.value,
        priority: this.serviceForm.get('priority')?.value,
        home_title: this.serviceForm.get('home_title')?.value,
        
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body,API_ENDPOINTS.INSERT_SERVICE)
        .subscribe({
          next: (data: any) => {
            const msg = data.message;
            this.openSnackBar(msg, 'OKAY');
            console.log('Success:', msg);
            setTimeout(() => {
              this.router.navigate(['/services']);
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

