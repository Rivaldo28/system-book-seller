package com.crescendo.digital.repository;

import com.crescendo.digital.model.PurchaseHistory;
import com.crescendo.digital.repository.projection.IPurchaseItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {

    @Query("select b.title as title, ph.price as price, ph.discount_price as discountPrice, ph.purchaseTime as purchaseTime " +
           "from PurchaseHistory ph left join ph.book b " +
           "where ph.userId = :userId")
    Page<IPurchaseItem> findAllPurchasesOfUser(@Param("userId") Long userId, Pageable pageable);

    @Query("select b.title as title, ph.price as price, ph.discount_price as discountPrice, ph.purchaseTime as purchaseTime " +
           "from PurchaseHistory ph left join ph.book b " +
           "where ph.userId = :userId and lower(b.title) like lower(concat('%', :title, '%'))")
    Page<IPurchaseItem> findAllPurchasesOfUserByTitle(@Param("userId") Long userId, @Param("title") String title, Pageable pageable);

}
