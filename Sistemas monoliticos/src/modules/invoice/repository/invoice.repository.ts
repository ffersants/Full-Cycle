import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "../usecase/find-invoice/find-invoice.dto";
import { InvoiceProductModel } from "./invoice-products.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway{
    async find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await InvoiceModel.findOne({where: {id: input.id}})
        if(invoice === null) throw new Error("Invoice doesn't exist")

        const itemsOnInvoice = await InvoiceProductModel.findAll({where: {invoiceId: input.id}})

        return {
            address: {
                city: invoice.city,
                complement: invoice.complement,
                number: invoice.number,
                state: invoice.state,
                street: invoice.street,
                zipCode: invoice.zipCode
            },
            createdAt: invoice.createdAt,
            document: invoice.document,
            id: invoice.id,
            name: invoice.name,
            total: itemsOnInvoice.reduce((amount, item) => amount + item.price, 0),
            items: itemsOnInvoice.map(i => ({id: i.id, name: i.name, price: i.price}))

        }
    }
    async generate(input: Invoice): Promise<Invoice> {
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        })

        for(const item of input.items){
            InvoiceProductModel.create({
                invoiceId: input.id.id,
                productId: item.id.id,
                name: item.name,
                price: item.price
            })
        }

      return input
    }
}