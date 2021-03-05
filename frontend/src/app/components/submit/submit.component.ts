import { Component, Input, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  @Input() loggedUserName
  @Input() loggedUserId
  postForm = this.formBuilder.group({
    title: '',
    url: '',
    text: ''
  });

  constructor(private httpService: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('in submit', this.loggedUserName, this.loggedUserId)
  }


  onSubmitPost() {
    const ownerId = this.loggedUserId
    const ownerName = this.loggedUserName
    console.log('in submittt this.loggedUserId', this.loggedUserId)
    console.log('in submittt this.loggedUserName', this.loggedUserName)

    const newPost = {
      title: this.postForm.value.title,
      url: this.postForm.value.url,
      owner_id: ownerId,
      owner_name: ownerName,
    }
    this.httpService.newPost(newPost)
    .subscribe((data) => {
      console.log('after new post submission:')
      console.log(data)
    })
    this.postForm.reset()
  }
  
}
