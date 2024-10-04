import { IActions, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class CardView {
	protected cardElement: HTMLElement;
	protected cardCategory: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected colors = <Record<string, string>>{
		дополнительное: 'additional',
		'софт-скил': 'soft',
		кнопка: 'button',
		'хард-скил': 'hard',
		другое: 'other',
	};
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		this.cardElement = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this.cardCategory = this.cardElement.querySelector('.card__category');
		this.cardTitle = this.cardElement.querySelector('.card__title');
		this.cardImage = this.cardElement.querySelector('.card__image');
		this.cardPrice = this.cardElement.querySelector('.card__price');

		if (actions?.click) {
			this.cardElement.addEventListener('click', actions.click);
		}
	}
	
	protected updateCardCategory(element: HTMLElement, value: string): void {
		if (element) {
			element.textContent = String(value);
			element.className = `card__category card__category_${this.colors[value]}`;
		}
	}

	protected setPrice(value: number | null): string {
		if (value === null) {
			return 'Бесценно';
		}
		return String(value) + ' синапсов';
	}

	render(data: IProduct): HTMLElement {
		this.updateCardCategory(this.cardCategory, data.category);
		this.cardTitle.textContent = data.title;
		this.cardImage.src = data.image;
		this.cardImage.alt = this.cardTitle.textContent;
		this.cardPrice.textContent = this.setPrice(data.price);
		return this.cardElement;
	}
}
