import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { computeMsgId } from '@angular/compiler';

export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  db = firebase.firestore();
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  constructor(
    private fireAuth: AngularFireAuth,
    private adb: AngularFirestore,
    private http: HttpClient
  ) { }

  public login(loginValue: FormGroup): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(loginValue.value.username, loginValue.value.password)
        .then(res => {
          resolve(res.user);
          // console.log(res.user);
          // if (res.user) {
          //   this.adb.collection('users')
          //           .doc(res.user.uid)
          //           .get()
          //           .subscribe((user: any) => {
          //             console.log(user);
          //             resolve(user.data());
          //           }, error => {
          //             reject(error);
          //           });
          // }
        })
        .catch(err => {
          this.authInfo$.next(AuthService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }

  public logout(): Promise<void> {
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    return this.fireAuth.signOut();
  }

}
