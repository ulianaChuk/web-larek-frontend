import { OrderView } from '../view/order.view';
import { BasketController } from './basket.controller';

export class OrderController {
    constructor(
        private orderView: OrderView,
        private basketController: BasketController
    ) {}

    init = (): void => {

        const orderButton = document.querySelector('.basket__button');
        if (orderButton) {
            orderButton.addEventListener('click', () => {
                this.orderView.openOrderModal();
                console.log(orderButton);
                console.log('click');
            });
        }
    };

    clearBasket = (): void => {
        this.basketController.clearBasket();
    };
}