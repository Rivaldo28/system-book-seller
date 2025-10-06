export class Purchase {
    id?: number;
    userId?: number;
    bookId?: number;
    price?: number;
    discount_price?: number;
    purchaseTime: Date = new Date();

    constructor(userId?: number, bookId?: number, price?: number, discount_price?: number) {
        this.userId = userId;
        this.bookId = bookId;
        this.price = price;
        this.discount_price = discount_price;
    }
}
