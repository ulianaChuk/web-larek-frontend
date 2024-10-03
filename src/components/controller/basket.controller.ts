import { IBasketService } from '../service/basket.service';
import { IBasketView } from '../view/basket.view';
import { IProduct } from '../model/product.model';
import { IOrderView, OrderView } from '../view/order.view';
import { EventEmitter } from '../base/events';

export interface IBasketController {
	
	addToBasket(product: IProduct): void;
	clearBasket(): void;
}

export class BasketController implements IBasketController {
	private items: IProduct[];
	private totalPrice: number;
	constructor(
		private basketService: IBasketService,
		private basketView: IBasketView,
		private events: EventEmitter
		// private orderView: IOrderView
	) {
		this.basketView.handleBasketButton(
			this.basketService.getItems,
			this.basketService.getTotalPrice,
			this.basketService.removeProduct,
			
		); // Привязываем событие клика на кнопку корзины в шапке

		this.items = this.basketService.getItems();
		this.totalPrice = this.basketService.getTotalPrice();
		// Подписываемся на событие изменения корзины
		this.events.on('basketChanged', () =>
			this.basketView.updateBasketView(
				true,
				this.items,
				this.totalPrice,
				this.basketService.removeProduct
			)
		); // Обновляем корзину с аргументом
		this.events.on('basketChanged', () =>
			this.basketView.updateBasketCounter(this.items)
		); // Подписываемся на изменение корзины для обновления счетчика 
		
		
		// ПОПРАВИТЬ!
		
		// const orderView = new OrderView();
		// const modal = document.querySelector('.modal');
		// const orderButton = modal.querySelector('.basket__button');
		// console.log(orderButton);
        // if (orderButton) {
        //     orderButton.addEventListener('click', () => {
        //         orderView.openOrderModal();
        //         console.log(orderButton);
        //         console.log('click');
		// 		// this.setProductsIdToOrder();
        //     });
        // }
	}

	// Метод для добавления товара в корзину
	addToBasket = (product: IProduct): void => {
		this.basketService.addProduct(product);
		this.basketView.updateBasketCounter(this.items); // Обновляем счетчик товаров в корзине после добавления товара
	};

	handleRemoveFromBasket = () => {
		this.basketView.bindDeleteEvents(
			this.items,
			this.totalPrice,
			this.basketService.removeProduct
		);
	};

	// Метод для очистки корзины
	clearBasket = (): void => {
		this.basketService.clearBasket();
		this.basketView.updateBasketCounter(this.items); // Обновляем счетчик товаров в корзине после очистки корзины
		this.basketView.updateBasketView(
			true,
			this.items,
			this.totalPrice,
			this.basketService.removeProduct
		); // Очищаем отображение корзины в модальном окне
	};

// setProductsIdToOrder = ()=>{
//  const itemsId = this.items.map((item) => item.id);
//  console.log(itemsId);

// }

}
