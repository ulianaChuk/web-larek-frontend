import { IEvents } from "../base/events";

export class SuccessModalView{
    success: HTMLElement;
    text: HTMLElement;
    orderButton: HTMLButtonElement;
  
    constructor(template: HTMLTemplateElement, protected events: IEvents) {
      this.success = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
      this.text = this.success.querySelector('.order-success__description');
      this.orderButton = this.success.querySelector('.order-success__close');
      this.handleCkickClose();
    }
  
    handleCkickClose = () => {
      this.orderButton.addEventListener('click', () => { 
        console.log('close')
        this.events.emit('successModal:close') })
    }
    render=(totalPrice: number)=> {
      this.text.textContent = String(`Списано ${totalPrice} синапсов`);
      return this.success
    }
  }
