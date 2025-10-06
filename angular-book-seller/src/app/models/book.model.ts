export class Book {
  id: number | undefined;
  title: string = "";
  author: string = "";
  price: number = 0.0;
  discount_price: number = 0.0;
  description: string = "";
  createTime: Date = new Date();
  typeBook: string = "";
  fileSelected = false;
  fileImgBook64: string | null = '';

  constructor(id?: number, title: string = "", price: number = 0, discount_price: number = 0, typeBook: string = "") {
    this.id = id;
    this.title = title;
    this.price = price;
    this.typeBook = typeBook;
    this.discount_price = discount_price;
  }

  getId() {
    return this.id;
  }
}
