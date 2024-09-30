import { Api } from '../base/api';
import { API_URL } from '../../utils/constants';
import { Product, IProduct } from '../model/product.model';

export interface IProductService {
	products: Promise<IProduct[]>;
	/**
	 * Получает список продуктов с сервера.
	 * @returns Промис, который резолвится в массив объектов типа IProduct.
	 */
	fetchProducts(): Promise<IProduct[]>;
}

export class ProductService implements IProductService {
	private api: Api;
	public products: Promise<IProduct[]>;

	constructor() {
		this.api = new Api(API_URL);
		this.products = this.fetchProducts();
	}

	// Стрелочная функция для получения списка продуктов
	fetchProducts = async (): Promise<IProduct[]> => {
		try {
			const response = (await this.api.get('/product')) as {
				total: number;
				items: any[];
			};
			return response.items.map((item) => Product.fromApiData(item));
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error);
			return [];
		}
	};
}
