import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";
import ProcessPaymentUsecase from './../usecase/process-payment/process-payment.usecase';

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private processPaymentUsecase: ProcessPaymentUsecase){
        
    }
   
    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return await this.processPaymentUsecase.execute(input)
    }

}