import { Component, OnInit, ViewChild } from '@angular/core';
import { BookComponent } from 'src/app/modal/book/book.component';
import { DeletebookComponent } from 'src/app/modal/deletebook/deletebook.component';
import { Book } from 'src/app/models/book.model';
import { BookService, BookPage } from 'src/app/services/book.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ExportCSVService } from 'src/app/services/export-csv.service';
import * as moment from 'moment/moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookPage: BookPage | null = null;
  pageNumbers: number[] = [];
  selectedBookForAction: Book | null = null; // Livro selecionado para a ação
  errorMessage: string = '';
  faUser = faUserCircle;
  title?: string;
  loading = false;

  @ViewChild(BookComponent) child: BookComponent | undefined;
  @ViewChild(DeletebookComponent) modalDelete: DeletebookComponent | undefined;

  constructor(private bookService: BookService,
    private exportCsvService: ExportCSVService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllBooks(0, 5);
  }

  getAllBooks(page: number, size: number, title?: string) {
    this.loading = true;
    this.bookService.getAllBooks(page, size, title).subscribe({
      next: (data) => {
        this.bookPage = data;
        this.pageNumbers = Array.from({ length: this.bookPage.totalPages }, (_, i) => i + 1);
        this.selectedBookForAction = null; // Limpa a seleção ao recarregar os dados
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao carregar livros.', 'Erro');
        this.loading = false;
      }
    });
  }

  refreshBookList() {
    if (this.bookPage) {
      this.getAllBooks(this.bookPage.number, this.bookPage.size, this.title);
    }
  }

  selectRow(book: Book) {
    this.selectedBookForAction = this.selectedBookForAction === book ? null : book;
  }

  changePage(page: number) {
    const size = this.bookPage?.size || 5;
    this.getAllBooks(page, size, this.title);
  }

  inputSearch() {
    this.getAllBooks(0, 5, this.title);
  }

  clearSearch() {
    this.title = undefined;
    this.getAllBooks(0, 5);
  }

  createDeleteBookRequest() {
    if (!this.selectedBookForAction) return;
    this.modalDelete?.setId(this.selectedBookForAction.id!);
    this.modalDelete?.showDeleteBookModal();
  }

  public exportCSV() {
    this.loading = true;
    this.bookService.findAllForCsv(this.title).subscribe({
      next: (filteredBooks) => {
        if (!filteredBooks || filteredBooks.length === 0) {
          this.toastr.warning('Não há dados para exportar com o filtro atual.', 'Aviso');
          this.loading = false;
          return;
        }

        const header: string[] = ['Código', 'Titulo', 'Autor', 'Preço', 'Desconto', 'Data'];
        const dados: any[][] = [];

        filteredBooks.forEach((book) => {
          dados.push([
            book.id,
            book.title || '',
            book.author || '',
            book.price ? book.price.toFixed(2).replace('.', ',') : '0,00',
            book.discount_price ? book.discount_price.toFixed(2).replace('.', ',') : '0,00',
            book.createTime ? moment(book.createTime).format('DD/MM/YYYY HH:MM') : ''
          ]);
        });

        this.exportCsvService.exportCsv(header, dados, 'Rivabook_Filtro.csv');
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar dados para exportação.', 'Erro');
        this.loading = false;
      }
    });
  }

  printReport() {
    this.loading = true;
    // Chama o método de PDF passando o filtro de título atual
    this.bookService.downloadPdfReport(this.title).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio_livros.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao gerar o relatório PDF.', 'Erro');
        this.loading = false;
      }
    });
  }

  goEdit() {
    if (!this.selectedBookForAction) return;
    this.router.navigate(['admin/book-form', this.selectedBookForAction.id]);
  }
}
