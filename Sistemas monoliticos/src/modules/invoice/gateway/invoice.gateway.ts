import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO, GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.dto";

export default interface InvoiceGateway {
    find(input: FindInvoiceUseCaseInputDTO): FindInvoiceUseCaseOutputDTO
    generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>
}