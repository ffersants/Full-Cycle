import InvoiceFacade from "../facade/invoice.facade"
import InvoiceRepository from "../repository/invoice.repository"
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase"
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase"

export default class InvoiceFacadeFactory{
    static create(){
        const repo = new InvoiceRepository()
       
        const generateUsecase = new GenerateInvoiceUsecase(repo)
        const findUsecase = new FindInvoiceUsecase(repo)
        
        const facade = new InvoiceFacade({
            generateInvoiceUsecase: generateUsecase,
            findInvoiceUsecase: findUsecase
        })

        return facade
    }
}