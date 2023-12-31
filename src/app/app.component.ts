import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  isContactPage: boolean = false;

  constructor(private router: Router) {

    //per togliere il footer nel contact page
    this.router.events.subscribe((val) => {
      this.isContactPage = this.router.url.includes('contact');
    });
  }
}
