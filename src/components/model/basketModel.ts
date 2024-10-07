import { IProduct } from '../../types';

export class BasketModel {
	basketItems: IProduct[];

	constructor() {
		this.basketItems = [];
	}
	updateBasketProducts=(data: IProduct[]) => {
		this.basketItems = data;
		return this.basketItems;
	}
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
		const index = this.basketItems.indexOf(product);
		if (index >= 0) {
			this.basketItems.splice(index, 1);
		}
	};
	clearAllBasket = () => {
		this.basketItems = [];
	};
}
