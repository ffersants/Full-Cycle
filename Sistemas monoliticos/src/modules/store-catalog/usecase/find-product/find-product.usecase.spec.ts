import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../repository/product.model";
import ProductRepository from "../../repository/product.repository";

describe("FindProduct test", () => {
	let sequelize: Sequelize;
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});
	it("should find one product", async () => {
		await ProductModel.create({
			id: "1",
			name: "product 1",
			description: "dsc 1",
			salesPrice: 500,
		});
		await ProductModel.create({
			id: "2",
			name: "product 2",
			description: "dsc 2",
			salesPrice: 500,
		});

		const productRepo = new ProductRepository();
		const result = await productRepo.find("2");

		expect(result.id.id).toBe("2");
	});
});
