import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import{ Comment } from '../comment/comment.component'
import{ Post } from '../post/post.component'
import * as moment from 'moment';

export interface User {
  usr_id: string,
  usr_name: string,
  password: string
  about: string,
  time_of_creation: string,
  favorites: string
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @Input() userName
  user: User
  isUserPage: boolean = true
  isSubmissionsPage: boolean = false
  isCommentsPage: boolean = false
  isFavoritesPage: boolean = false

  comments: Comment[]
  submissions: Post[]
  favorites: Post[]

  constructor(private httpService: ApiService) { }

  ngOnInit(): void {
    console.log('here is user', this.userName)
    console.log('this.ownerName', this.userName)
    this.httpService.getUser(this.userName)
    .subscribe((data) => {
      console.log('user:')
      console.log(data)
      this.user = JSON.parse(data)[0]
      console.log('user.usr_name', this.user.usr_name)
    })
  }

  getSubmissions() {
    this.httpService.userSubmissions(this.user.usr_id)
      .subscribe((submissions) => {
        this.submissions = JSON.parse(submissions)
        this.isUserPage = false
        this.isSubmissionsPage = true
      })
  }

  getComments() {
    console.log('usrId:', this.user.usr_id )
    this.httpService.userComments(this.user.usr_id)
      .subscribe((comments) => {
        this.comments = JSON.parse(comments)
        this.isUserPage = false
        this.isCommentsPage = true
      })
  }

  getFavorites() {
    this.httpService.userFavorites(this.user.usr_id)
      .subscribe((favorites) => {
        console.log('favorites', favorites )
        this.favorites = JSON.parse(favorites)
        this.isUserPage = false
        this.isFavoritesPage = true
      })
  }

  timeChangeFormat(date) {
    console.log(date)
    return moment(date).fromNow()
  }

  getUserPage() {
  }
 
}
