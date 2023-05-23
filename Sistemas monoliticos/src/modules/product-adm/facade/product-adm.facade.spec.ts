import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../@shared/repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductadmFacade test", () => {
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

    it("should create a product", async() => {
        const productFacade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "product 1",
            purchasePrice: 10,
            stock: 10,
            description: "descccc"
        }

        await productFacade.addProduct(input)
        
        const product = await ProductModel.findOne({where: {id: input.id}})
        expect(product.id).toBe(input.id)        
    })
});
