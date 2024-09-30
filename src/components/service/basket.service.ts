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
	getItems(): { product: IProduct, quantity: number }[];

	/**
	 * Получение общей суммы товаров в корзине.
	 * @returns Общая сумма корзины.
	 */
	getTotalPrice(): number;

	/**
	 * Очистка корзины.
	 */
	clearBasket(): void;
}

export class BasketService extends EventEmitter implements IBasketService {
	private items: { product: IProduct, quantity: number }[] = [];

	/**
	 * Добавление товара в корзину.
	 * Если товар уже есть, увеличивается его количество.
	 * @param product - Товар для добавления в корзину.
	 */
	addProduct = (product: IProduct): void => {
		const existingItem = this.items.find(item => item.product.id === product.id);

		if (existingItem) {
			// Увеличиваем количество, если товар уже в корзине
			existingItem.quantity += 1;
		} else {
			// Добавляем новый товар в корзину
			this.items.push({ product, quantity: 1 });
		}

		this.emit('basketChanged', this.items); // Уведомляем о изменениях
	};

	/**
	 * Удаление товара из корзины по его ID.
	 * Если количество товара больше 1, уменьшается количество.
	 * @param productId - Идентификатор товара для удаления.
	 */
	removeProduct = (productId: string): void => {
		const itemIndex = this.items.findIndex(item => item.product.id === productId);

		if (itemIndex !== -1) {
			const item = this.items[itemIndex];

			if (item.quantity > 1) {
				// Если больше одного, уменьшаем количество
				item.quantity -= 1;
			} else {
				// Иначе удаляем товар полностью
				this.items.splice(itemIndex, 1);
			}

			this.emit('basketChanged', this.items); // Уведомляем о изменениях
		}
	};

	/**
	 * Получение текущего списка товаров в корзине с их количеством.
	 * @returns Массив объектов с товарами и количеством.
	 */
	getItems = (): { product: IProduct, quantity: number }[] => {
		return this.items;
	};

	/**
	 * Получение общей суммы товаров в корзине.
	 * @returns Общая стоимость товаров в корзине.
	 */
	getTotalPrice = (): number => {
		return this.items.reduce((total, item) => {
			return total + (item.product.price || 0) * item.quantity;
		}, 0);
	};

	/**
	 * Очистка корзины.
	 */
	clearBasket = (): void => {
		this.items = [];
		this.emit('basketChanged', this.items); // Уведомляем о изменениях
	};
}
