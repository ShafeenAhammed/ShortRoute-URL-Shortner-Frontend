import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register (name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${URL}/user/register`,{name,email,password});
  }

  login (email: string, password: string): Observable<any> {
    return this.http.post(`${URL}/user/login`,{email, password});
  }
}
