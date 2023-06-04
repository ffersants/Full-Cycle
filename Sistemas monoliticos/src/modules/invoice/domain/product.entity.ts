import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id
	name: string;
	price: number;
};

export default class Product {
	private _id: Id;
	private _name: string;
	private _price: number;

    public get id(): Id {
        return this._id;
    }

  
    public get name(): string {
        return this._name;
    }

    public get price(): number {
        return this._price;
    }

	constructor(props: ProductProps) {
        this._id = props.id ?? new Id()
		this._name = props.name;
		this._price = props.price;
	}
}
