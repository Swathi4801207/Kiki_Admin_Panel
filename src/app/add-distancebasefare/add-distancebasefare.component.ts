import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-distancebasefare',
 
  templateUrl: './add-distancebasefare.component.html',
  styleUrl: './add-distancebasefare.component.css'
})
export class AddDistancebasefareComponent implements OnInit {
    dashboardTitle: string = '';
    someData: string = '0';
 
    baseFare: any = null; 
    perkmRate: any = null; 
    permRate:any = null;
    upto_km:any = null;
    baseFareAmount: any = null; 
    platformFee: any = null; 
    // icon: any = null; 
       
  distancebaseFareForm!: FormGroup;
  distancebaseFares = [
    { id: 1, name: 'Standard' },
    { id: 2, name: 'Premium' },
    { id: 3, name: 'Luxury' }
  ];
  apiUrl = 'https://your-api-endpoint.com/basefare'; // Replace with your actual API URL

  // selectedFile: File | null = null;
  ngOnInit(): void {
    this.dashboardTitle = 'ADD-DISTANCEBASEFARE';

  
    this.distancebaseFareForm = this.formBuilder.group({
      baseFare: ['', Validators.required],
      perkmRate: ['', [Validators.required, Validators.min(1)]],
      permRate: ['', [Validators.required, Validators.min(1)]],
      upto_km: ['', [Validators.required, Validators.min(1)]],
      baseFareAmount: ['', [Validators.required, Validators.min(0)]],
      platformFee: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // Percentage range 0-100

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
    if (this.distancebaseFareForm.valid) {
      const formData = this.distancebaseFareForm.value;
      console.log('Form Submitted:', formData);

      

      const body = {
        baseFare: this.distancebaseFareForm.get('baseFare')?.value,
        perkmRate:this.distancebaseFareForm.get('perkmRate')?.value,
        permRate: this.distancebaseFareForm.get('permRate')?.value,
        upto_km:this.distancebaseFareForm.get('upto_km')?.value,
        baseFareAmount: this.distancebaseFareForm.get('baseFareAmount')?.value,
        platformFee: this.distancebaseFareForm.get('platformFee')?.value,
        
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body,API_ENDPOINTS.INSERT_DISTANCE_BASEFARE)
        .subscribe({
          next: (data: any) => {
            const msg = data.message;
            this.openSnackBar(msg, 'OKAY');
            console.log('Success:', msg);
            setTimeout(() => {
              this.router.navigate(['/distancebasefare']);
            }, 2000); // Adjust the delay as needed (in milliseconds)
          },
          error: (error) => {
            console.error('Error fetching basefares:', error);
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



