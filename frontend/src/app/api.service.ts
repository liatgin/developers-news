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

  newPost(post): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/newPost`, JSON.stringify(post), {responseType: 'text'})
  }

  postComments(postId): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/postComments/${postId}`, {responseType: 'text'})
  }

  addComment(data): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/${data.postId}`, JSON.stringify(data.comment), {responseType: 'text'})
  }

  userComments(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/userComments/${userId}`, {responseType: 'text'})
  }

  getUser(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/getUser/${userId}`, {responseType: 'text'})
  }

  createUser(newUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/newUser`, JSON.stringify(newUser), {responseType: 'text'})
  }

  userFavorites(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/userFavorites/${userId}`, {responseType: 'text'})
  }

  addFavoritePost(data): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/newFavoritePost/${data.userId}/${data.favoritePostId}`, {responseType: 'text'})
  }

  userSubmissions(userId): Observable<any> {
    console.log('in user sumissions', userId)
    return this.http.get(`${this.apiUrl}/users/submissions/${userId}`, {responseType: 'text'})
  }



}
