import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);

describe("PlaceOrderUsecase test", () => {
	describe("should add an order", () => {
		beforeAll(() => {
			jest.useFakeTimers("modern");
			jest.setSystemTime(mockDate);
		});

		afterAll(() => {
			jest.useRealTimers();
		});

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

		describe("place an order", () => {
			const clientProps = {
				id: "1",
				name: "green ball",
				document: "2323",
				email: "ok@tudobem.com",
				street: "qr",
				number: "1",
				complement: "qr",
				city: "ceilandia",
				state: "DF",
				zipCode: "000000",
			};

			const mockClientFacade = {
				find: jest.fn().mockResolvedValue(clientProps),
				add: jest.fn()
			};

			const mockPaymentFacade = {
				process: jest.fn(),
			};

			const mockCheckoutRepo = {
				addOrder: jest.fn(),
				findOrder: jest.fn(),
			};

			const mockInvoiceFacade = {
				generate: jest.fn().mockResolvedValue({ id: "1i" }),
				find: jest.fn()
			};

			const placeOrderUsecase = new PlaceOrderUsecase(
				mockClientFacade,
				null,
				null,
				mockCheckoutRepo,
				mockInvoiceFacade,
				mockPaymentFacade
			);

			const products = {
				"1": new Product({
					id: new Id("1"),
					name: "Nameee",
					description: "descriptionion",
					salesPrice: 50,
				}),
				"2": new Product({
					id: new Id("2"),
					name: "Nameee",
					description: "descriptionion",
					salesPrice: 50,
				}),
			};

			const mockValidateProducts = jest
				//@ts-expect-error - spy on private method
				.spyOn(placeOrderUsecase, "validateProducts")
				//@ts-expect-error - spy on private method
				.mockResolvedValue(null);

			const mockGetProduct = jest
				//@ts-expect-error - spy on private method
				.spyOn(placeOrderUsecase, "getProducts")
				//@ts-expect-error - spy on private method
				.mockImplementation((productId: keyof typeof products) => {
					return products[productId];
				});

			it("should not be approved", async () => {
				mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
					transactionId: "1t",
					orderId: "1o",
					amount: 100,
					status: "error",
					createdAt: new Date(),
					updatedAt: new Date(),
				});

				const input: PlaceOrderInputDto = {
					clientId: "1c",
					products: [{ productId: "1" }, { productId: "2" }],
				};

				let output = await placeOrderUsecase.execute(input)
				expect(output.invoiceId).toBe(null)
				expect(output.total).toBe(100)
				expect(output.products).toStrictEqual([{ productId: "1" }, { productId: "2" }])
				expect(mockClientFacade.find).toHaveBeenCalled()
				expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"})
				expect(mockValidateProducts).toHaveBeenCalledTimes(1)
				expect(mockValidateProducts).toHaveBeenCalledWith(input)
				expect(mockGetProduct).toHaveBeenCalledTimes(2)
				expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
				expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
				expect(mockPaymentFacade.process).toHaveBeenCalledWith({orderId: output.id, amount: output.total})
				expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0)
			});

			it("should be approved", async () => {
				mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
					transactionId: "1t",
					orderId: "1o",
					amount: 100,
					status: "approved",
					createdAt: new Date(),
					updatedAt: new Date(),
				});

				const input: PlaceOrderInputDto = {
					clientId: "1c",
					products: [{ productId: "1" }, { productId: "2" }],
				};

				let output = await placeOrderUsecase.execute(input)

				expect(output.invoiceId).toBe("1i")
				expect(output.total).toBe(100)
				expect(output.products).toStrictEqual([{ productId: "1" }, { productId: "2" }])
				expect(mockClientFacade.find).toHaveBeenCalled()
				expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"})
				expect(mockValidateProducts).toHaveBeenCalledTimes(2)
				expect(mockGetProduct).toHaveBeenCalledTimes(4)
				expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(2)
				expect(mockPaymentFacade.process).toHaveBeenCalledTimes(2)
				expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1)
			});
		});
	});

	describe("getProducts method", () => {
		beforeAll(() => {
			jest.useFakeTimers("modern");
			jest.setSystemTime(mockDate);
		});

		afterAll(() => {
			jest.useRealTimers();
		});
		//@ts-expect-error - no params in constructor
		const placeOrderUsecase = new PlaceOrderUsecase();

		it("should throw an exception when product is not found", async () => {
			const mockCatalogFacade = {
				find: jest.fn().mockResolvedValue(null),
			};

			//@ts-expect-error - force set catalogFacade
			placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

			await expect(placeOrderUsecase["getProducts"]("0")).rejects.toThrow(
				new Error("Product not found")
			);
		});

		it("should return a product", async () => {
			const productToBeFound = new Product({
				description: "test",
				name: "naemee",
				salesPrice: 10,
				id: new Id("1"),
			});
			const mockCatalogFacade = {
				find: jest.fn().mockResolvedValue(productToBeFound),
			};

			//@ts-expect-error - force set catalogFacade
			placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

			const result = await placeOrderUsecase["getProducts"]("1");

			expect(result).toBeDefined();
			expect(result.name).toBe(productToBeFound.name);
			expect(result.description).toBe(productToBeFound.description);
			expect(result.salesPrice).toBe(productToBeFound.salesPrice);
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
