import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  postForm = this.formBuilder.group({
    title: '',
    url: '',
    text: ''
  });

  constructor(private httpService: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }


  onSubmitPost() {
    // req.owner_id, 
    // req.owner_name
    const newPost = {
      title: this.postForm.value.title,
      url: this.postForm.value.url,
      owner_id: '',
      owner_name: '',
    }
    console.log ('this.postForm.value', newPost)
    this.httpService.newPost(newPost)
    .subscribe((data) => {
      console.log('after new post submission:')
      console.log(data)
    })
    this.postForm.reset()
  }
  
}
