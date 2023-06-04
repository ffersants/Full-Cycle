import UseCaseInterface from "../../@shared/usecase/add-product/use-case.interface";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

type props = {
    findInvoiceUsecase: UseCaseInterface, 
    generateInvoiceUsecase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _findInvoiceUsecase: UseCaseInterface
    private _generateInvoiceUsecase: UseCaseInterface

    constructor(props: props){
        this._findInvoiceUsecase = props.findInvoiceUsecase
        this._generateInvoiceUsecase = props.generateInvoiceUsecase
    }
    
    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateInvoiceUsecase.execute(input)
    }
    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findInvoiceUsecase.execute(input)
    }

}