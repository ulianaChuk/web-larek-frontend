import { IEvents } from '../base/events';

export class ModalView {
	protected container: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected content: HTMLElement;
	protected wrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container;
		this.closeButton = container.querySelector('.modal__close');
		this.content = container.querySelector('.modal__content');
		this.wrapper = document.querySelector('.page__wrapper');

		this.container.addEventListener('click', this.handleClose);
	}

	handleClose = (event: MouseEvent) => {
		event.stopPropagation();
		if (
			this.closeButton.contains(event.target as HTMLElement) ||
			event.target === this.container
		) {
			this.close();
		}
	};

	open = (content: HTMLElement) => {
		this.content.replaceChildren(content);
		this.container.classList.add('modal_active');
		this.wrapper.classList.add('page__wrapper_locked');
		this.events.emit('modal:open');
	};

	close = () => {
		this.container.classList.remove('modal_active');
		this.wrapper.classList.remove('page__wrapper_locked');
		this.content.innerHTML = '';
		this.events.emit('modal:close');
	};

	renderModal = (content: HTMLElement): HTMLElement => {
		this.content;
		this.open(content);
		return this.container;
	};
}
