import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  result;
  user;
  message;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });

  }

  async register() {
    if (!this.registerForm.valid) {
      console.log('grrr');      
      return;
    } 
    console.log('register', this.registerForm.value); 
    this.result = await this.afAuth.createUserWithEmailAndPassword(this.registerForm.value.email,this.registerForm.value.password);
    console.log('register / result ', this.result);
    
    this.registerForm.reset();
    if( this.result && this.result.user) {
      const userCreated = await this.userService.createUser(this.result.user);
      console.log('userCreated', userCreated);
      this.result = null;
    }
  }

  async login() {
    if (!this.loginForm.valid) {
      console.log(':(');
      return;
    }
    try {
      this.message = '';
      console.log('login', this.loginForm.value);
      const { email, password} = this.loginForm.value;
      this.user = await this.afAuth.signInWithEmailAndPassword(email, password);      
    } catch (error) {
      this.message = error.message;
    }
  }

}
