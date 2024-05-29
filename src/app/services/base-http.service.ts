import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  constructor(protected http: HttpClient) {}

  protected buildUrl(url: string): string {
    return `${environment.apiUrl}/${url}`;
  }
}
