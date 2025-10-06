package com.crescendo.digital.model.dto;

public class ReportBookDto {

    private String typeBook;

    private String title;

    private Double price;

    public ReportBookDto(String typeBook, String title, Double price) {
        this.typeBook = typeBook;
        this.title = title;
        this.price = price;
    }

    public String getTypeBook() {
        return typeBook;
    }

    public void setTypeBook(String typeBook) {
        this.typeBook = typeBook;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
