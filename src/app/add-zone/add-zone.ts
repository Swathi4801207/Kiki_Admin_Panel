import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/endPoints';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../utils/apiService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-zone',
  templateUrl: './add-zone.html',
  styleUrl: './add-zone.css',
})
export class AddZone implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';

  title = 'Select Zone Cooridnates';
  center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
  zoom = 15; // Default zoom level
  markerPosition: google.maps.LatLngLiteral | null = null; // Position for the marker
  coordinates: { lat: number; lng: number } | null = null;

  addressDetails: any = null; // To store address details
  postalCode: any = null; // To store postal
  zoneName: any = null; // To store zone
  city: any = null; // To store city
  district: any = null; // To store city
  state: any = null; // To store city

  zoneForm!: FormGroup;

  ngOnInit(): void {
    this.dashboardTitle = 'ADD-ZONE';
    this.getCurrentLocation();

    this.zoneForm = this.formBuilder.group({
      zone_name: ['', Validators.required],
      zone_code: ['', Validators.required],
      city_name: ['', Validators.required],
      radius_km: ['', Validators.required],
    });
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  // Get the user's current location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markerPosition = this.center; // Set marker position to current location

          this.getAddressDetails(this.center);
        },
        (error) => {
          console.error('Error getting location', error);
          // Fallback to a default location (optional)
          this.center = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to a default location (optional)
      this.center = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
    }
  }

  // Method to handle map clicks
  onMapClick(event: any) {
    const latLng = event.latLng;
    if (latLng) {
      this.markerPosition = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };

      this.getAddressDetails(this.markerPosition);

      this.coordinates = {
        lat: this.markerPosition.lat,
        lng: this.markerPosition.lng,
      };
    }
  }

  getAddressDetails(latLng: google.maps.LatLngLiteral) {
    const apiKey = API_ENDPOINTS.MAP_KEY; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${apiKey}`;

    this.http.get(url).subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          this.addressDetails = response.results[0].address_components;
          this.extractAddress(this.addressDetails);
        } else {
          console.error('No address found');
        }
      },
      (error) => {
        console.error('Error fetching address details', error);
      }
    );
  }

  extractAddress(addressComponents: any) {
    console.log('addressComponents', addressComponents);
    this.zoneName = addressComponents[1].long_name;
    const postalCodeComponent = addressComponents.find((component: any) =>
      component.types.includes('postal_code')
    );

    const sublocalityComponent = addressComponents.find(
      (component: any) =>
        component.types.includes('sublocality') ||
        component.types.includes('sublocality_level_1')
    );

    const cityComponent = addressComponents.find(
      (component: any) =>
        component.types.includes('locality') ||
        component.types.includes('administrative_area_level_1')
    );

    const stateComponent = addressComponents.find((component: any) =>
      component.types.includes('administrative_area_level_1')
    );

    this.state = stateComponent ? stateComponent.long_name : null;

    const districtComponent = addressComponents.find((component: any) =>
      component.types.includes('administrative_area_level_2')
    );

    if (!districtComponent) {
      const fallbackComponent = addressComponents.find(
        (component: any) =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1')
      );
      this.district = fallbackComponent ? fallbackComponent.long_name : null;
    } else {
      this.district = districtComponent.long_name;
    }

    this.zoneName = sublocalityComponent
      ? sublocalityComponent.long_name
      : null;

    this.postalCode = postalCodeComponent
      ? postalCodeComponent.long_name
      : null;

    this.city = cityComponent ? cityComponent.long_name : null;
    console.log(
      `address ${this.postalCode} ${this.zoneName} ${this.city} ${this.district} ${this.state}`
    );
  }

  onSubmit() {
    if (this.zoneForm.valid) {
      const formData = this.zoneForm.value;
      console.log('Form Submitted:', formData);

      const latitudeStr: string = this.markerPosition!!.lat + '';
      const langitudeStr: string = this.markerPosition!!.lng + '';

      const body = {
        zone_name: this.zoneForm.get('zone_name')?.value,
        zone_code: this.zoneForm.get('zone_code')?.value,
        city_name: this.zoneForm.get('city_name')?.value,
        city_id: this.zoneForm.get('city_name')?.value,
        district: this.district,
        district_id: this.district,
        state: this.state,
        state_id: this.state,
        center_latitude: latitudeStr,
        center_longitude: langitudeStr,
        radius_km: this.zoneForm.get('radius_km')?.value,
      };

      console.log('DATA==>', body);

      this.apiService
        .listApiWithParams(body, API_ENDPOINTS.INSERT_ZONE)
        .subscribe({
          next: (data: any) => {
            const msg = data.message;
            this.openSnackBar(msg, 'OKAY');
            console.log('Success:', msg);
            setTimeout(() => {
              this.router.navigate(['/zones']);
            }, 2000); // Adjust the delay as needed (in milliseconds)
          },
          error: (error) => {
            console.error('Error fetching samurais:', error);
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
