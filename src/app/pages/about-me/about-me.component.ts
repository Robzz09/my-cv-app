import { Component } from '@angular/core';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPenRuler } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
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
  progressValueWeb: number = 70;
  progressValueJs: number = 40;
  progressValueAngular: number = 50;
  progressValueHtml: number = 85;
  progressValueBootstrap: number = 75;
  progressValueReact: number = 40;
  maxValue: number = 100;

}
