import { Component, Input, Output,  EventEmitter, OnInit } from '@angular/core';
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
  @Output() commentsEvent = new EventEmitter<string>();
  @Output() userPageEvent = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  timeChangeFormat(date: Date) {
    return moment(date).fromNow()
  }

  commentsRedirect() {
    this.commentsEvent.emit(this.post.post_id);
    // this.hideEvent.emit(true);
    // this.router.navigate(['comments'], {queryParams: {postId: this.post.post_id}})
  }

  userPageRedirect() {
    console.log('redirect to userPage', this.post.owner_name)
    this.userPageEvent.emit(this.post.owner_name);
  }



}
