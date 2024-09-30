import { IProduct } from '../model/product.model';

export interface IBasketView {
	/**
	 * Рендеринг товаров в корзине.
	 * @param items - Массив объектов товаров с их количеством.
	 * @returns HTML списка товаров в корзине.
	 */
	renderBasketItems(items: { product: IProduct, quantity: number }[]): string;

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
	renderBasket(items: { product: IProduct, quantity: number }[], totalPrice: number): void;
}
export class BasketView implements IBasketView {
	// Рендеринг товаров в корзине
	renderBasketItems = (items: { product: IProduct, quantity: number }[]): string => {
		return items.map((item, index) => {
			const template = document.getElementById('card-basket') as HTMLTemplateElement;
			if (!template) {
				console.error('Шаблон card-basket не найден');
				return '';
			}

			const fragment = template.content.cloneNode(true) as DocumentFragment;

			const basketTitle = fragment.querySelector('.card__title') as HTMLElement;
			const basketPrice = fragment.querySelector('.card__price') as HTMLElement;
			const basketIndex = fragment.querySelector('.basket__item-index') as HTMLElement;
			const deleteButton = fragment.querySelector('.basket__item-delete') as HTMLElement;

			// Устанавливаем данные товара и количество
			basketTitle.textContent = item.product.title;
			basketPrice.textContent = item.product.price !== null
				? `${item.product.price} синапсов x ${item.quantity}`
				: 'Бесценно';
			basketIndex.textContent = (index + 1).toString();
			deleteButton.dataset.id = item.product.id;

			// Возвращаем HTML конкретного элемента
			const basketItem = fragment.querySelector('.basket__item') as HTMLElement;
			return basketItem.outerHTML;
		}).join('');
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
	renderBasket = (items: { product: IProduct, quantity: number }[], totalPrice: number): void => {
		const template = document.getElementById('basket') as HTMLTemplateElement;
		const fragment = template.content.cloneNode(true) as HTMLElement;
		const basketItems = fragment.querySelector('.basket__list') as HTMLElement;
		const basketTotalPrice = fragment.querySelector('.basket__price') as HTMLElement;
		const modalContent = document.querySelector('.modal__content')

		basketItems.innerHTML = this.renderBasketItems(items) ;
		basketTotalPrice.textContent = `${totalPrice} синапсов`;
	
		modalContent.innerHTML = ``;
		modalContent.appendChild(fragment);

		// if (modalElement) {
			
		// 	modalElement.classList.add('modal_active');
		// }

	};
}
