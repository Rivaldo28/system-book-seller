import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book.model';
import { Purchase } from 'src/app/models/purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.component.html',
  styleUrls: ['./home-modal.component.css']
})

export class HomeModalComponent implements OnInit {

  @Input() book: Book = new Book();

  constructor(private authenticationService: AuthenticationService,
    private purchaseService: PurchaseService,
    private bookService: BookService,
    private toastr: ToastrService) {}


  ngOnInit() {}

  purhcase() {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.toastr.error("Você precisa estar logado para fazer uma compra.", "Erro de Autenticação");
      return;
    }

    Swal.fire({
      title: 'Comprar Livro?',
      text: "Tem certeza que deseja comprar o Livro!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Não!',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.isConfirmed) {
        // FIX: Passando os 4 argumentos corretamente para o construtor
        const purchase = new Purchase(currentUser.id, this.book.id, this.book.price, this.book.discount_price);
        this.purchaseService.savePurchase(purchase).subscribe(() => {
          Swal.fire(
            'Comprou um novo Livro!',
            'Compra feita com sucesso.',
            'success'
          );
          $('#showModalPurchase').modal('hide');
        }, err => {
          this.toastr.error('Ocorreu um erro ao processar sua compra.', 'Erro');
          console.error(err);
        });
      }
    });
  }

  showModalPurchase() {
    $('#showModalPurchase').modal('show');
  }
}
