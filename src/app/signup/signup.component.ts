import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isRegitering = false;
  registerError: null | string = null;

  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: this.checkConfirmPassword }
  );

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit() {
    const registerData = this.signUpForm.value;
    try {
      this.isRegitering = true;
      this.registerError = null;

      await this.authService.registerWithEmailPassword(
        registerData.email!,
        registerData.password!
      );
    } catch  (err) {
      const error = err as FirebaseError;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        this.registerError = 'Week Password';
      } else {
        this.registerError = errorMessage;
      }
    } finally {
      this.isRegitering = false;
    }
  }

  checkConfirmPassword(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
