package com.crescendo.digital.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

public class DashboardDtos {

    // DTO para a sua PRIMEIRA query (Estatísticas)
    public interface DashboardStatisticsDto {
        BigInteger getTotal_pedidos();
        BigDecimal getTotal_vendas();
    }

    // DTO para a sua SEGUNDA query (Histórico de Compras)
    public interface PurchaseHistoryDetailDto {
        Long getId();
        LocalDateTime getPurchase_date();
        BigDecimal getPrice();
        BigDecimal getDiscount_price();
        String getTitle();
        BigDecimal getBook_original_price();
    }
}
