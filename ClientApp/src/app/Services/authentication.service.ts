import { Injectable } from '@angular/core';
import { HttpParams, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    let a1 = { UserName: username, Password: password, Id: 1 };
    let a = { UserName: "Jignesh", Password: "111", Id: 1 };
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any>('/api/login', JSON.stringify(a1), { headers: headers }).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('TokenInfo', JSON.stringify(user));
      }
      return user;
    }));
    alert("servie error")
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  logout() {
    localStorage.removeItem('TokenInfo');
  }
}
