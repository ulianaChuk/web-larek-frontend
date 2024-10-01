import { IProductView } from '../view/product.view';
import { IProduct } from '../model/product.model';
import { IProductService, ProductService } from '../service/product.service';
import { IBasketController } from './basket.controller'; // Importing BasketController

export interface IProductController {
	/**
	 * Рендерит список продуктов на странице.
	 * @param products - Массив объектов продуктов, которые нужно отобразить.
	 */
	renderProducts(products: Promise<IProduct[]>): Promise<void>;
	/**
	 * Обработчик событий продуктов
	 * @param products Массив объектов продуктов, которые нужно отобразить.
	 */
	handleProductEvents(products: IProduct[]): void;

}

export class ProductController implements IProductController {
	constructor(
		private productService: IProductService,
		private productView: IProductView,
		private basketController: IBasketController
	) {
		this.renderProducts(this.productService.products);
		
	}

	// Рендеринг продуктов на странице
	renderProducts = async (products: Promise<IProduct[]>): Promise<void> => {
		try {
			this.productView.renderAllCards(await products);
			this.handleProductEvents(await products);
		} catch (error) {
			console.error('Ошибка при загрузке товаров:', error);
		}
	};

	handleProductEvents = (products: IProduct[]): void => {
		this.productView.bindProductEvents(products, this.basketController.addToBasket);

	};
}
