import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';

import { SharedModule } from './_shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { GarageSaleComponent } from './garage-sale/garage-sale.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AddGarageSaleComponent } from './add-garage-sale/add-garage-sale.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ListingComponent } from './listing/listing.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'garage-sales',
    component: GarageSaleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-new',
    component: AddNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-garage-sale',
    component: AddGarageSaleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listing',
    component: ListingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AuthComponent,
    GarageSaleComponent,
    CategoriesComponent,
    AddNewComponent,
    AddGarageSaleComponent,
    AddProductComponent,
    SettingsComponent,
    ProfileComponent,
    ListingComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,    
    IonicModule.forRoot(), 
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    GooglePlus,
    Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
