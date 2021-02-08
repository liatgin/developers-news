import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ApiService} from '../../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 hideLoginPassword = true
 hideSignUpPassword = true

 loginForm = this.formBuilder.group({
    userName: '',
    password: ''
  });

  signUpForm = this.formBuilder.group({
    newUserName: '',
    newPassword: ''
  });

  constructor(private httpService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onLogin() {
    console.log ('this.loginForm.value', this.loginForm.value)
    this.httpService.getUser({userName: this.loginForm.value.userName , password: this.loginForm.value.password })
    .subscribe((data) => {
      let user;
      user = JSON.parse(data)
      console.log('after login:', user)
      console.log(data)
    })
    this.loginForm.reset()
  }

  onSignUp() {
    console.log ('this.signUpForm.value', this.signUpForm.value)
    this.httpService.createUser({})
    .subscribe((data) => {
      console.log('after sign up:')
      console.log(data)
    })
    this.signUpForm.reset()
  }

}
