import { Component } from '@angular/core';
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  faPhone = faPhone;
  faMail = faEnvelope;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGitHub = faGithub;
  contactForm: FormGroup;

  constructor() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Puoi gestire qui l'invio del modulo, ad esempio inviando i dati al tuo backend.
      // Utilizza this.contactForm.value per ottenere i dati del modulo.
      console.log(this.contactForm.value);
    }
  }
}
