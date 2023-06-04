import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
	FindInvoiceUseCaseInputDTO,
	FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
	constructor(private repo: InvoiceGateway) {}

	async execute(
		input: FindInvoiceUseCaseInputDTO
	): Promise<FindInvoiceUseCaseOutputDTO> {
		var invoice = await this.repo.find(input.id);
		return {
			id: invoice.id.id,
			address: invoice.address,
			createdAt: invoice.createdAt,
			document: invoice.document,
			items: invoice.items.map(i => ({id: i.id.id, name: i.name, price: i.price})),
			name: invoice.name,
			total: invoice.items.reduce((amount, item) => amount + item.price, 0),
		};
	}
}
