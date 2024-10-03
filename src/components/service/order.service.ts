import { IOrder, IProduct } from "../../types";
import { EventEmitter } from "../base/events";
import { Order } from "../model/order.model";

 export class OrderService {
    private orderData: IOrder;  

    constructor( private events: EventEmitter) { 
        this.events.on('showOrder', this.setDataFromBusket);
    }
   
private setDataFromBusket = ({items, totalPrice }: { items: IProduct[], totalPrice: number }) => {
        
		const itemsId = items.map((item) => item.id);
        this.orderData = Order.fromBasket({items:itemsId,total:totalPrice,payment:'',address:'',email:'',phone:''});
console.log(this.orderData);
	   }
       

 }