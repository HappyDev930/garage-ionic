import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  logout() {
    this.auth.logout();
    localStorage.removeItem('uid');
    this.navCtrl.navigateRoot('/');
  }
}
