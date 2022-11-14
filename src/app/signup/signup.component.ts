import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.signUpForm);
    console.log(this.signUpForm.value);
  }

  checkConfirmPassword(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    console.log('pass', pass, confirmPass);
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
