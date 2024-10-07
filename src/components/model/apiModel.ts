import { ApiListResponse, Api } from '../base/api';
import { IOrder, IOrderResult, IProduct } from '../../types';

export class ApiModel extends Api {
	cdn: string;
	items: IProduct[];

	constructor(cdn: string, baseUrl: string) {
		super(baseUrl);
		this.cdn = cdn;
	}

	getListProductCard(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	postOrderLot(order: IOrder): Promise<IOrderResult> {
		return this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}
