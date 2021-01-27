import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `http://localhost:4000/api`

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`, {responseType: 'text'})
  }

  getCommentsById(postId): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/postComments/${postId}`, {responseType: 'text'})
  }
}
