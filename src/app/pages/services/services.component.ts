import { Component } from '@angular/core';
import { PdfService } from 'src/app/service/pdf.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  tomorrow: string = '';
  resQuote: number = 0;
  checkSelected: boolean = false;
  domainExists: boolean = false;

  constructor(private pdfService: PdfService) {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    this.tomorrow = now.toISOString().slice(0, 10);
    this.model.deliveryDate = this.tomorrow;
  }

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

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;
    return formattedDate;
  }
  namePattern: RegExp = /^[a-zA-Z]+$/;

  validateName() {
    const isRequired = this.model.name.trim().length >= 3;
    const isValidPattern = this.namePattern.test(this.model.name);
    return isRequired && isValidPattern;
  }
  validateSurname() {
    const isRequired = this.model.surname.trim().length >= 3;
    const isValidPattern = this.namePattern.test(this.model.surname);
    return isRequired && isValidPattern;
  }
  validateDomain(domainName: string): boolean {
    const noSpaceDomain = domainName.replace(/\s/g, '');
    if (noSpaceDomain.length < 4) {
      return false;
    }
    if (
      !noSpaceDomain.includes('.') ||
      noSpaceDomain.split('-').length - 1 > 1
    ) {
      return false;
    }
    const afterDot = noSpaceDomain.split('.');
    if (afterDot.length < 2 || afterDot[1].length < 2) {
      return false;
    }
    const validCharacters = /^[a-z0-9-.]+$/;
    return validCharacters.test(noSpaceDomain);
  }

  isValidDomainName(): boolean {
    if (this.model.domainName && this.validateDomain(this.model.domainName)) {
      return true;
    }

    return false;
  }

  generatePdf() {
    this.calcQuote();
    const formattedDeliveryDate = this.formatDate(this.model.deliveryDate);
    this.pdfService.generatePdf(
      this.model,
      this.resQuote,
      formattedDeliveryDate
    );
  }
}
