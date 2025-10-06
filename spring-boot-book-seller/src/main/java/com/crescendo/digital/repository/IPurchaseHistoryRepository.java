package com.crescendo.digital.repository;

import com.crescendo.digital.dto.DashboardDtos;
import com.crescendo.digital.model.PurchaseHistory;
import com.crescendo.digital.repository.projection.IPurchaseItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {

    // Suas queries existentes para outras partes do sistema...
    @Query("select b.title as title, ph.price as price, ph.discount_price as discountPrice, ph.purchaseTime as purchaseTime " +
           "from PurchaseHistory ph left join ph.book b " +
           "where ph.userId = :userId")
    Page<IPurchaseItem> findAllPurchasesOfUser(@Param("userId") Long userId, Pageable pageable);

    @Query("select b.title as title, ph.price as price, ph.discount_price as discountPrice, ph.purchaseTime as purchaseTime " +
           "from PurchaseHistory ph left join ph.book b " +
           "where ph.userId = :userId and lower(b.title) like lower(concat('%', :title, '%'))")
    Page<IPurchaseItem> findAllPurchasesOfUserByTitle(@Param("userId") Long userId, @Param("title") String title, Pageable pageable);

    // QUERY 1: Para as estatísticas
    @Query(value = "SELECT COUNT(ph.id) AS total_pedidos, SUM(ph.price - ph.discount_price) AS total_vendas FROM sc_book.purchase_history ph", nativeQuery = true)
    DashboardDtos.DashboardStatisticsDto getDashboardStatistics();

    // QUERY 2: CORRIGIDA - Trocando purchase_date por purchase_time
    @Query(value = "SELECT ph.*, b.title, b.price AS book_original_price FROM sc_book.purchase_history ph INNER JOIN sc_book.books b ON ph.book_id = b.id ORDER BY ph.purchase_time DESC", nativeQuery = true)
    List<DashboardDtos.PurchaseHistoryDetailDto> getPurchaseHistoryDetails();
}
