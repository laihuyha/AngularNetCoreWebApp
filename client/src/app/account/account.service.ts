import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../share/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser = () => {
    return this.currentUserSource.value;
  }

  loadCurrentUser = (token: string) => {
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);
    if (token === null) {
      this.currentUserSource.next(null);
      return;
    }
    return this.http.get(this.baseUrl + 'account', { headers: header }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.userToken);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login = (values: any) => {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.userToken);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register = (values: any) => {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.userToken);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout = () => {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists = (email: string) => {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
}
