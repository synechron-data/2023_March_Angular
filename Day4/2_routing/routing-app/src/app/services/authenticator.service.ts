import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.accountUrl;
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.url, { username: username, password: password })
      .pipe(
        map(resObject => {
          if (resObject && resObject.token) {
            sessionStorage.setItem('syne-app-token', resObject.token);
          }
          return resObject;
        }),
        retry(3),
        catchError(this._handleError<any>('login', null))
      );
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (err: HttpErrorResponse): Observable<T> => {
      console.log(`${operation} failed: ${err.message}`);
      console.log(err);
      return throwError(() => err.error.message);
    }
  }

  getToken() {
    return sessionStorage.getItem('syne-app-token');
  }

  logout() {
    sessionStorage.removeItem('syne-app-token');
  }
}
