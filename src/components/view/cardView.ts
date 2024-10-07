import { IActions, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class CardView {
	protected element: HTMLElement;
	protected categoryElement: HTMLElement;
	protected titleElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected priceElement: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		 events: IEvents,
		actions?: IActions
	) {
		this.element = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this.categoryElement = this.element.querySelector('.card__category');
		this.titleElement = this.element.querySelector('.card__title');
		this.imageElement = this.element.querySelector('.card__image');
		this.priceElement = this.element.querySelector('.card__price');

		if (actions?.click) {
			this.element.addEventListener('click', actions.click);
		}
		
	}

	updateCardCategory = (element: HTMLElement, category: string) => {
		switch (category) {
			case 'дополнительное':
				element.textContent = category;
				element.className = `card__category card__category_additional`;
				break;
			case 'софт-скил':
				element.textContent = category;
				element.className = `card__category card__category_soft`;
				break;
			case 'кнопка':
				element.textContent = category;
				element.className = `card__category card__category_button`;
				break;
			case 'хард-скил':
				element.textContent = category;
				element.className = `card__category card__category_hard`;
				break;
			case 'другое':
				element.textContent = category;
				element.className = `card__category card__category_other`;
				break;
		}
		return element;
	};

	 setPrice = (price: number | null) => {
		if (price === null) {
			return 'Бесценно';
		}
		return price + ' синапсов';
	};

	renderCard = (product: IProduct) => {
		this.categoryElement = this.updateCardCategory(
			this.categoryElement,
			product.category
		);
		this.titleElement.textContent = product.title;
		this.imageElement.src = product.image;
		this.priceElement.textContent = this.setPrice(product.price);
		return this.element;
	};
}
