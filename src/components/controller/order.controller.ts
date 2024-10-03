import { OrderView } from '../view/order.view';
import { BasketController } from './basket.controller';

export class OrderController {
    constructor(
        private orderView: OrderView,
        private basketController: BasketController
    ) {}

    
}