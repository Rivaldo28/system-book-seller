package com.crescendo.digital.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
@Table(name = "purchase_history")
public class PurchaseHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "user_id", nullable = false)
	private Long userId;

	@ManyToOne
	@JoinColumn(name = "book_id", nullable = false)
	private Book book;
//	@Column(name = "book_id", nullable = false)
//	private Long bookId;
	
	@Column(name = "price", nullable = false)
	private Double price;

	@NotNull
	@Column(name = "discount_price")
	private Double discount_price;

	@Column(name = "purchase_time", nullable = false)
	private LocalDateTime purchaseTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

//	public Long getBookId() {
//		return bookId;
//	}
//	public void setBookId(Long bookId) {
//		this.bookId = bookId;
//	}


	public void setBook(Book book) {
		this.book = book;
	}

	public Book getBook() {
		return book;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public LocalDateTime getPurchaseTime() {
		return purchaseTime;
	}

	public void setPurchaseTime(LocalDateTime purchaseTime) {
		this.purchaseTime = purchaseTime;
	}

	public Double getDiscount_price() {
		return discount_price;
	}

	public void setDiscount_price(Double discount_price) {
		this.discount_price = discount_price;
	}
}
