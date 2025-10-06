package com.crescendo.digital.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString(exclude = "fileImgBook64") // Exclui o campo da imagem do toString()
@EqualsAndHashCode(exclude = "fileImgBook64") // Exclui o campo da imagem do equals() e hashCode()
@Entity
@Table(name = "books")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false, length = 100)
	private String title;

	@Column(name = "description", nullable = false, length = 1000)
	private String description;

	@Column(name = "author", nullable = false, length = 100)
	private String author;

	@Column(name = "price", nullable = false)
	private Double price;

	@NotNull
	@Column(name = "discount_price")
	private Double discount_price;

	@Column(name = "create_time", nullable = false)
	private LocalDateTime createTime;

	private String typeBook;

	@JsonIgnore
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] fileImgBook64;

	@Column(name= "deleted",  nullable = false)
	private Boolean deleted;

}
