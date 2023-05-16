import BaseEntity from "../../@shared/domain/entity/base.entity";
import ValueObject from "../../@shared/domain/value-object/value-object.interface";

type ProductProps = {
	id?: string;
	name: string;
	description: string;
	purchasePrice: number;
	stock: number;
};

export default class Product extends BaseEntity implements ValueObject {
	private _name: string;
	private _description: string;
	private _purchasePrice: number;
	private _stock: number;

	constructor(props: ProductProps) {
		super(props.id);
		this._name = props.name;
		this._description = props.description;
		this._purchasePrice = props.purchasePrice;
		this._stock = props.stock;
	}

    get description(){
        return this._description
    }
    get name(){
        return this._name
    }
    get purchasePrice(){
        return this._purchasePrice
    }
    get stock(){
        return this._stock
    }
}
