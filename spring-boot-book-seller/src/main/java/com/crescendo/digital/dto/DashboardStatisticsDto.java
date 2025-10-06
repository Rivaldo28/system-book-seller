package com.crescendo.digital.dto;

public class DashboardStatisticsDto {
    private Long totalOrders;
    private Double totalSales;

    public DashboardStatisticsDto(Long totalOrders, Double totalSales) {
        this.totalOrders = totalOrders;
        this.totalSales = totalSales;
    }

    // Getters e Setters
    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }
}
