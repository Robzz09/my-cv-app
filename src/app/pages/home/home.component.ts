import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typingText') typingText!: ElementRef;

  phrases: string[] = [
    "I'm Robert George Boboc.",
    "I'm a Freelancer.",
    "I'm a Motor Addicted.",
  ];
  currentPhraseIndex = 0;
  currentPhrase = '';
  typingDelay = 100;
  erasingDelay = 50;
  startTypingTimeout: any;

  ngAfterViewInit() {
    this.startTyping();
  }

  startTyping() {
    if (this.currentPhraseIndex < this.phrases.length) {
      const phrase = this.phrases[this.currentPhraseIndex];
      this.typePhrase(phrase);
    }
  }

  //scrittura della frase lettera per lettera
  typePhrase(phrase: string) {
    const typingElement = this.typingText.nativeElement;
    if (this.currentPhrase !== phrase) {
      const nextChar = phrase.slice(0, this.currentPhrase.length + 1);
      typingElement.textContent = nextChar;
      this.currentPhrase = nextChar;
      this.startTypingTimeout = setTimeout(() => {
        this.typePhrase(phrase);
      }, this.typingDelay);
    } else {
      setTimeout(() => {
        this.erasePhrase();
      }, 1000);
    }
  }

  //cancello la frase lettera per lettera
  erasePhrase() {
    const typingElement = this.typingText.nativeElement;
    if (this.currentPhrase !== '') {
      const erasedText = this.currentPhrase.slice(
        0,
        this.currentPhrase.length - 1
      );
      typingElement.textContent = erasedText;
      this.currentPhrase = erasedText;
      this.startTypingTimeout = setTimeout(() => {
        this.erasePhrase();
      }, this.erasingDelay);
    } else {
      this.currentPhraseIndex =
        (this.currentPhraseIndex + 1) % this.phrases.length;
      setTimeout(() => {
        this.startTyping();
      }, 500);
    }
  }
}
