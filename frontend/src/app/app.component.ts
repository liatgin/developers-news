import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Post } from './components/post/post.component';
import { Comment } from './components/comment/comment.component';
import { User } from './components/user-page/user-page.component'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[]
  active = 1
  isPostsMode = true
  isCommentsMode = false
  isUserPageMode = false
  postId: string
  comments: Comment[]
  userName

  constructor(private httpService: ApiService) {}

  ngOnInit() {
    console.log('inside app')
      this.httpService.getPosts()
        .subscribe((data) => {
          console.log('posts:')
          console.log(data)
          this.posts = JSON.parse(data)
          console.log(this.posts)
        })
  }


  getComments(postId) {
    this.isPostsMode = false
    this.isCommentsMode = true
    console.log('this.postId', postId)
    this.httpService.postComments(postId)
        .subscribe((data) => {
          console.log('comments:')
          console.log(data)
          this.comments = JSON.parse(data)
        })
  }

  getUserPage(userName) {
    this.userName = userName
    this.isPostsMode = false
    this.isUserPageMode = true
    console.log('this.ownerName', userName)
    // this.httpService.getUser(userName)
    // .subscribe((data) => {
    //   console.log('user:')
    //   console.log(data)
    //   this.user = JSON.parse(data)
    // })
  }

}
