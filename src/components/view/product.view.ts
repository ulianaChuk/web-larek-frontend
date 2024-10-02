import { IProduct } from '../model/product.model';
import { CDN_URL } from '../../utils/constants';

export interface IProductView {
	renderProductCard(product: IProduct): string;

	renderAllCards(products: IProduct[]): void;

	bindProductEvents(products: IProduct[], addToBasket: CallableFunction): void;

	showModal(product: IProduct, addToBasket: CallableFunction): void;

	renderModal(product: IProduct): string;
	switchDitalisClass(product: IProduct, cardCategory: HTMLElement): void;
}

export class ProductView implements IProductView {
	// Стрелочная функция для рендеринга карточки товара
	renderProductCard = (product: IProduct): string => {
		const template = document.getElementById(
			'card-catalog'
		) as HTMLTemplateElement;
		if (!template) {
			console.error('Шаблон card-catalog не найден');
			return '';
		}

		const fragment = template.content.cloneNode(true) as DocumentFragment;

		const cardTitle = fragment.querySelector('.card__title') as HTMLElement;
		const cardCategory = fragment.querySelector(
			'.card__category'
		) as HTMLElement;
		const cardPrice = fragment.querySelector('.card__price') as HTMLElement;
		const cardImage = fragment.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const cardButton = fragment.querySelector('.gallery__item') as HTMLElement;

		cardTitle.textContent = product.title;
		cardCategory.textContent = product.category;
		cardPrice.textContent = `${product.price} синапсов`;
		cardImage.src = `${CDN_URL}${product.image}`;
		cardButton.dataset.id = product.id;
		cardCategory.classList.remove('card__category_soft');
		this.switchDitalisClass(product, cardCategory);
		return cardButton.outerHTML;
	};

	renderAllCards = (products: IProduct[]): void => {
		const galleryElement = document.querySelector('.gallery');
		if (galleryElement) {
			galleryElement.innerHTML = products
				.map((product) => this.renderProductCard(product))
				.join('');
		}
	};

	// Стрелочная функция для рендеринга модального окна
	renderModal = (product: IProduct): string => {
		const template = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;
		if (!template) {
			console.error('Шаблон card-preview не найден');
			return '';
		}

		const fragment = template.content.cloneNode(true) as DocumentFragment;

		const modalTitle = fragment.querySelector('.card__title') as HTMLElement;
		const modalCategory = fragment.querySelector(
			'.card__category'
		) as HTMLElement;
		const modalPrice = fragment.querySelector('.card__price') as HTMLElement;
		const modalImage = fragment.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const modalText = fragment.querySelector('.card__text') as HTMLElement;

		modalTitle.textContent = product.title;
		modalCategory.textContent = product.category;
		modalPrice.textContent = `${product.price} синапсов`;
		modalImage.src = `${CDN_URL}${product.image}`;
		modalText.textContent = product.description || 'Нет описания';

		modalCategory.classList.remove('card__category_other');
		this.switchDitalisClass(product, modalCategory);

		const modalContainer = fragment.querySelector('.card') as HTMLElement;
		return modalContainer.outerHTML;
	};

	// Привязка событий к карточкам продуктов
	bindProductEvents = (
		products: IProduct[],
		addToBasket: CallableFunction
	): void => {
		document.querySelectorAll('.gallery__item').forEach((card) => {
			card.addEventListener('click', () => {
				const productId = (card as HTMLElement).getAttribute('data-id');
				const product = products.find((p) => p.id === productId);
				if (product) {
					this.showModal(product, addToBasket);
				}
			});
		});
	};

	// Открытие модального окна для продукта
	showModal = (product: IProduct, addToBasket: CallableFunction): void => {
		const modalElement = document.getElementById('modal-container');
		if (modalElement) {
			// Рендерим содержимое модального окна
			modalElement.querySelector('.modal__content').innerHTML =
				this.renderModal(product);
			modalElement.classList.add('modal_active'); // Активируем модальное окно

			// Привязываем событие для добавления продукта в корзину через BasketController
			const addToBasketButton = modalElement.querySelector('.card__button');
			if (addToBasketButton) {
				addToBasketButton.addEventListener('click', () => {
					addToBasket(product); // Вызываем метод из BasketController
					modalElement.classList.remove('modal_active'); // Закрываем модальное окно после добавления
				});
			}

			// Привязываем событие для закрытия модального окна
			modalElement
				.querySelector('.modal__close')
				.addEventListener('click', () => {
					modalElement.classList.remove('modal_active'); // Деактивируем модальное окно
				});
		}
	};

	switchDitalisClass = (product: IProduct, cardCategory: HTMLElement) => {
		// const cardCategory = document.querySelector('.card__category') as HTMLElement;
		switch (product.category) {
			case 'софт-скил':
				cardCategory.classList.add('card__category_soft');
				break;
			case 'дополнительное':
				cardCategory.classList.add('ccard__category_additional');
				break;
			case 'кнопка':
				cardCategory.classList.add('card__category_button');
				break;
			case 'хард-скил':
				cardCategory.classList.add('card__category_hard');
				break;
			default:
				cardCategory.classList.add('card__category_other');
				break;
		}
	};

	blockButton(isAddProduct: boolean) {
		if (isAddProduct) {
			document.querySelector('.card__button').classList.add('button_disabled');
		}
	}
	// // Стрелочная функция для рендеринга сообщения об успешном оформлении заказа
	// renderOrderSuccess = (totalPrice: number): string => {
	// 	const template = document.getElementById('success') as HTMLTemplateElement;
	// 	if (!template) {
	// 		console.error('Шаблон success не найден');
	// 		return '';
	// 	}

	// 	const fragment = template.content.cloneNode(true) as DocumentFragment;
	// 	const description = fragment.querySelector(
	// 		'.order-success__description'
	// 	) as HTMLElement;
	// 	description.textContent = `Списано ${totalPrice} синапсов`;

	// 	const successContainer = fragment.querySelector(
	// 		'.order-success'
	// 	) as HTMLElement;
	// 	return successContainer.outerHTML;
	// };
}
