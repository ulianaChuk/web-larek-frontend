import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/model/apiModel';
import { DataModel } from './components/model/dataModel';
import { CardPreview } from './components/view/cardPreviewView';
import { CardView } from './components/view/cardView';
import { ModalView } from './components/view/modalView';

import { IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { BasketView } from './components/view/basketView';
import { BasketModel } from './components/model/basketModel';
import { BasketItem } from './components/view/basketItemsView';

const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;


const modalContainer = document.querySelector(
	'#modal-container'
) as HTMLElement;


const events = new EventEmitter();
const apiModel = new ApiModel(CDN_URL, API_URL);
const dataModel = new DataModel(events);
const basketModel = new BasketModel();
const modal = new ModalView(modalContainer, events);
const basket = new BasketView(basketTemplate, events);

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
	dataModel.setPreview(item), console.log(item);
});
// Открыть детальную информацию о товаре
events.on('modalCard:open', (item: IProduct) => {
	const cardPreview = new CardPreview(cardPreviewTemplate, events);
	modal.setContent(cardPreview.render(item));
	modal.render();
});

// Открыть корзину

events.on('basket:open', () => {
	basket.renderTotalPrice(basketModel.getTotalPrice());
	let i = 0;
	basket.items = basketModel.basketItems.map((item) => {
		const basketItem = new BasketItem(cardBasketTemplate, events, {
			click: () => events.emit('basket:basketItemRemove', item),
		});
		i = i + 1;
		return basketItem.render(item, i);
	});
    modal.setContent(basket.render());
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
    let i = 0;
    basket.items = basketModel.basketItems.map((item) => {
      const basketItem = new BasketItem(cardBasketTemplate, events, { click: () => events.emit('basket:basketItemRemove', item) });
      i = i + 1;
      return basketItem.render(item, i);
    })
  });

  // Открытие формы заказа с оплатой


// Получаем данные с сервера и передаем их в модель
apiModel
	.getListProductCard()
	.then(function (data: IProduct[]) {
		dataModel.productCards = data;
	})
	.catch((error) => console.log(error));

    console.log(dataModel.productCards)

