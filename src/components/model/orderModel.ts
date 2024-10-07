import { IFormErrors, IOrder } from '../../types';
import { IEvents } from '../base/events';

export class OrderModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	formValidationErrors: IFormErrors = {};

	constructor(protected events: IEvents) {
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.address = '';
		this.total = 0;
		this.items = [];
	}

	setDeliveryAddress(field: string, adress: string) {
		if (field === 'address') {
			this.address = adress;
		}

		if (this.isOrderValid()) {
			this.events.emit('order:ready', this.getOrderDetails());
		}
	}
	isOrderValid() {
		const regexp = /^[а-яА-Я0-9,.\s]+$/;
		const errors: typeof this.formValidationErrors = {};

		if (!regexp.test(this.address)) {
			errors.address = 'Необходимо указать адрес';
		} else if (!this.payment) {
			errors.payment = 'Выберите способ оплаты';
		}

		this.formValidationErrors = errors;
		this.events.emit('formErrors:address', this.formValidationErrors);
		return Object.keys(errors).length === 0;
	}
	setContactData(field: string, contactsData: string) {
		if (field === 'email') {
			this.email = contactsData;
		} else if (field === 'phone') {
			this.phone = contactsData;
		}

		if (this.areContactsValid()) {
			this.events.emit('order:ready', this.getOrderDetails());
		}
	}
	areContactsValid() {
		const regexpEmail = /[a-zA-Z0-9._-]+@[a-zA\-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
		const regexpPhone = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
		const errors: typeof this.formValidationErrors = {};

		if (!regexpEmail.test(this.email)) {
			errors.email = 'Необходимо указать email';
		}
		if (!regexpPhone.test(this.phone)) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formValidationErrors = errors;
		this.events.emit('formErrors:change', this.formValidationErrors);
		return Object.keys(errors).length === 0;
	}

	getOrderDetails(): IOrder {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items,
		};
	}
}
