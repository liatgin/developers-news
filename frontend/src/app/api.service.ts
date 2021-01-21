import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map  } from 'rxjs/operators';
import {Post} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `http://localhost:4000`
  postsUrl = `http://localhost:4000/api/posts`;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(this.postsUrl, {responseType: 'text'})
  }
}
