import { EventEmitter } from "../base/events";

export interface IOrderView {
    renderOrder(): void;
    openOrder(): void;
}
export class OrderView  {
    private modalElement: HTMLElement | null;
  
    paymentMethodButton: HTMLButtonElement[];

    constructor(private events: EventEmitter) {
        
        this.modalElement = document.getElementById('modal-container')
        this.paymentMethodButton = Array.from(this.modalElement.querySelectorAll('.button_alt')) as HTMLButtonElement[];
        this.events.on('showOrder', this.openOrderModal);
    }

    renderOrderForm = (): void => {
        const template = document.getElementById('order') as HTMLTemplateElement;
        if (!template) {
            console.error('Шаблон order не найден');
            return;
        }
        const fragment = template.content.cloneNode(true) as DocumentFragment;
        const modalContent = this.modalElement?.querySelector('.modal__content');
        if (modalContent) {
            modalContent.innerHTML = '';
            modalContent.appendChild(fragment);
        }
        this.paymentMethodButton.forEach((button) => {
            button.addEventListener('click', this.selectPaymentMethod);
        })

    }; 
    openOrderModal = (): void => {
        if (this.modalElement) {
            this.renderOrderForm();
            this.modalElement.classList.add('modal_active');
            this.bindOrderFormEvents();
        }
    };

    closeOrderModal = (): void => {
        if (this.modalElement) {
            this.modalElement.classList.remove('modal_active');
        }
    };

    selectPaymentMethod=()=>{
        // this.paymentMethodButton.forEach
    }
    // renderContactForm = (): void => {
    //     const template = document.getElementById('contacts') as HTMLTemplateElement;
    //     if (!template) {
    //         console.error('Шаблон contacts не найден');
    //         return;
    //     }
    //     const fragment = template.content.cloneNode(true) as DocumentFragment;
    //     const modalContent = this.modalElement?.querySelector('.modal__content');
    //     if (modalContent) {
    //         modalContent.innerHTML = '';
    //         modalContent.appendChild(fragment);
    //     }
    // };

    

    bindOrderFormEvents = (): void => {
        // const orderForm = this.modalElement?.querySelector('form[name="order"]');
        // if (orderForm) {
        //     orderForm.addEventListener('submit', (event) => {
        //         event.preventDefault();
        //         const addressInput = orderForm.querySelector('input[name="address"]') as HTMLInputElement;
        //         if (!addressInput.value) {
        //             this.showError('Введите адрес доставки');
        //         } else {
        //             this.currentStep = 2;
        //             this.renderContactForm();
        //             this.bindContactFormEvents();
        //         }
        //     });
        }
    };

    // bindContactFormEvents = (): void => {
    //     const contactForm = this.modalElement?.querySelector('form[name="contacts"]');
    //     if (contactForm) {
    //         contactForm.addEventListener('submit', (event) => {
    //             event.preventDefault();
    //             const emailInput = contactForm.querySelector('input[name="email"]') as HTMLInputElement;
    //             const phoneInput = contactForm.querySelector('input[name="phone"]') as HTMLInputElement;
    //             if (!emailInput.value || !phoneInput.value) {
    //                 this.showError('Заполните все поля');
    //             } else {
    //                 this.showSuccess('Оплата прошла успешно');
    //                 this.closeOrderModal();
    //                 // Удаляем товары из корзины
    //                 this.clearBasket();
    //             }
    //         });
    //     }
    // };

    // showError = (message: string): void => {
    //     const errorElement = this.modalElement?.querySelector('.form__errors');
    //     if (errorElement) {
    //         errorElement.textContent = message;
    //     }
    // };

    // showSuccess = (message: string): void => {
    //     alert(message);
    // };

    // clearBasket = (): void => {
    //     // Здесь вызываем метод для очистки корзины
    //     // basketController.clearBasket();
    // };


