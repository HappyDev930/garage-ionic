import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { GarageHeaderComponent } from './garage-header/garage-header.component';
import { NavigationTabComponent } from './navigation-tab/navigation-tab.component';



@NgModule({
  declarations: [
    GarageHeaderComponent,
    NavigationTabComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    GarageHeaderComponent,
    NavigationTabComponent
  ]
})
export class SharedModule { }
