package com.crescendo.digital.controller;

import com.crescendo.digital.dto.DashboardDtos;
import com.crescendo.digital.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Endpoint para a PRIMEIRA query (Estatísticas)
    @GetMapping("/statistics")
    public ResponseEntity<DashboardDtos.DashboardStatisticsDto> getStatistics() {
        return ResponseEntity.ok(dashboardService.getDashboardStatistics());
    }

    // Endpoint para a SEGUNDA query (Histórico de Compras)
    @GetMapping("/history")
    public ResponseEntity<List<DashboardDtos.PurchaseHistoryDetailDto>> getPurchaseHistory() {
        return ResponseEntity.ok(dashboardService.getPurchaseHistoryDetails());
    }
}
