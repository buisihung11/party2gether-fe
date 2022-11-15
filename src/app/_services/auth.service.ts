import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();

export interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: any;

  constructor(
    private afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router
  ) {
    console.log('afAuth', afAuth);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log('USERCHANGE', user);
        this.setUserData(user.toJSON());
        console.log(router.url, router);
        // localStorage.setItem('user', JSON.stringify(this.userState));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        // localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  registerWithEmailPassword(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // TODO: Send mail verification
        // this.SendVerificationMail();
        // this.SetUserData(result.user);
        console.log(result);
        return result.user;
      })
      .catch((error) => {
        console.log(error.message);
        throw error;
      });
  }

  loginWithEmailPassword(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['homepage']);
        });
        this.setUserData(result.user?.toJSON());
        return result.user?.toJSON();
      })
      .catch((error) => {
        console.log(error.message);
        throw error;
      });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      // localStorage.removeItem('user');
      this.router.navigate(['user/signin']);
      this.setUserData(null);
    });
  }

  setUserData(user: any) {
    this.userState = {...user, photoURL: generator.generateRandomAvatar(user.uid)};
  }

  exchangeServerJWTToken(idToken: string) {}

  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem('user'));
    // return user !== null && user.emailVerified !== false ? true : false;
    return Boolean(this.userState);
  }
}
