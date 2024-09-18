# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Описание базовых классов

## Описание классов Model, которые позволяют хранить и обрабатывать данные с сервера и от пользователей.

### Класс `ProductModel` хранит данные о товаре.

Методы:
- `getProductDetails(productId: string): IProduct` - Возвращает детали продукта по его идентификатору.
- `setProductDetails(details: IProduct): void` -  Устанавливает или обновляет детали продукта.

### Класс `BasketModel` хранит данные о карзине.

Методы:
- `getCounter(): number` - возвращает количество товаров в корзине.
- `getSumAllProducts(): number` - считает сумму синапсов всех товаров в корзине.
- `addProducts(item: ICartItem)` - добавляет товар в корзину.
- `deleteProducts(productId: string): void` - удаляет товар из корзины.
- `clearBasket(): void` - очищает/удаляет все товары из корзины.

### Класс `FormModel` хранит данные, введенные пользователем в форму.

Методы:
- `setOrderAddress(address:string):void` - сохраняет адрес пользователя.
- `setPaymentMethod(paymentMethod: string): void` - сохраняет способ оплаты
- `setOrderData(data: IOrderForm): void` - сохраняет номер телефона/почту пользователя.
- `validateFormData(data: IOrderForm): FormErrors` - проверяет номер телефона/почту пользователя.
- `getOrderData():IOrderData` - возвращает объект данных пользователя с выбранными товарами.

### Класс `OrderModel` хранит данные о заказе.

Методы:
- `getOrderDetails(orderId: string): Order` - Возвращает детали заказа по его идентификатору.
- `setOrderDetails(details: IOrder): void` -  Устанавливает или обновляет детали заказа

## Классы View позволяют отображать элементы страницы с полученными данными, позволяют взаимодействовать с пользователем.

### Класс `ProductView` отображает  информацию о продукте.

Методы:
- `renderProductDetails(product: IProduct): void` - рендерит детали продукта.
- `renderGoodsCatalog(products: IProductList): void` - рендерит каталог с товаром.

### Класс `CartView` отображает корзину.

Методы:
- `renderCartItems(items: ICartItem[]): void` - Рендерит товары в корзине.
- `renderTotalAmount(total: number): void` - Рендерит общую сумму товаров в корзине.

### Класс `Modal` управляет отображением модальных окон.

Методы:
- `open(): void` - отображает модальное окон.
- `close(): void` - закрывает модальное окно.

### Класс `OrderFormView` отображает форму заказа.

Методы:
- `renderForm(data: IOrderForm): void` -  рендерит форму заказа.
- `showValidationErrors(errors: FormErrors): void`- отображает ошибки валидации.

### Класс `SuccessModalView` отображает модальное окно "Успех".

Методы:
- `open(totalAmount: number): void` - отображает модальное окно.
- `close(): void` - закрывает модальное окно.

### Класс `ProductDetailsModalView` отображает модальное окно с деталями продукта.

Методы:
- `open(product: IProduct): void` - отображает модальное окно с деталями продукта.
- `close(): void` - закрывает модальное окно.


### Класс `CatalogController` управляет взаимодействием между `CatalogView` и `ProductModel`.

Методы:
- `init(): void` - инициализирует контроллер каталога.
- `handleProductClick(productId: string): void` - обрабатывает клик по товару, загружает и отображает его детали.

### Класс `ProductController` управляет взаимодействием между `ProductView` и `ProductModel`.

Методы:
- `init(): void` - инициализирует контроллер продукта.
- `handleAddToCart(productId: string): void` - обрабатывает добавление товара в корзину.

### Класс `CartController` управляет взаимодействием между `CartView` и `CartModel`.

Методы:
- `init(): void` - инициализирует контроллер корзины.
- `handleRemoveFromCart(productId: string): void` - обрабатывает удаление товара из корзины.
- `handleClearCart(): void` - обрабатывает очистку корзины.

### Класс `OrderController` управляет взаимодействием между `OrderView` и `OrderModel` .

Методы:
- `init(): void` - инициализирует контроллер заказа.
- `handlePlaceOrder(order: IOrder): void` - обрабатывает размещение заказа.

### Класс `FormController` управляет взаимодействием между `FormView` и `FormModel`.

Методы:
- `init(): void` - инициализирует контроллер формы.
- `handleFormSubmit(data: IOrderForm): void` - обрабатывает отправку формы.