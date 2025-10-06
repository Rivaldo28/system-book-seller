SELECT * FROM sc_book.books b;
SELECT * FROM sc_book.purchase_history ph;
SELECT * FROM sc_book.users u ;

SELECT
      b.author,
      b.title,
      ph.price,
      ph.purchase_time,
      ph.user_id,
      b.description 
FROM
    sc_book.books b
INNER JOIN sc_book.purchase_history ph
ON b.id = ph.book_id
WHERE ph.purchase_time > '2022-01-01'
ORDER BY ph.purchase_time ASC;
	
-- Filtragem: mostra apenas tipo de livro em Politica
SELECT * FROM sc_book.books b 
WHERE b.type_book = 'Política';

-- Classificação: mostra as vendas em ordem decrescente de desconto total
SELECT *, b.price - b.discount_price AS desconto_total
FROM sc_book.books b
ORDER BY desconto_total DESC;

-- Agrupamento: mostra a quantidade total vendida de cada produto
SELECT b.title, b.title, SUM(price) AS quantidade_total
FROM sc_book.books b
GROUP BY b.title;

-- Sumarização: calcula a receita total de vendas em 2022
SELECT SUM(b.discount_price + b.price) AS livros_total
FROM sc_book.books b
WHERE b.create_time BETWEEN '2022-12-28' AND '2023-04-24';


SELECT
	b.type_book,
	b.title,
	b.price
FROM
	sc_book.books b
WHERE
	b.deleted = false
	AND b.title LIKE '%';


SELECT * FROM sc_book.books b;
