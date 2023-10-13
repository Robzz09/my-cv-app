import { Component } from '@angular/core';
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  faPhone = faPhone;
  faMail = faEnvelope;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGitHub = faGithub;
}
