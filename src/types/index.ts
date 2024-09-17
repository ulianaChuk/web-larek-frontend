interface IProduct {
	id: string;
	name: string;
	price: number | null;
	category: string;
	description: string;
	image: string;
}

interface IProductList {
	total: number;
	items: Array<IProduct>;
}

interface IOrder {
	id: string;
	items: Array<string>;
	totalAmount: number;
	payment: string;
	deliveryAddress: string;
	email: string;
	phone: string;
}

interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

interface IOrderResult {
	id: string;
	total: number;
}

type FormErrors = Partial<Record<keyof IOrderForm, string>>;
