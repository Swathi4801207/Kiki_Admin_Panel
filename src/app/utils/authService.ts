import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginDataKey = 'loginData';

  saveLoginData(data: any) {
    localStorage.setItem(this.loginDataKey, JSON.stringify(data));
  }

  getLoginData() {
    const data = localStorage.getItem(this.loginDataKey);
    return data ? JSON.parse(data) : null;
  }

  clearLoginData() {
    localStorage.removeItem(this.loginDataKey);
  }
}
