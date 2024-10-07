import { IEvents } from '../base/events';

export class OrderView {
	formOrder: HTMLElement;
	paymentButtons: HTMLButtonElement[];
	formError: HTMLElement;
	submitButton: HTMLButtonElement;
	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.formOrder = template.content
			.querySelector('.form')
			.cloneNode(true) as HTMLFormElement;
		this.paymentButtons = Array.from(
			this.formOrder.querySelectorAll('.button_alt')
		);
		this.submitButton = this.formOrder.querySelector('.order__button');
		this.formError = this.formOrder.querySelector('.form__errors');

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.handlePayment = button.name;
				events.emit('order:handlePayment', button);
			});
		});

		this.formOrder.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`order:changeAddress`, { field, value });
		});

		this.formOrder.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.events.emit('contacts:open');
		});
	}

	set handlePayment(paymentMethod: string) {
		this.paymentButtons.forEach((button) => {
			button.classList.toggle(
				'button_alt-active',
				button.name === paymentMethod
			);
		});
	}

	set valid(value: boolean) {
		this.submitButton.disabled = !value;
	}
	render = () => {
		return this.formOrder;
	};
}
