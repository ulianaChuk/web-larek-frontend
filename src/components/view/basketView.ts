import { IEvents } from '../base/events';

export class BasketView {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	orderButton: HTMLButtonElement;
	basketPrice: HTMLElement;
	basketButton: HTMLButtonElement;
	basketCounter: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.basket = template.content
			.querySelector('.basket')
			.cloneNode(true) as HTMLElement;
		this.basketList = this.basket.querySelector('.basket__list');
		this.orderButton = this.basket.querySelector('.basket__button');
		this.basketPrice = this.basket.querySelector('.basket__price');
		this.basketButton = document.querySelector('.header__basket');
		this.basketCounter = document.querySelector('.header__basket-counter');

		this.basketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
		this.orderButton.addEventListener('click', () => {
			this.events.emit('order:open');
			// console.log('click');
		});

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.basketList.replaceChildren(...items);
			this.orderButton.removeAttribute('disabled');
		} else {
			this.orderButton.setAttribute('disabled', 'disabled');
		}
	}

	renderBusketCounter = (value: number) => {
		this.basketCounter.textContent = value.toString();
	};
	renderTotalPrice = (totalPrice: number) => {
		this.basketPrice.textContent = `${totalPrice} синапсов`;
	};
	render = () => {
		return this.basket;
	};
}
