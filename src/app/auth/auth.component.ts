import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook } from '@ionic-native/facebook/ngx'
import { NavController, MenuController, LoadingController, ToastController, ActionSheetController, ModalController, AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { UtilService } from '../_services/util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  public isGoogleLogin = false;
  public user = null;
  type: string = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  
  loginData = {
    username: '',
    password: '',
  };
  registerData = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public actionsheetCtrl: ActionSheetController,
    private loadingCtrl:LoadingController,
    public toastController: ToastController,
    private menuCtrl: MenuController,
    private util: UtilService,
    private google: GooglePlus,
    private platform: Platform,
    private fireAuth: AngularFireAuth,
    public facebook: Facebook
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.type = 'login';
    if(localStorage.getItem('uid')) {
      this.navCtrl.navigateRoot('/home');
    }
    console.log(this.type);
  }

  segmentChanged(ev: any) {
    console.log('Hello', this.type, ev.detail.value);
    this.type = ev.detail.value;
  }

  onLoginSubmit() {
    const loginFormData: FormData = new FormData();
    if(this.loginData) {
      loginFormData.append('username', this.loginData['username']);
      loginFormData.append('password', this.loginData['password']);
    }
    this.authService.login(this.loginForm)
    .then((res) => {
      console.log('user data =>', res);
      localStorage.setItem('uid', res.uid);
      this.navCtrl.navigateRoot('/home');
    })
    .catch((error) => {
      this.util.showToast(`${error}`, 'danger', 'bottom');
    })
  }

  onRegisterSubmit() {
    console.log('register value ==>', this.registerForm.value);
  }


  loginWithGoogle(){
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '192598906000-mt4efa9trfdebholk1i1mjk483sdsf90.apps.googleusercontent.com', //  webclientID 'string'
          offline: true
        };
      } else {
        params = {};
      }
      this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
    } else{
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isGoogleLogin = true;
        this.user =  success.user;
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    }
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.user =  success.user;
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  logout() {
     this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
    });
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
          });
  
      }).catch((error) => { console.log(error) });
  }
}
