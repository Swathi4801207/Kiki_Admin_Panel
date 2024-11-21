import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../utils/apiService';

@Component({
  selector: 'samurai-list',
  templateUrl: './list-samurai.html',
  styleUrls: ['./list-samurai.css'],
})
export class ListSamurai implements OnInit {
  page = 1;
  samuraisList: Samurai[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Output() samuraiSelected = new EventEmitter<any>();
  selectedSamurai: any = null;

  ngOnInit(): void {
    this.getSamurais();
  }

  getSamurais() {
    this.apiService
      .getApi<any[]>('/samurai/samuraisList?role=Samurai')
      .subscribe({
        next: (data: any) => {
          console.log('Success:', data);
          if (data && Array.isArray(data.result)) {
            // Assign the "result" array to samurais list
            this.samuraisList = data.result;
            console.log('Samurais List:', this.samuraisList);

            this.selectSamurai(this.samuraisList[0]);
          } else {
            // Handle the case where the "result" array is not present
            console.error(
              'The API response does not contain a valid "result" array:',
              data
            );
            this.samuraisList = []; // Initialize as empty if no valid data
          }
        },
        error: (error) => {
          console.error('Error fetching samurais:', error);
        },
      });
  }

  selectedApplication: any;

  selectSamurai(application: any) {
    console.log('clicked==>', application);
    this.samuraiSelected.emit(application);
    this.selectedSamurai;
  }

  getVehicleImage(vehicleType: string): string {
    switch (vehicleType) {
      case 'Bike':
        return 'assets/bike_icon.svg';
      case 'Auto':
        return 'assets/auto_icon.svg';
      default:
        return 'assets/bike_icon.svg'; // Default image if vehicle_type is null or unrecognized
    }
  }
}

interface Samurai {
  id: string;
  role: string;
  phone_number: string;
  active: number;
  created_by: string;
  full_name: string;
  email: string;
  profile_picture_url: string;
  vehicle_type: string;
  vehicle_number: string;
}
