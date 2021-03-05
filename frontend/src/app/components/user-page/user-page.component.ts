import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import{ Comment } from '../comment/comment.component'
import{ Post } from '../post/post.component'
import { FormBuilder } from '@angular/forms';
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

  userDetailsForm = this.formBuilder.group({
    about: ''
  });  

  @Input() userName
  @Input() isEditMode
  user: User
  isUserPage: boolean = true
  isSubmissionsPage: boolean = false
  isCommentsPage: boolean = false
  isFavoritesPage: boolean = false

  comments: Comment[]
  submissions: Post[]
  favorites: Post[]

  constructor(private httpService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('here is user', this.userName)
    console.log('this.ownerName', this.userName)
    console.log('isEditMode', this.isEditMode, this.isUserPage  )
    console.log('', )
    this.httpService.getUser(this.userName)
    .subscribe((data) => {
      console.log('user:', data)
      this.user = JSON.parse(data)[0]
      console.log('user', this.user)
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
    return moment(date).fromNow()
  }

  getUserPage() {
  }

  onUpdate() {
    console.log(' this.userDetailsForm.value.about',  this.userDetailsForm.value.about)
    const about = this.userDetailsForm.value.about
    console.log ('this.userDetailsForm.value', about)
    this.httpService.userDetailsUpdate({about}, this.user.usr_id)
      .subscribe((data) => {
        console.log('after update user details:')
        console.log(data)
      })
    this.userDetailsForm.reset()
  }
 
}
