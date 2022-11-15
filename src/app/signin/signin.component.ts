import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isLogin = false;
  loginError: null | string = null;

  signInForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
  );

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    const registerData = this.signInForm.value;
    try {
      this.isLogin = true;
      this.loginError = null;

      await this.authService.loginWithEmailPassword(
        registerData.email!,
        registerData.password!
      );
    } catch  (err) {
      const error = err as FirebaseError;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        this.loginError = 'Week Password';
      } else {
        this.loginError = errorMessage;
      }
    } finally {
      this.isLogin = false;
    }
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

}
