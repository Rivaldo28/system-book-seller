package com.crescendo.digital.service;

import com.crescendo.digital.dto.DashboardDtos;
import com.crescendo.digital.repository.IPurchaseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private IPurchaseHistoryRepository purchaseHistoryRepository;

    // Método para a PRIMEIRA query
    public DashboardDtos.DashboardStatisticsDto getDashboardStatistics() {
        return purchaseHistoryRepository.getDashboardStatistics();
    }

    // Método para a SEGUNDA query
    public List<DashboardDtos.PurchaseHistoryDetailDto> getPurchaseHistoryDetails() {
        return purchaseHistoryRepository.getPurchaseHistoryDetails();
    }
}
