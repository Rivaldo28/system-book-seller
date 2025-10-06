package com.crescendo.digital.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// DTO para carregar os dados brutos da sua segunda query
public interface PurchaseHistoryDetailDto {
    Long getId();
    LocalDateTime getPurchase_date();
    BigDecimal getPrice();
    BigDecimal getDiscount_price();
    String getTitle();
}
