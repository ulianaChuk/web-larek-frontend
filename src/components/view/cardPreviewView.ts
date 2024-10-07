import { IActions, IProduct } from '../../types';
import { IEvents } from '../base/events';
import { CardView } from './cardView';

export class CardPreview extends CardView {
	descriptionElement: HTMLElement;
	addButton: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		super(template, events, actions);
		this.descriptionElement = this.element.querySelector('.card__text');
		this.addButton = this.element.querySelector('.card__button');
		this.addButton.addEventListener('click', () => {
			this.events.emit('product:add');
		});
	}

	notForSale = (product: IProduct) => {
		if (!product.price) {
			this.addButton.setAttribute('disabled', 'true');
		}

	};

	renderCard = (product: IProduct): HTMLElement => {
		this.categoryElement = this.updateCardCategory(
			this.categoryElement,
			product.category
		);
		this.titleElement.textContent = product.title;
		this.imageElement.src = product.image;
		this.priceElement.textContent = this.setPrice(product.price);
		this.descriptionElement.textContent = product.description;
		this.notForSale(product);
		return this.element;
	};
}
