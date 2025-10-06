export class PurchaseItem {
  title: string = "";
  price: number = 0;
  discountPrice: number = 0; // Corrigido de discount_price para discountPrice (camelCase)
  purchaseTime: Date = new Date();
}
