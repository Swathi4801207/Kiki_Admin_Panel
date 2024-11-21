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
  selector: 'app-add-cancel-reasons',
 
   templateUrl: './add-cancel-reasons.component.html',
  styleUrl: './add-cancel-reasons.component.css'
 })
export class AddCancelReasonsComponent implements OnInit {

    imagePreview: string | null = null; // Add this property
    selectedImage: File | null = null;
  dashboardTitle: string = '';
  someData: string = '0';
  services = [
   'AuthService','UserService','PasswordService','Ride Management Service' 
   
  ];
  
 service_icon: any = null;
 canceled_reason: any = null; 
  sub_reason: any = null; 
  service_list: any = null; 
  status: any = null; 
 

  cancelForm!: FormGroup;
 
  apiUrl = 'https://your-api-endpoint.com/add-cancel-reasons'; // Replace with your actual API URL


  ngOnInit(): void {
    this.dashboardTitle = 'ADD-CANCEL-REASONS';

    this.cancelForm = this.formBuilder.group({
     service_icon: ['', Validators.required],
       canceled_reason: ['', [Validators.required]],
      sub_reason: ['', [Validators.required]],
   service_list: ['', [Validators.required]],
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
    if (this.cancelForm.valid) {
      const formData = this.cancelForm.value;
      console.log('Form Submitted:', formData);

      

      const body = {
        service_icon: this.cancelForm.get('service_icon')?.value,
        canceled_reason: this.cancelForm.get('canceled_reason')?.value,
      sub_reason: this.cancelForm.get('sub_reason')?.value,
       service_list: this.cancelForm.get('service_list')?.value,
        status: this.cancelForm.get('status')?.value,
        
        
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body,API_ENDPOINTS.INSERT_CANCEL_REASONS)
        .subscribe({
          next: (data: any) => {
            const msg = data.message;
            this.openSnackBar(msg, 'OKAY');
            console.log('Success:', msg);
            setTimeout(() => {
              this.router.navigate(['/cancel-reasons']);
            }, 2000); // Adjust the delay as needed (in milliseconds)
          },
          error: (error) => {
            console.error('Error fetching reasons:', error);
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

