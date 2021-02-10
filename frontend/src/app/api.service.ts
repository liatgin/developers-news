import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map  } from 'rxjs/operators';
import {Post} from './components/post/post.component';

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<Post>(`${this.apiUrl}/posts/newPost`, post, httpOptions)

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log('**************************** new user', newUser )
    return this.http.post(`${this.apiUrl}/users/newUser`, newUser, httpOptions)
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
