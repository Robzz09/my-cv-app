import { Component } from '@angular/core';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { PdfService } from 'src/app/service/pdf/pdf.service';

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
  isDisabled: boolean = true;
  checkboxTouched: boolean = false;

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
    payPalType: true,
    cardType: false,
    mobileType: false,
    deliveryDate: new Date(),
    maintenancePackage: '1 month',
  };

  domains = ['ntt.com', 'lazio.net', 'google.com', 'instagram.com'];

  //regular expression (regex) 
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

  validateNames() {
    const isNameValid = this.validateName();
    const isSurnameValid = this.validateSurname();

    return isNameValid && isSurnameValid;
  }

  domainControl(): boolean {
    if (this.model.necessDomain) {
      if (
        this.isValidDomainName() &&
        this.domains.includes(this.model.domainName)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkSelectedFunction(): boolean {
    if (this.model.servType === 'e-shop') {
      return (
        this.model.payPalType || this.model.cardType || this.model.mobileType
      );
    }
    return true;
  }
  onCheckboxChange(): void {
    this.checkboxTouched = true;
    this.validateAndSetDisabled();
  }

  validateAndSetDisabled() {
    this.isDisabled = !(
      this.validateNames() &&
      this.isValidDomainName() &&
      this.checkSelectedFunction()
    );
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

  validateDomain(domainName: string): boolean {
    if (this.model.necessDomain) {
      const noSpaceDomain = domainName.replace(/\s/g, ' ');
      if (noSpaceDomain.length < 4) {
        this.isDisabled = true;
        return false;
      }
      if (!noSpaceDomain.includes('.') || noSpaceDomain.split('-').length > 1) {
        this.isDisabled = true;
        return false;
      }

      const afterDot = noSpaceDomain.split('.');
      if (afterDot.length < 2 || afterDot[1].length < 2) {
        this.isDisabled = true;
        return false;
      }
      const validCharacters = /^[a-z0-9-.]+$/;

      if (!validCharacters.test(noSpaceDomain)) {
        this.isDisabled = true;
        return false;
      }
      if (
        noSpaceDomain.includes('..') ||
        noSpaceDomain.includes('.-') ||
        noSpaceDomain.includes('-.')
      ) {
        this.isDisabled = true;
        return false;
      }
    } else {
      this.isDisabled = false;
    }

    return true;
  }
  checkDomain() {
    if (this.model.necessDomain) {
      this.domainExists = this.domains.includes(this.model.domainName);
      this.validateAndSetDisabled();
    } else {
      this.domainExists = false;
      this.validateAndSetDisabled();
    }
  }

  isValidDomainName(): boolean {
    if (this.model.domainName && this.validateDomain(this.model.domainName)) {
      return true;
    }

    return false;
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
    this.calcQuote();
    // const formattedDeliveryDate = this.formatDate(this.model.deliveryDate);
    this.pdfService.generatePdf(
      this.model,
      this.resQuote
      // formattedDeliveryDate
    );
  }
}
