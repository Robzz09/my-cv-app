import { Component, HostListener } from '@angular/core';
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
  faGitHub = faGithub;
  faLinkedin = faLinkedin;
  isScrolled: boolean = false;
  isLightNavbar: boolean = false;
  isNavbarCollapsed: boolean = true;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY >= 150;
  }
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarClass(event.url);
        window.scrollTo(0, 0);
        this.isNavbarCollapsed = true;
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
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
