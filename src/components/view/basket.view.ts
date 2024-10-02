import { IProduct } from '../model/product.model';

export interface IBasketView {
	/**
	 * Рендеринг товаров в корзине.
	 * @param items - Массив объектов товаров с их количеством.
	 * @returns HTML списка товаров в корзине.
	 */
	renderBasketItems(items: IProduct[]): string;

	/**
	 * Рендеринг общей стоимости товаров в корзине.
	 * @param totalPrice - Общая сумма товаров в корзине.
	 * @returns HTML с отображением общей стоимости.
	 */
	renderTotalPrice(totalPrice: number): string;

	/**
	 * Рендеринг корзины, включая товары и общую стоимость.
	 * @param items - Массив объектов товаров с их количеством.
	 * @param totalPrice - Общая сумма товаров в корзине.
	 * @returns HTML корзины.
	 */
	renderBasket(items: IProduct[], totalPrice: number): void;

	handleBasketButton(
		getItems: CallableFunction,
		getTotalPrice: CallableFunction,
		removeProduct: CallableFunction
	): void;

	openBasket(getItems: CallableFunction, getTotalPrice: CallableFunction,removeProduct:CallableFunction): void;
	// updateBasketCounter(getItems:CallableFunction): void ;
	updateBasketCounter(items: IProduct[]): void;
	updateBasketView(
		keepModalOpen: boolean,
		items: IProduct[],
		totalPrice: number,
		removeProduct: CallableFunction
	): void;
	bindDeleteEvents(
		items: IProduct[],
		totalPrice: number,
		removeProduct: CallableFunction
	): void;

	removeFromBasket(
		productId: string,
		items: IProduct[],
		totalPrice: number,
		removeProduct: CallableFunction
	): void;
}

export class BasketView implements IBasketView {
	// Рендеринг товаров в корзине
	renderBasketItems = (items: IProduct[]): string => {
		return items
			.map((item, index) => {
				const template = document.getElementById(
					'card-basket'
				) as HTMLTemplateElement;
				if (!template) {
					console.error('Шаблон card-basket не найден');
					return '';
				}

				const fragment = template.content.cloneNode(true) as DocumentFragment;

				const basketTitle = fragment.querySelector(
					'.card__title'
				) as HTMLElement;
				const basketPrice = fragment.querySelector(
					'.card__price'
				) as HTMLElement;
				const basketIndex = fragment.querySelector(
					'.basket__item-index'
				) as HTMLElement;
				const deleteButton = fragment.querySelector(
					'.basket__item-delete'
				) as HTMLElement;

				// Устанавливаем данные товара и количество
				basketTitle.textContent = item.title;
				basketPrice.textContent =
					item.price !== null ? `${item.price} синапсов ` : 'Бесценно';
				basketIndex.textContent = (index + 1).toString();
				deleteButton.dataset.id = item.id;

				// Возвращаем HTML конкретного элемента
				const basketItem = fragment.querySelector(
					'.basket__item'
				) as HTMLElement;
				return basketItem.outerHTML;
			})
			.join('');
	};

	// Рендеринг общей стоимости товаров в корзине
	renderTotalPrice = (totalPrice: number): string => {
		const priceElement = document.querySelector('.basket__price');
		if (!priceElement) {
			console.error('Элемент для отображения общей стоимости не найден');
			return '';
		}
		priceElement.textContent = `${totalPrice} синапсов`;
		return priceElement.outerHTML;
	};

	// Рендеринг полной корзины с товарами и общей стоимостью
	renderBasket = (items: IProduct[], totalPrice: number): void => {
		const template = document.getElementById('basket') as HTMLTemplateElement;
		const fragment = template.content.cloneNode(true) as HTMLElement;
		const basketItems = fragment.querySelector('.basket__list') as HTMLElement;
		const basketTotalPrice = fragment.querySelector(
			'.basket__price'
		) as HTMLElement;
		const modalContent = document.querySelector('.modal__content');

		basketItems.innerHTML = this.renderBasketItems(items);
		basketTotalPrice.textContent = `${totalPrice} синапсов`;

		modalContent.innerHTML = ``;
		modalContent.appendChild(fragment);
	};

