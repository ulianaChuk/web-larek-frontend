import './scss/styles.scss';
import { ProductController } from './components/controller/product.controller';
import { BasketService } from './components/service/basket.service';
import { ProductView } from './components/view/product.view';
import { BasketView } from './components/view/basket.view';
import { BasketController } from './components/controller/basket.controller'; // Новый контроллер корзины
import { ProductService } from './components/service/product.service';

// Создаем экземпляры сервисов и представлений
const basketService = new BasketService();
const productView = new ProductView();
const basketView = new BasketView();
const productService = new ProductService();
// Создаем контроллер корзины
const basketController = new BasketController(basketService, basketView);

// Создаем контроллер продуктов с передачей basketController
const productController = new ProductController(productService, productView, basketController);
