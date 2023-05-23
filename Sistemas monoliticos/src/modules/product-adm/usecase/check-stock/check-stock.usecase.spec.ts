import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUsecase from "./check-stock.usecase";

const product = new Product({
	id: new Id("13"),
	name: "test get",
	description: "GET",
	purchasePrice: 10,
	stock: 15,
});

const MockRepository = {
		add: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(product))
	}

describe("GetProduct test", () => {
	it("should get a product", async () => {
		const productRepo = MockRepository
		const usecase = new CheckStockUsecase(productRepo)
	
		const result = await usecase.execute("13")

		expect(productRepo.find).toHaveBeenCalled()
		expect(result).toBe(product.stock)
	});
});
