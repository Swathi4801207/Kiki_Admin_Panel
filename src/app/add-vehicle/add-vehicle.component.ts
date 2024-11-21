// {

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../utils/authService';
import { UserService } from '../user.service';

@Component({
 selector: 'app-add-vehicle',
 
  templateUrl: './add-vehicle.component.html',
   styleUrl: './add-vehicle.component.css'
  })
  export class AddVehicleComponent implements OnInit {

    imagePreview: string | null = null; // Add this property
    selectedImage: File | null = null;
  dashboardTitle: string = '';
  someData: string = '0';
  services = [
   'AuthService','UserService','PasswordService','Ride Management Service' 
   
  ];
  
 icon: any = null;
 vehicle_name: any = null; 
  no_of_persons: any = null; 
  service_name: any = null; 
  status: any = null; 
 

  vehicleForm!: FormGroup;
 
  apiUrl = 'https://your-api-endpoint.com/add-vehicle'; // Replace with your actual API URL


  ngOnInit(): void {
    this.dashboardTitle = 'ADD-VEHICLE';

    this.vehicleForm = this.formBuilder.group({
      icon: ['', Validators.required],
       vehicle_name: ['', [Validators.required, Validators.minLength(3)]],
       no_of_persons: ['', [Validators.required]],
   service_name: ['', [Validators.required]],
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

   // Handle image file selection
   onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imagePreview = reader.result; // Safe assignment
        }
      };
      reader.readAsDataURL(file);
    }
  }
  


 

  

  
  onSubmit() {
    if (this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      console.log('Form Submitted:', formData);

      

      const body = {
        vehicle_name: this.vehicleForm.get('vehicle_name')?.value,
       no_of_persons: this.vehicleForm.get('no_of_persons')?.value,
       service_name: this.vehicleForm.get('service_name')?.value,
        status: this.vehicleForm.get('status')?.value,
        icon: this.vehicleForm.get('icon')?.value,
        
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body,API_ENDPOINTS.INSERT_VEHICLE)
        .subscribe({
          next: (data: any) => {
            const msg = data.message;
            this.openSnackBar(msg, 'OKAY');
            console.log('Success:', msg);
            setTimeout(() => {
              this.router.navigate(['/vehicles']);
            }, 2000); // Adjust the delay as needed (in milliseconds)
          },
          error: (error) => {
            console.error('Error fetching vehicles:', error);
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
