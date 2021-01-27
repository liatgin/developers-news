import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Comment } from '../comment/comment.component'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  postId: string
  comments: Comment[]

  constructor(private httpService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params', params)
      this.postId = params['postId'];
      this.getComments(this.postId)
    });
  }

  getComments(postId) {
    console.log('this.postId', postId)
    this.httpService.getCommentsById(postId)
        .subscribe((data) => {
          console.log('comments:')
          console.log(data)
          this.comments = JSON.parse(data)
        })
  }

}
