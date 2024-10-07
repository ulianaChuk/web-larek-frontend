import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/model/apiModel';
import { ProductModel } from './components/model/productModel';
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
const productModel = new ProductModel(events);
const basketModel = new BasketModel();
const orderModel = new OrderModel(events);

const modalView = new ModalView(modalContainer, events);
const basketView = new BasketView(basketTemplate, events);
const orderView = new OrderView(orderTemplate, events);
const orderContactsView = new OrderContactsView(contactsTemplate, events);


// Получаем данные с сервера и передаем их в модель
apiModel
	.getListProductCard()
	.then(function (data: IProduct[]) {
		productModel.updateProductCards(data);
	})
	.catch((error) => console.log(error));

// Отображения карточек товара на странице
events.on('productCards:get', () => {
	productModel.getProductCards().forEach((item) => {
		const card = new CardView(cardCatalogTemplate, events, {
			click: () => events.emit('card:select', item),
		});
		const galleryElement = document.querySelector('.gallery') as HTMLElement;
		if (galleryElement) {
			galleryElement.append(card.renderCard(item));
		} else {
			console.error('Элемент .gallery не найден');
		}
	});
});
//  Получить  данные карточки по которой кликнули
events.on('card:select', (item: IProduct) => {
	productModel.setPreview(item);
});
// Открыть детальную информацию о товаре
events.on('modalCard:open', (item: IProduct) => {
	const cardPreview = new CardPreview(cardPreviewTemplate, events);
	modalView.renderModal(cardPreview.renderCard(item));
});


// // Добавление товара в корзину

events.on('product:add', () => {
	basketModel.addProduct(productModel.product);
	basketView.renderBusketCounter(basketModel.getCounter());
	modalView.close();
});

// // Удаление товара из корзины
events.on('basket:basketItemRemove', (item: IProduct) => {
	basketModel.removeProduct(item);
	basketView.renderBusketCounter(basketModel.getCounter());
	basketView.renderTotalPrice(basketModel.getTotalPrice());
	basketView.items = basketModel.basketItems.map((item, index) =>
		new BasketItem(cardBasketTemplate, events, {
			click: () => events.emit('basket:basketItemRemove', item),
		}).render(item, index + 1)
	);
});

// Открыть корзину

events.on('basket:open', () => {
	basketView.renderTotalPrice(basketModel.getTotalPrice());

	basketView.items = basketModel.basketItems.map((item, index) =>
		new BasketItem(cardBasketTemplate, events, {
			click: () => events.emit('basket:basketItemRemove', item),
		}).render(item, index + 1)
	);
	
	modalView.renderModal(basketView.render());
});

// открытие модального окна заказа
events.on('order:open', () => {
	modalView.renderModal(orderView.render());
	orderModel.items = basketModel.basketItems.map((item) => item.id); 
	orderModel.total = basketModel.getTotalPrice();
});

// выбор способа оплаты
events.on('order:handlePayment', (button: HTMLButtonElement) => {
	orderModel.payment = button.name;
});

//изменение данных в строке адресс
events.on(`order:changeAddress`, (data: { field: string; value: string }) => {
	orderModel.setDeliveryAddress(data.field, data.value);
});

//валидация данных строки адресс и оплаты
events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	orderView.valid = !address && !payment;
	orderView.formError.textContent = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

//открытие формы с контактными данными
events.on('contacts:open', () => {
	modalView.renderModal(orderContactsView.render());
});

//изменение данных в строке контактов
events.on(`contacts:changeInput`, (data: { field: string; value: string }) => {
	orderModel.setContactData(data.field, data.value);
});

//валидация данных строки контактов
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	orderContactsView.valid = !email && !phone;
	orderContactsView.formErrors.textContent = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});


//модальное окно Успех
events.on('success:open', () => {
	apiModel
		.postOrderLot(orderModel.getOrderDetails())
		.then((data) => {
			console.log(data);
			const success = new SuccessModalView(successTemplate, events);
			basketModel.clearAllBasket();
			basketView.renderBusketCounter(basketModel.getCounter());
			modalView.renderModal(success.render(basketModel.getTotalPrice()));
		})
		.catch((error) => console.log(error));
});
//закрытие модального окна Успех
events.on('success:close', () => modalView.close());



// console.log(dataModel.productCards);
