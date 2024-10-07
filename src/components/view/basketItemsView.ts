import { IActions, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class BasketItem {
	basketItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		this.basketItem = template.content
			.querySelector('.basket__item')
			.cloneNode(true) as HTMLElement;
		this.index = this.basketItem.querySelector('.basket__item-index');
		this.title = this.basketItem.querySelector('.card__title');
		this.price = this.basketItem.querySelector('.card__price');
		this.buttonDelete = this.basketItem.querySelector('.basket__item-delete');

		if (actions?.click) {
			this.buttonDelete.addEventListener('click', actions.click);
		}
	}

	render = (data: IProduct, item: number) => {
		this.index.textContent = String(item);
		this.title.textContent = data.title;
		this.price.textContent =
			data.price === null ? 'Бесценно' : `${data.price} синапсов`;
		return this.basketItem;
	};
}
