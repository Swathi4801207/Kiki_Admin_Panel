import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ride {
    RIDE_ID: string;
    CUSTOMER_ID: string;
    PICKUP_LOCATION: string;
    DROP_LOCATION: string;
    ESTIMATED_FARE: number;
    RIDE_STATUS: string;
    CREATED_AT: string;
  }

@Injectable({
    providedIn: 'root'
})
export class RideService {
    private apiUrl = 'http://65.1.68.43:5000/ride/ride/getAllRides';

    constructor(private http: HttpClient) {}
    getData(){
        return this.http.get('http://65.1.68.43:5000/ride/ride/getAllRides')
    }

   
    getRides(): Observable<Ride[]> {
        return this.http.get<Ride[]>(this.apiUrl);
      }
   

    
}

