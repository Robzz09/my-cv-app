import { Component } from '@angular/core';
import { PaymentCardsService } from 'src/app/service/payment-cards-api/payment-cards.service';

@Component({
  selector: 'app-payment-cards',
  templateUrl: './payment-cards.component.html',
  styleUrls: ['./payment-cards.component.css'],
})
export class PaymentCardsComponent {
  cards: any[] = [];
  sortBy: 'ASC' | 'DESC' = 'ASC';
  constructor(private paymentService: PaymentCardsService) {}
  ngOnInit() {
    this.paymentService.getData().subscribe(
      (card: any) => {
        if (Array.isArray(card.data)) {
          this.cards = card.data;
          this.sortByNumber();
        } else {
          console.error('Data is not an array:', card);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  sortByNumber() {
    this.cards.sort((ascN, descN) => {
      if (this.sortBy === 'ASC') {
        return ascN.number.localeCompare(descN.number);
      } else {
        return descN.number.localeCompare(ascN.number);
      }
    });
  }
}
