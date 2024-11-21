 import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-city',
    
    templateUrl: './add-city.component.html',
     styleUrl: './add-city.component.css'
   })
   export class AddCityComponent implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  selectedState: string = ''; 

  city_name: any = null; 
  city_code: any = null; 
  state:any = null;
  status: any = null; 
  radius_km: any = null; 
  // icon: any = null; 
     
cityForm!: FormGroup;

apiUrl = 'https://your-api-endpoint.com/add-city'; // Replace with your actual API URL

// selectedFile: File | null = null;
ngOnInit(): void {
  this.dashboardTitle = 'ADD-CITY';


  this.cityForm = this.formBuilder.group({
    city_name: ['', Validators.required],
    city_code: ['', [Validators.required, Validators.min(1)]],
    state: ['', [Validators.required, Validators.min(1)]],
  status: ['', [Validators.required, Validators.min(0)]],
  radius_km: ['', [Validators.required, Validators.min(0)]],
    // icon: ['', Validators.required]
  });
}

constructor(
  private http: HttpClient,
  private formBuilder: FormBuilder,
  private apiService: ApiService,
  private router: Router,
  private snackbar: MatSnackBar
) {}

// onFileChange(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     this.selectedFile = input.files[0];
//   }
// }

onSubmit() {
  if (this.cityForm.valid) {
    const formData = this.cityForm.value;
    console.log('Form Submitted:', formData);

    

    const body = {
      city_name: this.cityForm.get('city_name')?.value,
      city_code:this.cityForm.get('city_code')?.value,
      state: this.cityForm.get('state')?.value,
      status: this.cityForm.get('status')?.value,
      radius_km: ['', [Validators.required, Validators.min(0)]], 

      
    };

    console.log('DATA==>', body);

    this.apiService
      .listApiWithParams(body,API_ENDPOINTS.INSERT_CITY)
      .subscribe({
        next: (data: any) => {
          const msg = data.message;
          this.openSnackBar(msg, 'OKAY');
          console.log('Success:', msg);
          setTimeout(() => {
            this.router.navigate(['/basefares']);
          }, 2000); // Adjust the delay as needed (in milliseconds)
        },
        error: (error) => {
          console.error('Error fetching cities:', error);
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



 