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

interface ICartItem {
    productId: string;  
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
	payment?: string;
	address?: string;
	email: string;
	phone: string;
}
interface IOrderData {
    address: string;
    paymentMethod: string;
    phone: string;
    email: string;
    items: ICartItem[];
}

interface IOrderResult {
	id: string;
	total: number;
}

type FormErrors = Partial<Record<keyof IOrderForm, string>>;
