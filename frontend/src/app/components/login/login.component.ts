import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ApiService} from '../../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 @Input() loggedUserName
 @Output() onUserLogin = new EventEmitter<string>();
 hideLoginPassword = true
 hideSignUpPassword = true
 userName

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
    this.userName = this.loginForm.value.userName
    this.httpService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe((result) => {
        localStorage.setItem('access_token', result.token);
        this.onUserLogin.emit(this.userName)
      });
    this.loginForm.reset()
  }

  onSignUp() {
    console.log ('this.signUpForm.value', this.signUpForm.value)
    // body.userName, body.password, 'hello there', new Date(), body.favorites
    const newUser = {
      userName: this.signUpForm.value.newUserName,
      password: this.signUpForm.value.newPassword
    }
    this.httpService.createUser(newUser)
    .subscribe((data) => {
      console.log('after sign up:', data)
    })
    this.signUpForm.reset()
  }

  isUserLoggedIn(): boolean {
    return this.httpService.loggedIn
  }

}
