package com.crescendo.digital.service;

import com.crescendo.digital.model.PurchaseHistory;
import com.crescendo.digital.repository.projection.IPurchaseItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPurchaseHistoryService
{

	PurchaseHistory savePurchaseHistory(PurchaseHistory purchaseHistory);

    // Método unificado para busca paginada e com filtro
    Page<IPurchaseItem> findPurchasedItems(Long userId, String title, Pageable pageable);

}
