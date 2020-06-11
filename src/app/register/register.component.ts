import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) { }

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
    this.registerForm.reset();
  }

  async login() {
    if (!this.loginForm.valid) {
      console.log(':(');
      return;
    }
    console.log('login', this.loginForm.value);
    const { email, password} = this.loginForm.value;
    this.user = await this.afAuth.signInWithEmailAndPassword(email, password);
  }

}
