import {  OnInit,signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.css'],
})
export class NavBarComponent implements OnInit {
    
  showCustomText: boolean[] = [false, false]; // Initialize an array for each list item

  toggleCustomText(index: number) {
    this.showCustomText[index] = !this.showCustomText[index];
  }
  ngOnInit(): void {}

  selectedItem: number = 0; // Initially no item selected

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // Determine the selected item based on the route
        this.selectedItem = this.getSelectedPage(event.url);
      });
  }

  getSelectedPage(url: string): number {
    // Parse the URL or use any logic to determine the selected page
    if (url.includes('/dashboard')) {
      return 1;
    } else if (url.includes('/drivers')) {
      return 2;
    }  else if (url.includes('/driver-details')) {
      return 2;
    }else if (url.includes('/customers')) {
      return 3;
    }else if (url.includes('/admins')) {
      return 4;
    }else if (url.includes('/vehicles')) {
      return 5;
    }else if (url.includes('/add-vehicle')) {
      return 5;
    }else if (url.includes('/rides')) {
      return 6;
    }else if (url.includes('/cities')) {
      return 7;
    }else if (url.includes('/add-city')) {
      return 7;
    }else if (url.includes('/zones')) {
      return 8;
    }else if (url.includes('/services')) {
      return 9;
    }else if (url.includes('/add-service')) {
      return 9;
    }else if (url.includes('/basefares')) {
      return 10;
    }else if (url.includes('/add-basefare')) {
      return 10;
    }else if (url.includes('/distancebasefare')) {
      return 11;
    }else if (url.includes('/add-distancebasefare')) {
      return 11;
    }else if (url.includes('/cancel-reasons')) {
      return 12;
    }else if (url.includes('/add-cancel-reasons')) {
      return 12;
    }else if (url.includes('/ratecard')) {
      return 13;
    }
    // Add other pages similarly
    return 0; // Default if no page matches
  }

  logout() {
    //this.service.logout();
    this.router.navigate(['/login']);
  }
}
import { Component } from '@angular/core';


export class DashboardComponent {

  


  selectedItem = 0; // Default selected item, e.g., Dashboard

// Set selected item on navigation
onNavItemClick(item: number): void {
  this.selectedItem = item;
}
}
