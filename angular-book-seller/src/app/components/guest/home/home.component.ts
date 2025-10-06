import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService, BookPage } from 'src/app/services/book.service';
import { HomeModalComponent } from 'src/app/modal/home-modal/home-modal.component'; // Voltando para o modal antigo
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(HomeModalComponent) modalPurchase: HomeModalComponent | undefined; // Voltando para o modal antigo

  bookPage: BookPage | null = null;
  pageNumbers: number[] = [];
  selectedBook: Book = new Book();
  faBook = faBook;
  loading = false;

  constructor(private authenticationService: AuthenticationService,
    private bookService: BookService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllBooks(0, 8);
  }

  getAllBooks(page: number, size: number) {
    this.loading = true;
    this.bookService.getAllBooks(page, size).subscribe(data => {
      this.bookPage = data;
      this.pageNumbers = Array.from({ length: this.bookPage.totalPages }, (_, i) => i + 1);
      this.loading = false;
    });
  }

  changePage(page: number) {
    if (page >= 0 && page < (this.bookPage?.totalPages || 0)) {
      this.getAllBooks(page, this.bookPage?.size || 8);
    }
  }

  createPurchaseBook(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.toastr.warning('Você precisa se logar para comprar um livro.', 'Alerta');
      return;
    }
    if (item.id) {
      this.bookService.setEventGetId(item.id);
    }
    this.selectedBook = item;
    this.modalPurchase?.showModalPurchase(); // Voltando para a chamada do modal antigo
  }
}
