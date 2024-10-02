import { IProduct } from '../model/product.model';
import { EventEmitter, IEvents } from '../base/events';

export interface IBasketService extends IEvents {
	/**
	 * Добавление товара в корзину.
	 * @param product - Товар, который нужно добавить в корзину.
	 */
	addProduct(product: IProduct): void;

	/**
	 * Удаление товара из корзины по ID.
	 * @param productId - Идентификатор товара, который нужно удалить из корзины.
	 */
	removeProduct(productId: string): void;

	/**
	 * Получение списка товаров в корзине.
	 * @returns Массив товаров с указанием их количества.
	 */
	getItems(): IProduct[];

	/**
	 * Получение общей суммы товаров в корзине.
	 * @returns Общая сумма корзины.
	 */
	getTotalPrice(): number;

	/**
	 * Очистка корзины.
	 */
	clearBasket(): void;
	setProductsIdToOrder(items: IProduct[]): void;
}

export class BasketService extends EventEmitter implements IBasketService {
	private items:IProduct[] = [];

	/**
	 * Добавление товара в корзину.
	 * Если товар уже есть, увеличивается его количество.
	 * @param product - Товар для добавления в корзину.
	 */
	addProduct = (product: IProduct): void => {
		const existingItem = this.items.find(item => item.id === product.id);

		if (!existingItem) {
			this.items.push(product);
		} 

		this.emit('basketChanged', this.items); // Уведомляем о изменениях
	};

	/**
	 * Удаление товара из корзины по его ID.
	 * Если количество товара больше 1, уменьшается количество.
	 * @param productId - Идентификатор товара для удаления.
	 */
	removeProduct = (productId: string): void => {
		const itemIndex = this.items.findIndex(item => item.id === productId);

		if (itemIndex !== -1) {
				// Иначе удаляем товар полностью
				this.items.splice(itemIndex, 1);
			}

			this.emit('basketChanged', this.items); // Уведомляем о изменениях
		}
	

	/**
	 * Получение текущего списка товаров в корзине с их количеством.
	 * @returns Массив объектов с товарами и количеством.
	 */
	getItems = (): IProduct[] => {
		return this.items;
	};

	/**
	 * Получение общей суммы товаров в корзине.
	 * @returns Общая стоимость товаров в корзине.
	 */
	getTotalPrice = (): number => {
		return this.items.reduce((total, item) => {
			return total + (item.price || 0) ;
		}, 0);
	};

	/**
	 * Очистка корзины.
	 */
	clearBasket = (): void => {
		this.items = [];
		this.emit('basketChanged', this.items); // Уведомляем о изменениях
	};

	setProductsIdToOrder = ()=>{
		const itemsId = this.items.map((item) => item.id);
		console.log(itemsId);
	   
	   }
}
