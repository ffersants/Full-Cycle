import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductGateway from "../gateway/product.gateway";
import Product from "../../product-adm/domain/product.entity";
import Id from "../domain/value-object/id.value-object";
import ProductRepositry from "./product.repository";

describe("ProductRepository test", () => {
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

	it("should find a product recently added", async () => {
		const productRepo = new ProductRepositry();

		const productAdded = new Product({
			description: "test",
			name: "nameee",
			purchasePrice: 19,
			stock: 5,
			id: new Id("15"),
		});

		await productRepo.add(productAdded);

		const product = await productRepo.find("15");
		expect(productAdded.description).toBe(product.description);
		expect(productAdded.name).toBe(product.name);
		expect(productAdded.purchasePrice).toBe(product.purchasePrice);
		expect(productAdded.stock).toBe(product.stock);
		expect(productAdded.id.id).toBe(product.id.id);
	});
});
