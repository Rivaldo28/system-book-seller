import { Component, OnInit } from '@angular/core';
import { PurchaseService, PurchaseItemPage } from 'src/app/services/purchase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  purchasePage: PurchaseItemPage | null = null;
  pageNumbers: number[] = [];
  title?: string;
  loading = false;

  constructor(private purchaseService: PurchaseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Carrega a primeira página com 8 itens
    this.getPurchaseHistory(0, 8);
  }

  getPurchaseHistory(page: number, size: number, title?: string) {
    this.loading = true;
    this.purchaseService.getPurchaseHistory(page, size, title).subscribe({
      next: (data) => {
        this.purchasePage = data;
        this.pageNumbers = Array.from({ length: this.purchasePage.totalPages }, (_, i) => i + 1);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao carregar o histórico de compras.', 'Erro');
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    const size = this.purchasePage?.size || 8;
    this.getPurchaseHistory(page, size, this.title);
  }

  search() {
    this.getPurchaseHistory(0, 8, this.title);
  }
}
