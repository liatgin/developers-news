import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';


export interface Post {
  post_id: string;
  link: string;
  title: string;
  owner_id: string;
  owner_name: string;
  time_written: Date;
} 

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post
  @Input() postIndex
  isPostPage = true

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  timeChangeFormat(date: Date) {
    return moment(date).fromNow()
  }

  commentsRedirect() {
    console.log('redirect to comments', this.post.post_id, this.router.parseUrl(this.router.url))
    this.router.navigate(['comments'], {queryParams: {postId: this.post.post_id}})
  }



}
