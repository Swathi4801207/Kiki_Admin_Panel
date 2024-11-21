import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../utils/apiService';
import { API_ENDPOINTS } from '../utils/endPoints';
import { AuthService } from '../utils/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  inputVisible: boolean = false;
  btnText: string = 'Get Otp';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private api: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mobile_number: ['', Validators.required],
      otp_str: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.inputVisible) {
      const mobileStr = this.loginForm.get('mobile_number')?.value;
      if (mobileStr != '' && mobileStr != null) {
        this.openSnackBar('Otp Sent Successfully....');
        this.inputVisible = true;
        setTimeout(() => {
          this.btnText = 'Proceed';
        }, 500);
      } else {
        this.openSnackBar('Enter Mobile Number');
      }
    } else {
      const otpStr = this.loginForm.get('otp_str')?.value;
      console.log("validate==>",otpStr+" ")
      this.callAPI();
      // if (otpStr && otpStr === "000000") {
      //   this.callAPI();
      // } else if (!otpStr) {
      //   this.openSnackBar('Please enter an OTP.');
      // } else {
      //   this.openSnackBar('Enter a valid OTP.');
      // }
    }
  }

  callAPI() {
    const body = {
      phone_number: this.loginForm.get('mobile_number')?.value,
      role: 'Admin',
    };

    this.api.listApiWithParams(body, API_ENDPOINTS.LOGIN).subscribe({
      next: (data: any) => {

        console.log('Success:', data.statusCode);
        const statusCode = data.statusCode;
        if (statusCode === 1) {
          this.authService.saveLoginData(data.result);
          this.navigateTo('/dashboard');
        }else{
          const msg = data.message;
        this.openSnackBar(msg);
        }
      },
      error: (error) => {
        console.error('Error fetching samurais:', error);
      },
    });
  }

  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }

  // Function to open snackbar
  openSnackBar(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2000, // Duration of the snackbar in milliseconds
      horizontalPosition: 'right', // Snackbar position
      verticalPosition: 'bottom', // Snackbar position
    });
  }
}
