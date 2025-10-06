package com.crescendo.digital.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PurchaseItemDto {

    private Double price;
    private Double discount_price;
    private Long bookId;
    private String title;
    private LocalDateTime purchaseTime;

    public PurchaseItemDto(Double price, Double discount_price, Long bookId, String title, LocalDateTime purchaseTime) {
        this.price = price;
        this.discount_price = discount_price;
        this.bookId = bookId;
        this.title = title;
        this.purchaseTime = purchaseTime;
    }
}
