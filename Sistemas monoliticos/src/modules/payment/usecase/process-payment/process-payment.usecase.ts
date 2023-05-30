import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import {
	ProcessPaymentInputDto,
	ProcessPaymentOutputDto,
} from "./process-payment.dto";

export default class ProcessPaymentUsecase implements UseCaseInterface {
	private _repo: PaymentGateway;

	constructor(repo: PaymentGateway) {
		this._repo = repo;
	}

	async execute(
		input: ProcessPaymentInputDto
	): Promise<ProcessPaymentOutputDto> {
		const transaction = new Transaction({
			amount: input.amount,
			orderId: input.orderId,
		});
        
		transaction.process();

		const persistTransaction = await this._repo.save(transaction);

		return {
			transactionId: transaction.id.id,
			amount: transaction.amount,
			createdAt: transaction.createdAt,
			orderId: transaction.orderId,
			updatedAt: transaction.updatedAt,
			status: transaction.status,
		};
	}
}
