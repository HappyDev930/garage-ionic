import { Component, ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // @ViewChild('slides1')  slides: IonSlides;
  // @ViewChild('slides2')  slides: IonSlides;
  // @ViewChild('slides3')  slides: IonSlides;

  slideOpts1 = {
    slidesPerView: 3,
    loop: true,
    autoplay:true,
    navigation: {
      nextEl: '#next1',
      prevEl: '#previous1',
    },
    pagination: false
  };

  slideOpts2 = {
    slidesPerView: 3,
    loop: true,
    autoplay:true,
    navigation: {
      nextEl: '#next2',
      prevEl: '#previous2',
    },
    pagination: false
  };

  slideOpts3 = {
    slidesPerView: 3,
    loop: true,
    autoplay:true,
    navigation: {
      nextEl: '#next3',
      prevEl: '#previous3',
    },
    pagination: false
  };

  constructor(
  ) {}

 next1() {
 }
}
