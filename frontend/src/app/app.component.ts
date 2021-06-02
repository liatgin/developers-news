import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from './api.service';
import { Post } from './components/post/post.component';
import { Comment } from './components/comment/comment.component';
import { FormBuilder } from '@angular/forms';
import * as _ from "lodash";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // TODO: move this to a new comments component
  commentForm = this.formBuilder.group({
    comment: ''
  }); 

  posts: Post[]
  active = 1
  isPostsMode = true
  isCommentsMode = false
  isUserPageMode = false
  postId: string
  comments: Comment[]
  userName
  loggedUserName: string
  loggedUserId: string

  constructor(private httpService: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.httpService.getPosts()
      .subscribe((data) => {
        this.posts = JSON.parse(data)['allPosts']
        const userName = JSON.parse(data)['userName'] 
        const loggedUsrId = JSON.parse(data)['userId']
        if (userName) {
          this.loggedUserName = userName
        }
        if (loggedUsrId) {
          this.loggedUserId = loggedUsrId
        }
      })
  }

  getComments(postID) {
    this.isPostsMode = false
    this.isCommentsMode = true
    this.postId = postID
    this.httpService.postComments(postID)
        .subscribe((data) => {
          this.comments = JSON.parse(data)
        })
  }

  getUserPage(userName) {
    this.userName = userName
    this.isPostsMode = false
    this.isUserPageMode = true
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isUserLoggedIn(): boolean {
    return this.httpService.loggedIn
  }

  setLoggedUserName(loggedUsrName) {
    this.loggedUserName = loggedUsrName
  }

  onAddComment() {
    const postToComment = _.find(this.posts, { 'post_id': this.postId});
    const data = {
      post_id: this.postId,
      comment: this.commentForm.value.comment,
      owner_id: this.loggedUserId,
      owner_name: this.loggedUserName, 
      post_title: postToComment.title,
      comment_to: 'post'
    }
    this.httpService.addComment(data)
    .subscribe((data) => {
      console.log('after adding new commewnt', data)  
    })
  }

}
