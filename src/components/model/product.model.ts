export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number | null;  // Цена может быть null, если её нет
}
 // Класс Product, реализующий интерфейс IProduct
 
export class Product implements IProduct {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public image: string,
		public category: string,
		public price: number | null
	) {}

	// Статический метод для создания продукта из данных API
	static fromApiData(data:IProduct): Product {
		return new Product(
			data.id,
			data.title,
			data.description,
			data.image,
			data.category,
			data.price
		);
	}
}