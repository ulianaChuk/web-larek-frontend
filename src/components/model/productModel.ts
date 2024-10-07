import { IProduct } from '../../types';
import { IEvents } from '../base/events';



export class ProductModel  {
	protected item: IProduct[];
 	product: IProduct;

	constructor(protected events: IEvents) {
		this.item = [];
	}

	updateProductCards=(data: IProduct[]) => {
		this.item = data;
		this.events.emit('productCards:get');
	}

	 getProductCards =()=> {
		return this.item;
	}

	setPreview=(item: IProduct)=> {
		this.product = item;
		this.events.emit('modalCard:open', item);
	}
}
