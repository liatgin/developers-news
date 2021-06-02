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
  
  createHttpHeaders(method: string) {
    let httpOptions
    //TODO make less ugly
    const getHeaders = this.loggedIn ? httpOptions = {headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`}), responseType: 'text'} : httpOptions = {responseType: 'text'}
    method == 'GET' ? getHeaders 
      : (this.loggedIn ? 
          httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`})}
          : httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
        ) 
    return httpOptions  
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`, this.createHttpHeaders('GET'))
  }

  newPost(post): Observable<any> {
    return this.http.post<Post>(`${this.apiUrl}/posts/newPost`, post, this.createHttpHeaders('POST'))
  }

  postComments(postId): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/postComments/${postId}`, this.createHttpHeaders('GET'))
  }

  addComment(data): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/${data.post_id}`, data, this.createHttpHeaders('POST'))
  }

  userComments(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/userComments/${userId}`, this.createHttpHeaders('GET'))
  }

  getUser(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/getUser/${userId}`, this.createHttpHeaders('GET'))
  }

  createUser(newUser): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(`${this.apiUrl}/users/newUser`, newUser, this.createHttpHeaders('POST'))
  }

  userFavorites(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/userFavorites/${userId}`, this.createHttpHeaders('GET'))
  }

  addFavoritePost(data): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/newFavoritePost/${data.userId}/${data.favoritePostId}`, this.createHttpHeaders('PUT'))
  }

  userSubmissions(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/submissions/${userId}`, this.createHttpHeaders('GET'))
  }

  userDetailsUpdate(about, userId): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/update/${userId}`, about, this.createHttpHeaders('PUT'))
  }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(`${this.apiUrl}/auth/login`, {username: username, password: password}, httpOptions)
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }



}
