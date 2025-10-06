import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = `${environment.BASE_URL}/api/authentication/`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User | null>;
  public currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    const storageUserAsStr = localStorage.getItem('currentUser');
    let storageUser = null;
    if (storageUserAsStr && storageUserAsStr !== 'undefined') {
      try {
        storageUser = JSON.parse(storageUserAsStr);
      } catch (e) {
        console.error("Error parsing currentUser from localStorage", e);
        localStorage.removeItem('currentUser');
      }
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(API_URL + 'sign-in', user)
      .pipe(
        map(responseUser => {
          if (responseUser && responseUser.token) {
            localStorage.setItem('currentUser', JSON.stringify(responseUser));
            this.currentUserSubject.next(responseUser);
            return responseUser;
          }
          throw new Error("Invalid response from server.");
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + 'sign-up', user);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
