import { IProduct } from '../../types';

export class BasketModel {
	basketItems: IProduct[];

	constructor() {
		this.basketItems = [];
	}
	updateBasketProducts = (data: IProduct[]) => {
		this.basketItems = data;
		return this.basketItems;
	};
	getCounter = () => {
		return this.basketItems.length;
	};
	getTotalPrice = () => {
		return this.basketItems.reduce((total, item) => {
			return total + (item.price || 0);
		}, 0);
	};
	addProduct = (product: IProduct) => {
		this.basketItems.push(product);
	};
	removeProduct = (product: IProduct) => {
		const newBasketItems = this.basketItems.filter(
			(item) => item.id !== product.id
		);
		this.basketItems = newBasketItems;
	};

	clearAllBasket = () => {
		this.basketItems = [];
	};
}
