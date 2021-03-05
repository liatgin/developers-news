import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../api.service';


export interface Comment {
  comment_id: string; 
  post_id: string; 
  owner_id: string;
  owner_name: string;
  comment: string; 
  post_title: string; 
  time_of_creation: Date;
  comment_to: string;
  src_comment_id: string; 
} 


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() commentIndex



  constructor() { }

  ngOnInit(): void {
  }


  timeChangeFormat(date: Date) {
    return moment(date).fromNow()
  }



}
