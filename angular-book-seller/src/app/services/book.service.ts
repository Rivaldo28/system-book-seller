import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const API_URL = `${environment.BASE_URL}/api/book`;

export interface BookPage {
  content: Book[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService extends RequestBaseService {

  private eventGetId$ = new Subject<number>();

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  public getEventGetId() {
    return this.eventGetId$.asObservable();
  }

  public setEventGetId(id: number) {
    return this.eventGetId$.next(id);
  }

  saveBook(book: Book, file: File) {
    const headers = this.getHeadersUpload;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', book.title);
    formData.append('description', book.description);
    formData.append('author', book.author);
    formData.append('price', book.price.toString());
    formData.append('discount_price', book.discount_price.toString());
    formData.append('typeBook', book.typeBook);
    return this.http.post(
      API_URL,
      formData,
      { headers }
    );
  }

  updateBook(book: Book, file: File) {
    const headers = this.getHeadersUpload;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', book.title);
    formData.append('description', book.description);
    formData.append('author', book.author);
    formData.append('price', book.price.toString());
    formData.append('discount_price', book.discount_price.toString());
    formData.append('typeBook', book.typeBook);
    const url = `${API_URL}/${book.id}`;
    return this.http.put(
      url,
      formData,
      { headers }
    );
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, { headers: this.getHeaders });
  }

  getAllBooks(page: number, size: number, title?: string): Observable<BookPage> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    if (title) {
      params = params.set('title', title);
    }
    return this.http.get<BookPage>(API_URL, { params });
  }

  findAllForCsv(title?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    return this.http.get<Book[]>(`${API_URL}/all-for-csv`, { headers: this.getHeaders, params: params });
  }

  // Método agora aceita um título para filtrar o relatório PDF
  downloadPdfReport(title?: string): Observable<Blob> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    return this.http.get(`${API_URL}/report/pdf`, {
      headers: this.getHeaders,
      responseType: 'blob',
      params: params
    });
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${API_URL}/${id}`, { headers: this.getHeaders }).pipe(tap(b => console.log(b)));
  }

  getImage(id: number): Observable<File> {
    return this.http.get<File>(`${API_URL}/image/${id}`, { headers: this.getHeaders });
  }
}
