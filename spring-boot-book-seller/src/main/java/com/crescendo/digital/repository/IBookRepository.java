package com.crescendo.digital.repository;

import com.crescendo.digital.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookRepository extends JpaRepository<Book, Long> {

    // Métodos para a paginação da UI
    Page<Book> findByTitleContainingIgnoreCaseAndDeletedFalse(String title, Pageable pageable);
    Page<Book> findByDeletedFalse(Pageable pageable);

    // Métodos para a exportação CSV
    List<Book> findByDeletedFalse();
    // Novo método para buscar a lista completa, mas filtrada
    List<Book> findByTitleContainingIgnoreCaseAndDeletedFalse(String title);

    @Modifying
    @Query("update Book b set b.deleted = true where b.id = :id")
    void deleteBookId(Long id);

    @Query("select b.fileImgBook64 from Book b where b.id = :id")
    byte[] findByFileBook(Long id);
}
