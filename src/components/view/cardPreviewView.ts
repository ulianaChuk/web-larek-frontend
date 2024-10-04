import { IActions, IProduct } from '../../types';
import { IEvents } from '../base/events';
import { CardView } from './cardView';

export class CardPreview extends CardView {
	text: HTMLElement;
	button: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		super(template, events, actions);
		this.text = this.cardElement.querySelector('.card__text');
		this.button = this.cardElement.querySelector('.card__button');
		this.button.addEventListener('click', () => {
			this.events.emit('product:add');
		});
	}
	notForSale(data: IProduct): string {
		if (data.price) {
			return 'Купить';
		} else {
			this.button.setAttribute('disabled', 'true');
			return 'Не продается';
		}
	}

	render(data: IProduct): HTMLElement {
		this.updateCardCategory(this.cardCategory, data.category);
		this.cardTitle.textContent = data.title;
		this.cardImage.src = data.image;
		this.cardImage.alt = this.cardTitle.textContent;
		this.cardPrice.textContent = this.setPrice(data.price);
		this.text.textContent = data.description;
		this.button.textContent = this.notForSale(data);
		return this.cardElement;
	}
}
