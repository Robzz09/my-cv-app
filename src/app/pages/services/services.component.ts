import { Component } from '@angular/core';
import { PdfService } from 'src/app/service/pdf.service';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  constructor(private pdfService: PdfService) {}

  model: any = {
    name: '',
    surname: '',
    necessDomain: false,
    domainName: '',
    servType: 'static',
    payPalType: false,
    cardType: false,
    mobileType: false,
    deliveryDate: new Date(),
    maintenancePackage: '1 month',
  };

  domains = ['ntt.com', 'ntt.it', 'lazio.net', 'google.com', 'instagram.com'];

  resQuote: number = 0;
  checkSelected: boolean = false;
  domainExists: boolean = false;

  checkSelectedFunction() {
    this.checkSelected =
      this.model.servType === 'e-shop' &&
      (this.model.payPalType || this.model.cardType || this.model.mobileType);
  }

  checkDomain() {
    this.domainExists = this.domains.includes(this.model.domainName);
  }

  calcQuote() {
    this.resQuote = 0;

    if (this.model.necessDomain) {
      this.resQuote += 500;
    }

    if (this.model.servType === 'static') {
      this.resQuote += 600;
    } else if (this.model.servType === 'cms') {
      this.resQuote += 800;
    } else if (this.model.servType === 'e-shop') {
      this.resQuote += 1500;

      if (this.model.payPalType) {
        this.resQuote += 1800;
      }
      if (this.model.cardType) {
        this.resQuote += 2000;
      }
      if (this.model.mobileType) {
        this.resQuote += 2300;
      }
    } else if (this.model.servType === 'gestionale') {
      this.resQuote += 700;
    } else if (this.model.servType === 'i-o-t') {
      this.resQuote += 1200;
    }

    if (this.model.maintenancePackage === '1 month') {
      this.resQuote += 200;
    } else if (this.model.maintenancePackage === '6 months') {
      this.resQuote += 1000;
    } else if (this.model.maintenancePackage === '1 year') {
      this.resQuote += 1800;
    }
  }
  generatePdf() {
    this.pdfService.generatePdf(this.model, this.resQuote);
  }
}
