import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {

  @Input() book: Book = new Book();
  errorMessage: string = '';
  @Output() save = new EventEmitter<any>();

  file: File | undefined;
  action = 'Adicionar';
  subscription: Subscription = new Subscription;
  loading = false;

  // Propriedades para a pré-visualização da imagem
  existingImageUrl: string | null = null;
  newImagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: any) => {
      const id = params['id'];
      if (id) {
        this.loading = true;
        this.action = "Editar";
        this.bookService.getById(id).subscribe(book => {
          this.book = book;
          // Constrói a URL da imagem existente
          this.existingImageUrl = `${environment.BASE_URL}/api/book/image/${this.book.id}`;
          this.loading = false;
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.book.fileSelected = true;

      // Gera a pré-visualização da nova imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.newImagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  saveBook() {
    // A validação do arquivo deve ser diferente para edição
    if (!this.file && !this.book.id) {
      this.toastr.error('Por favor, selecione um arquivo de imagem.', 'Erro de Validação');
      return;
    }

    this.loading = true;
    const operation = this.book.id
      ? this.bookService.updateBook(this.book, this.file!)
      : this.bookService.saveBook(this.book, this.file!);

    operation.subscribe({
      next: (data) => {
        this.save.emit(data);
        const message = this.book.id ? "atualizado" : "salvo";
        this.toastr.success(`O livro foi ${message} com sucesso!`, 'Sucesso');
        this.router.navigate(['/admin']);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Um erro inesperado ocorreu.';
        console.error(err);
        this.toastr.error(this.errorMessage, 'Erro');
        this.loading = false;
      }
    });
  }
}
