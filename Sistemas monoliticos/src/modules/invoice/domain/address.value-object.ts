type props = {
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;
}

export default class Address {
	street: string;
	number: string;
	complement: string;
	city: string;
	state: string;
	zipCode: string;

	constructor(props: props){
		this.street = props.street
		this.number = props.number
		this.complement = props.complement
		this.city = props.city
		this.state = props.state
		this.zipCode = props.zipCode
	}
}
