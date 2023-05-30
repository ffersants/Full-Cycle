import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";

const transaction = new Transaction({
	id: new Id("1"),
	amount: 100,
	orderId: "1",
});

const MockRepo = () => {
	return {
		save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
	};
};

describe("ProcessPaymentUsecase test", () => {
	it("should approve a transaction", async () => {
		const repo = MockRepo();
		const usecase = new ProcessPaymentUsecase(repo);
		const input = {
			orderId: "1",
			amount: 100,
		};

		const result = await usecase.execute(input);

        expect(repo.save).toHaveBeenCalled()
        expect(result.status).toBe("approved")
	});

    it("should decline a transaction", async () => {
		const repo = MockRepo();
		const usecase = new ProcessPaymentUsecase(repo);
		const input = {
			orderId: "1",
			amount: 50,
		};

		const result = await usecase.execute(input);

        expect(repo.save).toHaveBeenCalled()
        expect(result.status).toBe("declined")
	});
});
