package com.crescendo.digital.controller;

import com.crescendo.digital.model.Book;
import com.crescendo.digital.service.IBookService;
import com.crescendo.digital.service.PdfService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "api/book")//pre-path
public class BookController {

    @Autowired
    private IBookService bookService;

    @Autowired
    private PdfService pdfService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) //api/book
    public ResponseEntity<?> saveBook(Book book,
                                      @RequestPart(name = "file", required = true) MultipartFile file) throws IOException {
        if (file.getSize() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Problem
                    .builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .msg("file is empty")
                    .build());
        }
        book.setFileImgBook64(file.getBytes());
        return new ResponseEntity<>(bookService.saveBook(book), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateBook(@PathVariable Long id, Book book,
                                        @RequestPart(name = "file", required = false) MultipartFile file) throws IOException {
        Optional<Book> optionalBook = Optional.ofNullable(bookService.getById(id));
        if (!optionalBook.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem
                    .builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .msg("Book not found")
                    .build());
        }
        Book existingBook = optionalBook.get();
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setTypeBook(book.getTypeBook());
        existingBook.setDescription(book.getDescription());
        if (file != null && file.getSize() > 0) {
            existingBook.setFileImgBook64(file.getBytes());
        }
        return new ResponseEntity<>(bookService.saveBook(existingBook), HttpStatus.OK);
    }

    @DeleteMapping("{bookId}") //api/book/{bookId}
    public ResponseEntity<?> deleteBook(@PathVariable Long bookId) {
        bookService.deleteBook(bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Book>> findAll(@RequestParam(value = "title", required = false) String title, Pageable pageable) {
        return new ResponseEntity<>(bookService.findAllBooks(title, pageable), HttpStatus.OK);
    }

    @GetMapping("/all-for-csv")
    public ResponseEntity<List<Book>> findAllForCsv(@RequestParam(value = "title", required = false) String title) {
        return new ResponseEntity<>(bookService.findAllCsv(title), HttpStatus.OK);
    }

    @GetMapping(value = "/report/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> generatePdfReport(@RequestParam(value = "title", required = false) String title) throws IOException {
        List<Book> books = bookService.findAllCsv(title); // Agora passa o título para o serviço
        ByteArrayInputStream bis = pdfService.generateBookReport(books);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=relatorio_livros.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Book book = bookService.getById(id);
        if (book == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem
                    .builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .msg("resource not found ID: " + id)
                    .build());
        }
        return ResponseEntity.ok(book);
    }

    @GetMapping(value = "/image/{id}", produces = MediaType.ALL_VALUE)
    public ResponseEntity<?> getImage(@PathVariable Long id)
            throws HttpMediaTypeNotAcceptableException {
        try {
            byte[] fileImgBook64 = this.bookService.findByFileBook(id);
            if (fileImgBook64 == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(new InputStreamResource(new ByteArrayInputStream(fileImgBook64)));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }

    }
}

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
class Problem {
    private int code;
    private String msg;
}
