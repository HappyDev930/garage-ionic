import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-garage-header',
  templateUrl: './garage-header.component.html',
  styleUrls: ['./garage-header.component.scss'],
})
export class GarageHeaderComponent implements OnInit {

  previousUrl: string = null;
  currentUrl: string = null;
  title: string = '';

  constructor(
    private routes :ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.routes.snapshot.routeConfig.path;
    console.log('Hello', this.routes.snapshot.routeConfig.path);
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.previousUrl = event.url;
      console.log('****hello****', event.url);
    });
  }

  previousNav() {
    console.log('test');
    console.log('this.previousUrl => ', this.previousUrl);
    if(this.previousUrl === null) {
      this.router.navigateByUrl("/home");
    } else {
      this.router.navigateByUrl(this.currentUrl);
    }
  }
}
