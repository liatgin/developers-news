import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import * as moment from 'moment'


export interface Post {
  post_id: string;
  link: string;
  title: string;
  owner_id: string;
  time_written: string;
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[]

  constructor(private httpService: ApiService) {}

  ngOnInit() {
      this.httpService.getPosts()
        .subscribe((data) => {
          console.log('received data:')
          console.log(data)
          this.posts = JSON.parse(data)
          console.log(this.posts)
        })
  }

  timeChangeFormat(date: Date) {
    return moment(date).fromNow()
  }

  getOwnerName(ownerId) {
    return 'Danny Zukko'
  }

  getComments(postId) {

  }

  
}
