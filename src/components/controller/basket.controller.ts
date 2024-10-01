import { IBasketService } from '../service/basket.service';
import { IBasketView } from '../view/basket.view';
import { IProduct } from '../model/product.model';
// import { IOrderView, OrderView } from '../view/order.view';

export interface IBasketController {


	/**
	 * Добавляет товар в корзину.
	 * @param product - Товар для добавления.
	 */
	addToBasket(product: IProduct): void;

	// /**
	//  * Удаляет товар из корзины.
	//  * @param productId - Идентификатор товара для удаления.
	//  */
	// removeFromBasket(productId: string): void;

	// /**
	//  * Обновляет счетчик товаров в корзине в шапке.
	//  */
	// updateBasketCounter(): void;

	/**
	 * Очищает корзину.
	 */
	clearBasket(): void;
	
}

export class BasketController implements IBasketController {
	// private orderView = new OrderView();
	private items: IProduct[]
	private totalPrice: number;
	constructor(
		private basketService: IBasketService,
		private basketView: IBasketView,
		// private items: IProduct[]
		// private orderView : IOrderView
	) {
		this.basketView.handleBasketButton(this.basketService.getItems, this.basketService.getTotalPrice); // Привязываем событие клика на кнопку корзины в шапке
		
		this.items = this.basketService.getItems()
		this.totalPrice = this.basketService.getTotalPrice()
		// Подписываемся на событие изменения корзины
		this.basketService.on('basketChanged', () => this.basketView.updateBasketView(true,this.items,this.totalPrice,this.basketService.removeProduct)); // Обновляем корзину с аргументом
		this.basketService.on('basketChanged', ()=> this.basketView.updateBasketCounter(this.items)); // Подписываемся на изменение корзины для обновления счетчика

		


		
		
	}

	// Метод для открытия корзины
	// openBasket = (): void => {


		// const modalElement = document.getElementById('modal-container');
		// if (modalElement) {
		// 	const basketItems = this.basketService.getItems();
		// 	const totalPrice = this.basketService.getTotalPrice(); // Рассчитываем общую стоимость товаров
		// 	this.basketView.renderBasket(basketItems, totalPrice); // Передаем два аргумента: basketItems и totalPrice
		// 	// modalElement.querySelector('.modal__content')!.innerHTML = this.basketView.renderBasket(basketItems, totalPrice); // Передаем два аргумента: basketItems и totalPrice
		// 	modalElement.classList.add('modal_active'); // Активируем модальное окно корзины

		// 	// Привязываем событие для закрытия корзины
		// 	const closeModalButton = modalElement.querySelector('.modal__close');
		// 	if (closeModalButton) {
		// 		closeModalButton.addEventListener('click', () => {
		// 			modalElement.classList.remove('modal_active');
		// 		});
		// 	}

		// 	// Привязываем событие удаления товара при клике на кнопку удаления
		// 	this.bindDeleteEvents();
		// }

	// };

	// Метод для добавления товара в корзину
	addToBasket = (product: IProduct): void => {
		this.basketService.addProduct(product);
		this.basketView.updateBasketCounter(this.items); // Обновляем счетчик товаров в корзине после добавления товара
	};
	
 handleRemoveFromBasket=()=>{
this.basketView.bindDeleteEvents(this.items, this.totalPrice, this.basketService.removeProduct)
 }
	// // Метод для удаления товара из корзины и удаления элемента из DOM
	// removeFromBasket = (productId: string): void => {
	// 	// Удаляем товар из сервиса корзины
	// 	this.basketService.removeProduct(productId);
	// 	this.basketView.updateBasketCounter(this.items); // Обновляем счетчик товаров в корзине

	// 	// Находим элемент корзины и удаляем его из DOM
	// 	const basketItemElement = document.querySelector(
	// 		`.basket__item[data-id="${productId}"]`
	// 	);
	// 	if (basketItemElement) {
	// 		basketItemElement.remove(); // Удаляем элемент <li> из DOM
	// 	}

	// 	// Обновляем общую стоимость корзины
	// 	const totalPrice = this.basketService.getTotalPrice();
	// 	this.basketView.renderTotalPrice(totalPrice);

	// 	// Проверяем, если корзина пуста, обновляем представление
	// 	if (this.basketService.getItems().length === 0) {
	// 		this.updateBasketView(true); // Обновляем корзину для отображения пустого состояния
	// 	}
	// };

	// Метод для очистки корзины
	clearBasket = (): void => {
		this.basketService.clearBasket();
		this.basketView.updateBasketCounter(this.items); // Обновляем счетчик товаров в корзине после очистки корзины
		this.basketView.updateBasketView(true,this.items,this.totalPrice,this.basketService.removeProduct); // Очищаем отображение корзины в модальном окне
	};

	// // Метод для обновления представления корзины
	// updateBasketView = (keepModalOpen: boolean): void => {
	// 	const basketItems = this.basketService.getItems();
	// 	const totalPrice = this.basketService.getTotalPrice();
	// 	const basketElement = document.querySelector('.basket__list');
	// 	const modalElement = document.getElementById('modal-container');

	// 	if (basketElement) {
	// 		this.basketView.renderBasketItems(basketItems); // Обновляем товары
	// 		this.basketView.renderTotalPrice(totalPrice); // Обновляем общую сумму товаров
	// 	}

	// 	// Обновляем представление корзины и поддерживаем модальное окно активным
	// 	if (keepModalOpen && modalElement) {
	// 		modalElement.classList.add('modal_active');
	// 		this.bindDeleteEvents(); // Привязываем события для обновленных кнопок удаления
	// 	}
	// };

	// // Метод для обновления счётчика товаров в корзине
	// updateBasketCounter = (): void => {
	// 	const basketCounter = document.querySelector('.header__basket-counter');
	// 	if (basketCounter) {
	// 		const totalItems = this.basketService
	// 			.getItems().length;
	// 		basketCounter.textContent = totalItems.toString();
	// 	}
	// };

	// // Метод для привязки событий удаления для всех элементов корзины
	// bindDeleteEvents = (): void => {
	// 	const deleteButtons = document.querySelectorAll('.basket__item-delete');
	// 	deleteButtons.forEach((button) => {
	// 		button.addEventListener('click', (event) => {
	// 			const productId = (event.target as HTMLElement).dataset.id;
	// 			if (productId) {
	// 				this.removeFromBasket(productId); // Удаляем продукт из корзины и DOM
	// 			}
	// 		});
	// 	});
	// };
}
