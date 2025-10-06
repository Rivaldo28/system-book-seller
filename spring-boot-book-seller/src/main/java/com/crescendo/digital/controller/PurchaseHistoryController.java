package com.crescendo.digital.controller;

import com.crescendo.digital.model.Book;
import com.crescendo.digital.model.PurchaseHistory;
import com.crescendo.digital.repository.projection.IPurchaseItem;
import com.crescendo.digital.security.UserPrincipal;
import com.crescendo.digital.service.IPurchaseHistoryService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/purchase-history")
public class PurchaseHistoryController {

    @Autowired
    private IPurchaseHistoryService purchaseHistoryService;

    // DTO para receber a requisição do frontend
    @Getter
    @Setter
    static class PurchaseRequest {
        private Long bookId;
        private Double price;
        private Double discount_price;
    }

    @PostMapping
    public ResponseEntity<?> savePurchaseHistory(@RequestBody PurchaseRequest purchaseRequest, @AuthenticationPrincipal UserPrincipal userPrincipal)
    {
        PurchaseHistory newPurchase = new PurchaseHistory();
        newPurchase.setUserId(userPrincipal.getId());
        newPurchase.setPrice(purchaseRequest.getPrice());
        newPurchase.setDiscount_price(purchaseRequest.getDiscount_price());

        Book book = new Book();
        book.setId(purchaseRequest.getBookId());
        newPurchase.setBook(book);

        return new ResponseEntity<>(purchaseHistoryService.savePurchaseHistory(newPurchase), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<IPurchaseItem>> getAllPurchasesOfUser(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(value = "title", required = false) String title,
            Pageable pageable)
    {
        return ResponseEntity.ok(purchaseHistoryService.findPurchasedItems(userPrincipal.getId(), title, pageable));
    }

}
