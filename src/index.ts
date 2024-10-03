import './scss/styles.scss';
import { ProductController } from './components/controller/product.controller';
import { BasketService } from './components/service/basket.service';
import { ProductView } from './components/view/product.view';
import { BasketView } from './components/view/basket.view';
import { BasketController } from './components/controller/basket.controller'; // Новый контроллер корзины
import { ProductService } from './components/service/product.service';
import { OrderView } from './components/view/order.view';
import { OrderController } from './components/controller/order.controller';
import { EventEmitter } from './components/base/events';
import { OrderService } from './components/service/order.service';


const events = new EventEmitter();
// Создаем экземпляры сервисов и представлений
const basketService = new BasketService();
const productService = new ProductService();
const orderService = new OrderService(events);

const productView = new ProductView();
const basketView = new BasketView(events);
const orderView = new OrderView(events);
// Создаем контроллер корзины
const basketController = new BasketController(basketService, basketView, events);

// Создаем контроллер продуктов с передачей basketController
const productController = new ProductController(productService, productView, basketController);
const orderController = new OrderController(orderView, basketController);