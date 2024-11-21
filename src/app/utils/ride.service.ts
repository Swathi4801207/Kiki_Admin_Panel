import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ride {
    ride_id: string;
    customer_id: string;
    city_id    : string;
    created_at  : string;
   distance_km : string;
   driver_id  : string;
   drop_latitude : string;
   drop_location  : string;
  drop_longitude : string;
  estimated_fare : number;
 estimated_time : number;
fare_discount : string;
 pickup_latitude : string;
 pickup_location : string;
 pickup_longitude : string;
 ride_status : string;
 updated_at : string;
 vehicle_type_id: number;
 zone_id :number;
    
    
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

