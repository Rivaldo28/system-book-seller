package com.crescendo.digital.repository.projection;

import java.time.LocalDateTime;

public interface IPurchaseItem 
{
	String getTitle();
	Double getPrice();
    Double getDiscountPrice(); // Método adicionado
	LocalDateTime getPurchaseTime();
}
