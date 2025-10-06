package com.crescendo.digital.service;

import com.crescendo.digital.model.Book;
import com.crescendo.digital.model.PurchaseHistory;
import com.crescendo.digital.repository.IBookRepository;
import com.crescendo.digital.repository.IPurchaseHistoryRepository;
import com.crescendo.digital.repository.projection.IPurchaseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
public class PurchaseHistoryService implements IPurchaseHistoryService {

    private final IPurchaseHistoryRepository purchaseHistoryRepository;
    private final IBookRepository bookRepository;

    @Autowired
    public PurchaseHistoryService(IPurchaseHistoryRepository purchaseHistoryRepository, IBookRepository bookRepository) {
        this.purchaseHistoryRepository = purchaseHistoryRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public PurchaseHistory savePurchaseHistory(PurchaseHistory purchaseHistory) {
        Book book = bookRepository.findById(purchaseHistory.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + purchaseHistory.getBook().getId()));

        purchaseHistory.setBook(book);
        purchaseHistory.setPurchaseTime(LocalDateTime.now());
        return purchaseHistoryRepository.save(purchaseHistory);
    }

    @Override
    public Page<IPurchaseItem> findPurchasedItems(Long userId, String title, Pageable pageable) {
        if (StringUtils.hasText(title)) {
            return purchaseHistoryRepository.findAllPurchasesOfUserByTitle(userId, title, pageable);
        } else {
            return purchaseHistoryRepository.findAllPurchasesOfUser(userId, pageable);
        }
    }
}
