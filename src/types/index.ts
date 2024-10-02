
 export interface IProduct {
	id: string;
	name: string;
	price: number | null;
	category: string;
	description: string;
	image: string;
}

export interface IProductList {
	total: number;
	items: Array<IProduct>;
}

export interface IOrder {
	items: Array<string>;
	totalAmount: number;
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderForm {
	payment?: string;
	address?: string;
	email: string;
	phone: string;
}

export interface IOrderData {
    address: string;
    paymentMethod: string;
    phone: string;
    email: string;
    items: Array<string>;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ISuccess{
orderId:string;
total:number;
}


export type FormErrors = Partial<Record<keyof IOrderForm, string>>;