import Invoice from "../domain/invoice.entity";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "../usecase/find-invoice/find-invoice.dto";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.dto";

export default interface InvoiceGateway {
    find(input: string): Promise<Invoice>
    generate(input: Invoice): Promise<Invoice>
}