	openBasket = (
		getItems: CallableFunction,
		getTotalPrice: CallableFunction,
		removeProduct: CallableFunction
	): void => {
		const modalElement = document.getElementById('modal-container');
		if (modalElement) {
			this.renderBasket(getItems(), getTotalPrice());
			modalElement.classList.add('modal_active');
			// Привязываем событие для закрытия модального окна

			modalElement
				.querySelector('.modal__close')
				.addEventListener('click', () => {
					modalElement.classList.remove('modal_active'); // Деактивируем модальное окно
				});
		}
		this.bindDeleteEvents(getItems(), getTotalPrice(), removeProduct);
	};

	handleBasketButton = (
		getItems: CallableFunction,
		getTotalPrice: CallableFunction,removeProduct: CallableFunction
	) => {
		const basketButton = document.querySelector('.header__basket');
		if (basketButton) {
			basketButton.addEventListener('click', () => {
				this.openBasket(getItems, getTotalPrice,removeProduct);
			}); // Открытие корзины по клику
		}
	};

	updateBasketCounter = (items: IProduct[]): void => {
		const basketCounter = document.querySelector('.header__basket-counter');
		if (basketCounter) {
			const totalItems = items ? items.length : 0; // Проверяем, что items не undefined
			basketCounter.textContent = totalItems.toString();
		}
	};
	// Метод для обновления представления корзины
	updateBasketView = (
		keepModalOpen: boolean,
		items: IProduct[],
		totalPrice: number,
		removeProduct: CallableFunction
	): void => {
		// const basketItems = this.basketService.getItems();
		// const totalPrice = this.basketService.getTotalPrice();
		const basketElement = document.querySelector('.basket__list');
		const modalElement = document.getElementById('modal-container');

		if (basketElement) {
			this.renderBasketItems(items); // Обновляем товары
			this.renderTotalPrice(totalPrice); // Обновляем общую сумму товаров
		}

		// Обновляем представление корзины и поддерживаем модальное окно активным
		if (keepModalOpen && modalElement) {
			modalElement.classList.add('modal_active');
			this.bindDeleteEvents(items, totalPrice, removeProduct); // Привязываем события для обновленных кнопок удаления
		}
	};

	// Метод для привязки событий удаления для всех элементов корзины
	bindDeleteEvents = (
		items: IProduct[],
		totalPrice: number,
		removeProduct: CallableFunction
	): void => {
		const deleteButtons = document.querySelectorAll('.basket__item-delete');
		deleteButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				const productId = (event.target as HTMLElement).dataset.id;
				if (productId) {
					this.removeFromBasket(productId, items, totalPrice, removeProduct); // Удаляем продукт из корзины и DOM
				}
			});
		});
	};
	// Метод для удаления товара из корзины и удаления элемента из DOM
	removeFromBasket = (
		productId: string,
		items: IProduct[],
		totalPrice: number,
		removeProduct: CallableFunction
	): void => {
		// Удаляем товар из сервиса корзины
		removeProduct(productId);
		this.updateBasketCounter(items); // Обновляем счетчик товаров в корзине

		// Находим элемент корзины и удаляем его из DOM
		const basketItemElement = document.querySelector(
			`.basket__item[data-id="${productId}"]`
		);
		if (basketItemElement) {
			basketItemElement.remove(); // Удаляем элемент <li> из DOM
		}

		// Обновляем общую стоимость корзины
		// const totalPrice = this.basketService.getTotalPrice();
		this.renderTotalPrice(totalPrice);

		// Проверяем, если корзина пуста, обновляем представление
		if (items.length === 0) {
			this.updateBasketView(true, items, totalPrice,removeProduct); // Обновляем корзину для отображения пустого состояния
		}
	};
	
}
