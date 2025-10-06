import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface para os dados da PRIMEIRA query (Estatísticas)
export interface DashboardStatistics {
  total_pedidos: number;
  total_vendas: number;
}

// Interface para os dados da SEGUNDA query (Histórico Detalhado)
export interface PurchaseHistoryDetail {
  id: number;
  purchase_date: Date;
  price: number;
  discount_price: number;
  title: string;
  book_original_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient) { }

  // 1. Busca os dados das estatísticas
  getStatistics(): Observable<DashboardStatistics> {
    return this.http.get<DashboardStatistics>(`${this.baseUrl}/statistics`);
  }

  // 2. Busca os dados do histórico de compras
  getPurchaseHistoryDetails(): Observable<PurchaseHistoryDetail[]> {
    return this.http.get<PurchaseHistoryDetail[]>(`${this.baseUrl}/history`);
  }
}
