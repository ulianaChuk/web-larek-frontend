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
	 * Привязывает события к карточкам продуктов.
	 * @param products - Массив объектов продуктов, которые были отрендерены.
	 */
	bindProductEvents(products: IProduct[]): void;

	/**
	 * Открывает модальное окно с информацией о продукте.
	 * @param product - Объект продукта, который нужно показать в модальном окне.
	 */
	showModal(product: IProduct): void;
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
			this.bindProductEvents(await products);
		} catch (error) {
			console.error('Ошибка при загрузке товаров:', error);
		}
	};

	// Привязка событий к карточкам продуктов
	bindProductEvents = (products: IProduct[]): void => {
		document.querySelectorAll('.gallery__item').forEach((card) => {
			card.addEventListener('click', () => {
				const productId = (card as HTMLElement).getAttribute('data-id');
				const product = products.find((p) => p.id === productId);
				if (product) {
					this.showModal(product);
				}
			});
		});
	};

	// Открытие модального окна для продукта
	showModal = (product: IProduct): void => {
		const modalElement = document.getElementById('modal-container');
		if (modalElement) {
			// Рендерим содержимое модального окна
			modalElement.querySelector('.modal__content').innerHTML =
				this.productView.renderModal(product);
			modalElement.classList.add('modal_active'); // Активируем модальное окно

			// Привязываем событие для добавления продукта в корзину через BasketController
			const addToBasketButton = modalElement.querySelector('.card__button');
			if (addToBasketButton) {
				addToBasketButton.addEventListener('click', () => {
					this.basketController.addToBasket(product); // Вызываем метод из BasketController
					modalElement.classList.remove('modal_active'); // Закрываем модальное окно после добавления
				});
			}

			// Привязываем событие для закрытия модального окна
			modalElement
				.querySelector('.modal__close')!
				.addEventListener('click', () => {
					modalElement.classList.remove('modal_active'); // Деактивируем модальное окно
				});
		}
	};
}
