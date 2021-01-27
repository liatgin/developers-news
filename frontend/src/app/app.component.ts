import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Post } from './components/post/post.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[]
  active = 1

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
}
