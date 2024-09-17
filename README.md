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
- `getProductDetails` - Возвращает детали продукта по его идентификатору.
- `setProductDetails` -  Устанавливает или обновляет детали продукта.

### Класс `BasketModel` хранит данные о карзине.

Методы:
- `getCounter` - возвращает количество товаров в корзине.
- `getSumAllProducts` - считает сумму синапсов всех товаров в корзине.
- `setSProducts` - добавляет товар в корзину.
- `deleteProducts` - удаляет товар из корзины.
- `clearBasket` - очищает/удаляет все товары из корзины.

### Класс `FormModel` хранит данные, введенные пользователем в форму.

Методы:
- `setOrderAddress` - сохраняет адрес пользователя.
- `setPaymentMethod` - сохраняет способ оплаты
- `setOrderData` - сохраняет номер телефона/почту пользователя.
- `validateFormData` - проверяет номер телефона/почту пользователя.
- `getOrderData` - возвращает объект данных пользователя с выбранными товарами.

### Класс `OrderModel` хранит данные о заказе.

Методы:
- `getOrderDetails` - Возвращает детали заказа по его идентификатору.
- `setOrderDetails` -  Устанавливает или обновляет детали заказа

## Классы View позволяют отображать элементы страницы с полученными данными, позволяют взаимодействовать с пользователем.

### Класс `ProductView` отображает  информацию о продукте.

Методы:
- `renderProductDetails` - рендерит детали продукта.
- `renderGoodsCatalog` - рендерит каталог с товаром.

### Класс `CartView` отображает корзину.

Методы:
- `renderCartItems` - Рендерит товары в корзине.
- `renderTotalAmount` - Рендерит общую сумму товаров в корзине.

### Класс `Modal` управляет отображением модальных окон.

Методы:
- open - отображает модальное окон.
- close - закрывает модальное окно.

