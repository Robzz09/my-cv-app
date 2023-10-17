import { Component } from '@angular/core';
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGitHub = faGithub;
  faStar = faStar;
  selectedCategory: string = 'all';
  currentImage: number = 1;
  currentCarousel: number = 1;

  changeCategory(category: string) {
    this.selectedCategory = category;
  }
  changeImage(imageNumber: number) {
    this.currentImage = imageNumber;
  }
  changeCarousel(carouselNumber: number) {
    this.currentCarousel = carouselNumber;
  }
}
