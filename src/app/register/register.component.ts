import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });

  }

  register() {
    if (!this.registerForm.valid) {
      console.log('grrr');      
      return;
    } 
    console.log('register', this.registerForm.value);   
  }

}
