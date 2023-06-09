import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

describe("PlaceOrderUsecase test", () => {
	describe("should add an order", () => {
		it("should throw an erro when client's not found", async () => {
			const mockClientFacade = {
				find: jest.fn().mockReturnValue(Promise.resolve(null)),
			};

			//@ts-expect-error - no params in constructor
			const placeOrderUsecase = new PlaceOrderUsecase();
			//@ts-expect-error - force set clientFacade
			placeOrderUsecase["_clientFacade"] = mockClientFacade;

			const input: PlaceOrderInputDto = {
				clientId: "0",
				products: [],
			};

			await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
				new Error("Client not found")
			);
		});

		it("should throw an erro when product's are not valid", async () => {
			const mockClientFacade = {
				find: jest.fn().mockReturnValue(Promise.resolve(true)),
			};
			//@ts-expect-error - no params in constructor
			const placeOrderUsecase = new PlaceOrderUsecase();
			//@ts-expect-error - force set clientFacade
			placeOrderUsecase["_clientFacade"] = mockClientFacade;

			const mockValidateProducts = jest
				//@ts-expect-error - spy on private method
				.spyOn(placeOrderUsecase, "validateProducts")
				//@ts-expect-error - not return never
				.mockRejectedValue(new Error("No products selected"));

			const input: PlaceOrderInputDto = {
				clientId: "1",
				products: [],
			};

			await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
				new Error("No products selected")
			);
			expect(mockValidateProducts).toHaveBeenCalled();
		});
	});

	describe("ValidateProducts method", () => {
		it("should throw error if no products are selected", async () => {
			const mockClientFacade = {
				find: jest.fn().mockReturnValue(Promise.resolve(true)),
			};
			
			//@ts-expect-error - no params in constructor
			const placeOrderUsecase = new PlaceOrderUsecase();
			
			//@ts-expect-error - force set clientFacade
			placeOrderUsecase["_clientFacade"] = mockClientFacade;

			const input: PlaceOrderInputDto = {
				clientId: "0",
				products: [],
			};

			await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
				new Error("No products selected")
			);
		});

		it("should throw an error when product is out of sock", async () => {
			//@ts-expect-error - no params in constructor
			const placeOrderUsecase = new PlaceOrderUsecase();
			const mockProductFacade = {
				checkStock: jest.fn(({ productId }: { productId: string }) =>
					Promise.resolve({
						productId,
						stock: productId === "1" ? 0 : 1,
					})
				),
			};

			//@ts-expect-error - force set productFacade
			placeOrderUsecase["_productFacade"] = mockProductFacade;

			let input: PlaceOrderInputDto = {
				clientId: "0",
				products: [{ productId: "1" }],
			};

			await expect(
				placeOrderUsecase["validateProducts"](input)
			).rejects.toThrow(new Error("Product 1 is out of stock"));

			input = {
				clientId: "0",
				products: [{ productId: "0" }, { productId: "1" }],
			};

			await expect(
				placeOrderUsecase["validateProducts"](input)
			).rejects.toThrow(new Error("Product 1 is out of stock"));

			expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

			input = {
				clientId: "0",
				products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
			};

			expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
		});
	});
});
