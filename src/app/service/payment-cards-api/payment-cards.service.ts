import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentCardsService {
  apiUrl = 'https://fakerapi.it/api/v1/credit_cards?_quantity=5';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getDataByNumber(number: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}&number=${number}`);
  }
}
