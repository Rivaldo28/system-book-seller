import { Component, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-deletebook',
  templateUrl: './deletebook.component.html',
  styleUrls: ['./deletebook.component.css']
})
export class DeletebookComponent {

  @Output() deleteSuccess = new EventEmitter<void>();

  errorMessage: string = '';
  id?: number;

  constructor(private bookService: BookService) { }

  deletebook() {
    Swal.fire({
      title: 'Deletar',
      text: "Tem certeza que deseja deletar o registro!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Não!',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(this.id!).subscribe({
          next: () => {
            // Emite o evento para notificar o componente pai
            this.deleteSuccess.emit();
            // Fecha o modal
            $('#showModalDeleteBook').modal('hide');
            Swal.fire(
              'Deletado!',
              'O livro foi deletado com sucesso.',
              'success'
            );
          },
          error: (err) => {
            this.errorMessage = 'Erro ao deletar o livro.';
            console.error(err);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao deletar o livro.',
              'error'
            );
          }
        });
      }
    });
  }

  // Este método não é mais necessário, pois o pai controlará a lista.
  // setBooks(books: Book[]) { this.bookList = books; }

  setId(id: number) { this.id = id; }

  showDeleteBookModal() {
    $('#showModalDeleteBook').modal('show');
  }
}
