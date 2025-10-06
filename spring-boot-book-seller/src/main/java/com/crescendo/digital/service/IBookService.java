package com.crescendo.digital.service;

import com.crescendo.digital.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IBookService {

    Book saveBook(Book book);

    Book findBookById(Long id);

    void deleteBook(Long id);

    // Método para a paginação da UI
    Page<Book> findAllBooks(String title, Pageable pageable);

    // Método para exportação CSV agora aceita um título
    List<Book> findAllCsv(String title);

    Book getById(Long id);

    byte[] findByFileBook(Long id);
}
