import { IEvents } from '../base/events';

export class ModalView {
	protected modalContainer: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected content: HTMLElement;
	protected pageWrapper: HTMLElement;

	constructor(modalContainer: HTMLElement, protected events: IEvents) {
		this.modalContainer = modalContainer;
		this.closeButton = modalContainer.querySelector('.modal__close');
		this.content = modalContainer.querySelector('.modal__content');
		this.pageWrapper = document.querySelector('.page__wrapper');

		this.closeButton.addEventListener('click', this.close);
		this.modalContainer.addEventListener('click', this.close);
		this.modalContainer.addEventListener('click', (event) => {
			const modalContent = this.modalContainer.querySelector('.modal__container');
			if (!modalContent.contains(event.target as Node)) {
				this.close();
			}
		});	}

	setContent=(value: HTMLElement) =>{
		this.content.replaceChildren(value);
	}

	open=()=>{
		this.modalContainer.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close=()=> {
		this.modalContainer.classList.remove('modal_active');
		this.content.innerHTML = '';
		this.events.emit('modal:close');
	}

	setLocked=(value: boolean)=> {
		if (value) {
			this.pageWrapper.classList.add('page__wrapper_locked');
		} else {
			this.pageWrapper.classList.remove('page__wrapper_locked');
		}
	}

	render=(): HTMLElement =>{
		this.open();
		return this.modalContainer;
	}
}
