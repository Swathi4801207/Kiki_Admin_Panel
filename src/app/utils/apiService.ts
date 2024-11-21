import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Content-Type': 'application/x-www-form-urlencoded',
    // 'Authorization': 'Bearer your-token' // Uncomment if needed
  });

  constructor(private http: HttpClient) {}

  // Generic GET request
  getApi<T>(apiName: string): Observable<T> {
    return this.http
      .get<T>(`${environment.apiUrl}${apiName}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  postApi<T>(apiName: string): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrl}${apiName}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  putAPI(endPoint: string, rawdata: any): Observable<any> {
    console.log('putAPI==>', `${environment.apiUrl}${endPoint}`);
    return this.http.put(`${environment.apiUrl}${endPoint}`, rawdata);
  }

  updateDocStatus(
    documentId: string,
    status: number,
    reason: string
  ): Observable<any> {
    const url = `${environment.apiUrl}/samurai/documents/${documentId}/status`;
    const body = { document_status: status, reason: reason };
    return this.http.put(url, body);
  }

  approveAccount(userId:string
  ): Observable<any> {
    const url = `${environment.apiUrl}/samurai/accounts/${userId}/active`;
    const body = { active: 1 };
    return this.http.put(url, body);
  }


  listApiWithParams(body: any, apiName: string): Observable<any> {
    const fullUrl = `${environment.apiUrl}${apiName}`;
    console.log('Full URL:', fullUrl);

    return this.http
      .post(`${fullUrl}`, body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // POST request with parameters
  postAPI(
    paramsObj: { [key: string]: string },
    endPoint: string
  ): Observable<any> {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }

    const body = params.toString();
    return this.http
      .post<any>(`${environment.apiUrl}${endPoint}`, body, {
        headers: this.headers,
      })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Centralized error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(errorMessage);
  }
}

// import { HttpClient, HttpHeaders,HttpParams,HttpErrorResponse  } from '@angular/common/http';
// import { BehaviorSubject, Observable,throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/operators';
// import { environment } from './environment';

// //const BASE_API = 'http://65.1.68.43:5000/samurai/';
// // const headers = new HttpHeaders({
// //   'Content-Type': 'application/json',
// // });

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {

//   private headers = new HttpHeaders({
//     // Add any custom headers here
//     'Content-Type': 'application/json',
//     // 'Authorization': 'Bearer your-token' // Uncomment if needed
//   });

//   getApi<T>(apiName: string): Observable<T> {
//     return this.http.get<T>(`${environment.apiUrl}${apiName}`, { headers: this.headers });
//   }

//   constructor(private http: HttpClient) {}
//   //getApi(apiName:string): Observable<any>{
//   //  return this.http.get(environment.apiUrl + apiName,{ headers });
//   //}

//   listApiWithParms(body:URLSearchParams,apiName:string): Observable<any>{
//     return this.http.post(`${environment.apiUrl}${apiName}`, body.toString(), { headers: this.headers });
//   }

//   postAPI(paramsObj: { [key: string]: string }, endPoint: string): Observable<any> {
//     let params = new HttpParams();
//     for (const key in paramsObj) {
//       if (paramsObj.hasOwnProperty(key)) {
//         params = params.set(key, paramsObj[key]);
//       }
//     }

//     const body = params.toString();
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(`${environment.apiUrl}${endPoint}`, body, { headers: this.headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: any) {
//     console.error('An error occurred:', error);
//     return throwError(error.message || 'Server error');
//   }

//   // logout(): void {
//   //   localStorage.removeItem(this.isAuthenticatedKey);
//   // }

//   // isAuthenticatedUser(): boolean {
//   //   return localStorage.getItem(this.isAuthenticatedKey) === 'true';
//   // }
// }
