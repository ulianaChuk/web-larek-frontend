import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/model/apiModel';
import { DataModel } from './components/model/dataModel';
import { CardPreview } from './components/view/cardPreviewView';
import { CardView } from './components/view/cardView';
import { ModalView } from './components/view/modalView';

import { IOrderForm, IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { BasketView } from './components/view/basketView';
import { BasketModel } from './components/model/basketModel';
import { BasketItem } from './components/view/basketItemsView';
import { OrderView } from './components/view/orderView';
import { OrderModel } from './components/model/orderModel';
import { OrderContactsView } from './components/view/orderContacts';
import { SuccessModalView } from './components/view/successView';

const cardCatalogTemplate = document.getElementById(
	'card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.getElementById(
	'card-preview'
) as HTMLTemplateElement;
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const orderTemplate = document.getElementById('order') as HTMLTemplateElement;
const contactsTemplate = document.getElementById(
	'contacts'
) as HTMLTemplateElement;
const successTemplate = document.getElementById(
	'success'
) as HTMLTemplateElement;

const modalContainer = document.querySelector(
	'#modal-container'
) as HTMLElement;

const events = new EventEmitter();
const apiModel = new ApiModel(CDN_URL, API_URL);
const dataModel = new DataModel(events);
const basketModel = new BasketModel();
const orderModel = new OrderModel(events);

const modal = new ModalView(modalContainer, events);
const basket = new BasketView(basketTemplate, events);
const order = new OrderView(orderTemplate, events);
const orderContacts = new OrderContactsView(contactsTemplate, events);


// Получаем данные с сервера и передаем их в модель
apiModel
	.getListProductCard()
	.then(function (data: IProduct[]) {
		dataModel.productCards = data;
	})
	.catch((error) => console.log(error));

// Отображения карточек товара на странице
events.on('productCards:get', () => {
	dataModel.productCards.forEach((item) => {
		const card = new CardView(cardCatalogTemplate, events, {
			click: () => events.emit('card:select', item),
		});
		const galleryElement = document.querySelector('.gallery') as HTMLElement;
		if (galleryElement) {
			galleryElement.append(card.render(item));
		} else {
			console.error('Элемент .gallery не найден');
		}
	});
});
//  Получить  данные карточки по которой кликнули
events.on('card:select', (item: IProduct) => {
	dataModel.setPreview(item);
});
// Открыть детальную информацию о товаре
events.on('modalCard:open', (item: IProduct) => {
	const cardPreview = new CardPreview(cardPreviewTemplate, events);
	modal.content = cardPreview.render(item);
	modal.render();
});


// // Добавление товара в корзину

events.on('product:add', () => {
	basketModel.addProduct(dataModel.selectedСard);
	basket.renderBusketCounter(basketModel.getCounter());
	modal.close();
});

// // Удаление товара из корзины
events.on('basket:basketItemRemove', (item: IProduct) => {
	basketModel.removeProduct(item);
	basket.renderBusketCounter(basketModel.getCounter());
	basket.renderTotalPrice(basketModel.getTotalPrice());
	basket.items = basketModel.basketItems.map((item, index) =>
		new BasketItem(cardBasketTemplate, events, {
			click: () => events.emit('basket:basketItemRemove', item),
		}).render(item, index + 1)
	);
});

// Открыть корзину

events.on('basket:open', () => {
	basket.renderTotalPrice(basketModel.getTotalPrice());

	basket.items = basketModel.basketItems.map((item, index) =>
		new BasketItem(cardBasketTemplate, events, {
			click: () => events.emit('basket:basketItemRemove', item),
		}).render(item, index + 1)
	);
	modal.content = basket.render();
	modal.render();
});

// открытие модального окна заказа
events.on('order:open', () => {
	modal.content = order.render();
	modal.render();
	orderModel.items = basketModel.basketItems.map((item) => item.id); // передаём список id товаров которые покупаем
	orderModel.total = basketModel.getTotalPrice();
});

// выбор способа оплаты
events.on('order:handlePayment', (button: HTMLButtonElement) => {
	orderModel.payment = button.name;
});

//изменение данных в строке адресс
events.on(`order:changeAddress`, (data: { field: string; value: string }) => {
	orderModel.setOrderAddress(data.field, data.value);
});

//валидация данных строки адресс и оплаты
events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.valid = !address && !payment;
	order.formError.textContent = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

//открытие формы с контактными данными
events.on('contacts:open', () => {
	modal.content = orderContacts.render();
	modal.render();
});

//изменение данных в строке контактов
events.on(`contacts:changeInput`, (data: { field: string; value: string }) => {
	orderModel.setContactData(data.field, data.value);
});

//валидация данных строки контактов
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	orderContacts.valid = !email && !phone;
	orderContacts.formErrors.textContent = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});
//модальное окно Успех
events.on('success:open', () => {
	apiModel
		.postOrderLot(orderModel.getOrderLot())
		.then((data) => {
			console.log(data);
			const success = new SuccessModalView(successTemplate, events);
			modal.content = success.render(basketModel.getTotalPrice());
			basketModel.clearAllBasket();
			basket.renderBusketCounter(basketModel.getCounter());
			modal.render();
		})
		.catch((error) => console.log(error));
});
//закрытие модального окна Успех
events.on('success:close', () => modal.close());

//блокирую прокрутку
events.on('modal:open', () => {
	modal.locked = true;
});
//разблокирую прокрутку
events.on('modal:close', () => {
	modal.locked = false;
});

// console.log(dataModel.productCards);
