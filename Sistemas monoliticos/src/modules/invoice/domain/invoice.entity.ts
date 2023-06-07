import BaseEntity from "../../@shared/domain/entity/base.entity";
import ValueObject from "../../@shared/domain/value-object/value-object.interface";
import Address from "./address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

type InvoiceProps = {
	id?: Id
	name: string;
	document: string;
	address: Address; // value object
	items: Product[]; // Product entity
	createdAt?: Date
	updatedAt?: Date
};

export default class Invoice extends BaseEntity implements ValueObject {
	private _name: string;
	private _document: string;
	private _address: Address;
	private _items: Product[];

    public get name(): string
 {
        return this._name;
    }

    public get document(): string
 {
        return this._document;
    }


    public get address(): Address
 {
        return this._address;
    }



    public get items(): Product[] {
        return this._items;
    }

	constructor(props: InvoiceProps) {
		super(props.id, props.createdAt, props.updatedAt);
		this._name = props.name;
		this._document = props.document;
		this._address = props.address;
		this._items = props.items;
	}
}
