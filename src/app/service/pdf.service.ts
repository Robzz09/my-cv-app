import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generatePdf(model: any, resQuote: number, formattedDeliveryDate: string) {
    const documentDefinition = {
      content: [
        { text: 'Quote Details', style: 'header' },
        { text: 'Name: ' + model.name },
        { text: 'Surname: ' + model.surname },
        {
          text: 'Necessity Domain: ' + (model.necessDomain ? 'Yes' : 'No'),
          style: 'content',
        },
        { text: 'Domain name: ' + model.domainName, style: 'content' },
        {
          text: 'Services Type: ' + this.getServiceTypeLabel(model.servType),
          style: 'content',
        },
        {
          text: 'Payment Types: ' + this.getPaymentTypesLabel(model),
          style: 'content',
        },
        { text: 'Delivery Date: ' + formattedDeliveryDate, style: 'content' },
        {
          text: 'Maintenance Package: ' + model.maintenancePackage,
          style: 'content',
        },
        { text: 'Total Quote: €' + resQuote, style: 'quote' },
      ],
      styles: {
        header: {
          fontSize: 18,
          marginBottom: 10,
          bold: true,
        },
        quote: {
          fontSize: 16,
          marginBottom: 10,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  getServiceTypeLabel(servType: string): string {
    const serviceTypeLabels: Record<string, string> = {
      static: 'Static',
      cms: 'CMS',
      'e-shop': 'E-Shop',
      gestionale: 'Gestionale',
      'i-o-t': 'I-O-T',
    };

    return serviceTypeLabels[servType] || '';
  }

  getPaymentTypesLabel(model: any): string {
    const paymentTypes = [];
    if (model.payPalType) {
      paymentTypes.push('Paypal');
    }
    if (model.cardType) {
      paymentTypes.push('Credit Card');
    }
    if (model.mobileType) {
      paymentTypes.push('ApplePay & GooglePay');
    }

    return paymentTypes.length > 0 ? paymentTypes.join(', ') : 'None selected';
  }
}
