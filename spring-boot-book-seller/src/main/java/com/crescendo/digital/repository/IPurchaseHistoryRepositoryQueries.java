package com.crescendo.digital.repository;

import com.crescendo.digital.model.dto.PurchaseItemDto;

import java.util.List;

public interface IPurchaseHistoryRepositoryQueries {

    List<PurchaseItemDto> findAllPurchaseOfUser(Long userId, String title);

}
