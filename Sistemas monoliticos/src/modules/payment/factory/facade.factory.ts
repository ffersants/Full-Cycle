import PaymentFacade from "../facade/payment.facade"
import TransactionRepository from "../repository/transaction.repository"
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase"

export default class PaymentFacadeFactory{
    static create() {
        const repo = new TransactionRepository()
        const usecase = new ProcessPaymentUsecase(repo)
        const facade = new PaymentFacade(usecase)
        
        return facade
    }
}