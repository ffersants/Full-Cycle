import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("StoreCatalogFacade test", () => {
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

    it("should return all product", async() => {
        const repo = new ProductRepository()
        const usecase = new FindAllProductsUsecase(repo)

        const facade = StoreCatalogFacadeFactory.create()

        await ProductModel.create({
            id: "1",
            name: "product 1",
            salesPrice: 10,
            stock: 10,
            description: "descccc"
        })
        await ProductModel.create({
            id: "2",
            name: "product 2",
            salesPrice: 10,
            stock: 10,
            description: "descccc 2"
        })
        const result = await facade.findAll()
        expect(result).toHaveLength(2)
    })

    
})