import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AuthForm} from '../../../interfaces/auth-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public register() {
    if (this.registerForm.valid) {
      const authForm: AuthForm = this.registerForm.value;
      this.authService.makeRegister(authForm);
    }
  }

}
