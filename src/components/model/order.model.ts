import { IOrder } from "../../types";


export class Order implements IOrder {
	constructor(
		public items: Array<string>,
        public total: number,
        public  payment: string,
        public address: string,
        public email: string,
        public phone: string,
	) {}

	// Статический метод для создания продукта из данных API
	static fromBasket(data: IOrder): Order {
		return new Order(
			data.items,
			data.total,
			data.payment,
			data.address,
			data.email,
			data.phone
		);
	}
}