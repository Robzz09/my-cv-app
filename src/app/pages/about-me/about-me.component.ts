import { Component, HostListener } from '@angular/core';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPenRuler } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  faPalette = faPalette;
  faDesktop = faDesktop;
  faPenRuler = faPenRuler;
  faPaintBrush = faPaintBrush;
  faDownload = faDownload;
  faArrowUp = faArrowUp;
  progressValueWeb: number = 70;
  progressValueJs: number = 40;
  progressValueAngular: number = 50;
  progressValueHtml: number = 85;
  progressValueBootstrap: number = 75;
  progressValueReact: number = 40;
  maxValue: number = 100;

  //go to top button code.
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const button = document.querySelector('.go-top-button');
    if (button) {
      if (window.pageYOffset > 200) {
        button.classList.add('show-button');
      } else {
        button.classList.remove('show-button');
      }
    }
  }
}
