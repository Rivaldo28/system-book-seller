package com.crescendo.digital.repository;

import com.crescendo.digital.model.dto.PurchaseItemDto;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class IPurchaseHistoryRepositoryImpl implements IPurchaseHistoryRepositoryQueries {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<PurchaseItemDto> findAllPurchaseOfUser(Long userId, String title) {
        StringBuffer sql = new StringBuffer("select ")
                .append(" new com.crescendo.digital.model.dto.PurchaseItemDto(p.price, p.discount_price, p.book.id, p.book.title, p.purchaseTime) ")
                .append(" from PurchaseHistory p left join p.book ");
        sql.append(" where p.userId = :userId ");
        sql.append(StringUtils.hasText(title) ? " and lower(p.book.title) like :title " : "");
        sql.append(" order by p.purchaseTime asc ");
        TypedQuery<PurchaseItemDto> createQuery = manager.createQuery(sql.toString(), PurchaseItemDto.class);
        createQuery.setParameter("userId", userId);
        if (StringUtils.hasText(title)) {
            createQuery.setParameter("title", title.concat("%").toLowerCase());
        }
        return createQuery.getResultList();
    }
}
