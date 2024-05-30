import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../types/currentUser.interface';
import { RegisterRequest } from '../types/registerRequest.interface';

@Injectable()
export class AuthService extends BaseHttpService {
  currentUser$ = new BehaviorSubject<CurrentUser | null | undefined>(undefined);

  getCurrentUser(): Observable<CurrentUser> {
    const url = this.buildUrl('user');
    return this.http.get<CurrentUser>(url);
  }

  setCurrentUser(currentUser: CurrentUser | null): void {
    this.currentUser$.next(currentUser);
  }

  register(registerRequest: RegisterRequest): Observable<CurrentUser> {
    const url = this.buildUrl('users');
    return this.http.post<CurrentUser>(url, registerRequest);
  }

  setToken(currentUser: CurrentUser): void {
    localStorage.setItem('gee_token', currentUser.token);
  }
}
