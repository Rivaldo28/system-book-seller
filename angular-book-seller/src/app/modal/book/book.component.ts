import { Component, EventEmitter, Input, Output, Pipe } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import * as base64 from "byte-base64";
/*import { readFileSync } from 'fs'; */

declare var $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input() book: Book = new Book();
  errorMessage: string = '';

  @Output() save = new EventEmitter<any>();

  file: File | undefined;

  constructor(private bookService: BookService) {

  }

  handleUpload($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files[0]);
    this.file = files[0];
  }

  saveBook() {
    console.log(this.book)
    console.log(this.file)
    if (!this.file) return;
    this.bookService.saveBook(this.book, this.file).subscribe(data => {
      this.save.emit(data);
      $('#bookModal').modal('hide');
    }, err => {
      this.errorMessage = 'Um erro inesperado.';
      console.log(err);
    });
  }

  showBookModal() {
    $('#bookModal').modal('show');
  }

}
