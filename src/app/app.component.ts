import { Component,Input, OnInit } from '@angular/core';
import { AuthService } from '../app/utils/authService'; // Import the AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',


  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // constructor(private router: Router) {}

  // getLoginData(): boolean {
  //   return this.router.url === '/login'; 
  // }

  showFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Adjust this condition based on your route names
      this.showFooter = this.router.url !== '/login';
    });
  }
}
