import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { MenuController, NavController } from "@ionic/angular";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      if (localStorage.uid) {
        // this.menuCtrl.enable(true);
        resolve(true);
      } else {
        // this.menuCtrl.enable(false);
        this.auth.logout();
        reject(false);
        this.navCtrl.navigateRoot("/");
      }
    });
  }
}
