import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-add-basefare',
    
 templateUrl: './add-basefare.component.html',
     styleUrl: './add-basefare.component.css'
   })
   export class AddBasefareComponent implements OnInit {
    dashboardTitle: string = '';
    someData: string = '0';
 
    baseFare: any = null; 
    perkmRate: any = null; 
    permRate:any = null;
    baseFareAmount: any = null; 
    platformFee: any = null; 
    // icon: any = null; 
       
  baseFareForm!: FormGroup;
  baseFares = [
    { id: 1, name: 'Standard' },
    { id: 2, name: 'Premium' },
    { id: 3, name: 'Luxury' }
  ];
  apiUrl = 'https://your-api-endpoint.com/basefare'; // Replace with your actual API URL

  // selectedFile: File | null = null;
  ngOnInit(): void {
    this.dashboardTitle = 'ADD-BASEFARE';

  
    this.baseFareForm = this.formBuilder.group({
      baseFare: ['', Validators.required],
      perkmRate: ['', [Validators.required, Validators.min(1)]],
      permRate: ['', [Validators.required, Validators.min(1)]],
      baseFareAmount: ['', [Validators.required, Validators.min(0)]],
      platformFee: ['', [Validators.required, Validators.min(0)]],
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
    if (this.baseFareForm.valid) {
      const formData = this.baseFareForm.value;
      console.log('Form Submitted:', formData);

      

      const body = {
        baseFare: this.baseFareForm.get('baseFare')?.value,
        perkmRate:this.baseFareForm.get('perkmRate')?.value,
        permRate: this.baseFareForm.get('permRate')?.value,
        baseFareAmount: this.baseFareForm.get('baseFareAmount')?.value,
        platformFee: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // Percentage range 0-100

        
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body,API_ENDPOINTS.INSERT_BASEFARE)
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


