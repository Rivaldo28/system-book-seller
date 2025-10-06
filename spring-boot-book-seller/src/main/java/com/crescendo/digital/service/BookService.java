package com.crescendo.digital.service;

import com.crescendo.digital.model.Book;
import com.crescendo.digital.repository.IBookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class BookService implements IBookService {


    private final IBookRepository bookRepository;

    public BookService(IBookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book saveBook(Book book) {
        book.setDeleted(false);
        book.setCreateTime(LocalDateTime.now());
        return bookRepository.save(book);
    }

    @Override
    public Book findBookById(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            return optionalBook.get();
        }
        return null;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteBookId(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Book> findAllBooks(String title, Pageable pageable) {
        if (StringUtils.hasText(title)) {
            return bookRepository.findByTitleContainingIgnoreCaseAndDeletedFalse(title, pageable);
        } else {
            return bookRepository.findByDeletedFalse(pageable);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> findAllCsv(String title) {
        // Lógica condicional para a exportação CSV
        if (StringUtils.hasText(title)) {
            return bookRepository.findByTitleContainingIgnoreCaseAndDeletedFalse(title);
        } else {
            return bookRepository.findByDeletedFalse();
        }
    }

    @Override
    public Book getById(Long id) {
        return bookRepository
                .findById(id)
                .orElse(null);
    }

    @Override
    @Transactional
    public byte[] findByFileBook(Long id) {
        return this.bookRepository.findByFileBook(id);
    }


}
