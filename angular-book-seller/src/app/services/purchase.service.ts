import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PurchaseItem } from '../models/purchase-item.model';
import { Purchase } from '../models/purchase.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/purchase-history`;

// Interface para a resposta paginada
export interface PurchaseItemPage {
  content: PurchaseItem[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  savePurchase(purchase: Purchase): Observable<any> {
    return this.http.post(API_URL, purchase, { headers: this.getHeaders });
  }

  // Novo método unificado para buscar o histórico de forma paginada e com filtro
  getPurchaseHistory(page: number, size: number, title?: string): Observable<PurchaseItemPage> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    if (title) {
      params = params.set('title', title);
    }

    return this.http.get<PurchaseItemPage>(API_URL, { headers: this.getHeaders, params: params });
  }
}
