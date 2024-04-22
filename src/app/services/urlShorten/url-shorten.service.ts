import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class UrlShortenService {

  constructor(private http: HttpClient) { }

  generateShortenUrl (email: string,url: string): Observable<any> {
    return this.http.post(`${URL}`,{email,url})
  }
}
