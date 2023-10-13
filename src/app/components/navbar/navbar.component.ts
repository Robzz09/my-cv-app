/*import { Component, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private renderer: Renderer2) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    
    if (window.scrollY >= 50) {
      this.renderer.addClass(navbar, 'scrolled');
    } else {
      this.renderer.removeClass(navbar, 'scrolled');
    }
  }
}
*/
import { Component, HostListener } from '@angular/core';
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  isScrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.isScrolled = window.scrollY >= 200;
  }
}
