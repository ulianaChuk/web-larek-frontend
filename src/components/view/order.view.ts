export interface IOrderView {
    renderOrder(): void;
    openOrder(): void;
}
export class OrderView  {
renderOrder=()=>{
    const template = document.getElementById('order')as HTMLTemplateElement;
    if (!template) {
        console.error('Шаблон order не найден');
        return '';
    }
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const modalContent = document.querySelector('.modal__content');
    modalContent.innerHTML = '';
    modalContent.appendChild(fragment);

}
openOrder = (): void => {
    const modalElement = document.getElementById('modal-container');
    if (modalElement) {
       this.renderOrder
        modalElement.classList.add('modal_active');
        // Привязываем событие для закрытия модального окна

        modalElement
            .querySelector('.modal__close')
            .addEventListener('click', () => {
                modalElement.classList.remove('modal_active'); // Деактивируем модальное окно
            });
    }
}

}