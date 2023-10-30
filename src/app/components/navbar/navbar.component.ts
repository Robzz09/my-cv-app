import { Component, HostListener } from '@angular/core';
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faBars = faBars;
  isScrolled: boolean = false;
  isLightNavbar: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.isScrolled = window.scrollY >= 150;
  }
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarClass(event.url);
      }
    });
  }
  private updateNavbarClass(url: string) {
    this.isLightNavbar = false;
    if (
      url.includes('contact') ||
      url.includes('about-me') ||
      url.includes('portfolio') ||
      url.includes('services') ||
      url.includes('payment-cards')
    ) {
      this.isLightNavbar = true;
    }
  }
}
