import { Component } from '@angular/core';
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
  faLinkedin = faLinkedin;
  contactForm: FormGroup;
  submittedData: { name: string; email: string; message: string } | null = null;
  successMessage: string = 'Il messaggio è stato inviato con successo!';

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
      this.contactForm.reset();
      this.submitForm();
    }
  }
  submitForm() {
    const name = this.contactForm.get('name')?.value;
    const email = this.contactForm.get('email')?.value;
    const message = this.contactForm.get('message')?.value;

    const modalName = document.getElementById('modalName');
    const modalEmail = document.getElementById('modalEmail');
    const modalMessage = document.getElementById('modalMessage');
    const modalSucces = document.getElementById('modalSucces');

    if (modalName && modalEmail && modalMessage && modalSucces) {
      modalName.textContent = name;
      modalEmail.textContent = email;
      modalMessage.textContent = message;
      modalSucces.textContent = this.successMessage;
    }
  }
}
