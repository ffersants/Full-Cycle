import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
    constructor(private repo: InvoiceGateway){}
    
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            id: new Id("1"),
            address: {
                street: input.street,
                city: input.city,
                complement: input.complement,
                number: input.number,
                state: input.state,
                zipCode: input.zipCode
            },
            document: input.document,
            items: input.items.map(i => (new Product({name: i.name, price: i.price}))),
            name: input.name
        })
        
        const result = await this.repo.generate(invoice);

        return {
            city: invoice.address.city,
            complement: invoice.address.complement,
            document: invoice.document,
            id: invoice.id.id,
            items: invoice.items.map(i => ({id: i.id.id, name: i.name, price: i.price})),
            name: invoice.name,
            number: invoice.address.number,
            state: invoice.address.state,
            street: invoice.address.street,
            total: invoice.items.map(i => i.price).reduce((a, b) => a + b, 0),
            zipCode: invoice.address.zipCode
        }
    }

}