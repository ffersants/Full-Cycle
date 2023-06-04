import { Sequelize } from "sequelize-typescript";
import { InvoiceProductModel } from "../repository/invoice-products.model";
import { InvoiceModel } from "../repository/invoice.model";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto } from "../usecase/generate-invoice/generate-invoice.dto";
import InvoiceFacade from "./invoice.facade";
import { GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([InvoiceModel, InvoiceProductModel]);
		await sequelize.sync();
	});
	afterEach(async () => {
		await sequelize.close();
	});

    it("should generate an invoice", async() => {
        const facade = InvoiceFacadeFactory.create()


        const input: GenerateInvoiceFacadeInputDto = {
            city: "ceilandia",
            complement: "qr",
            document: "2323",
            items: [
                {
                    id: "1",
                    name: "ball",
                    price: 10
                }
            ],
            name: "green ball",
            number:"1",
            state: "DF",
            street: "qr",
            zipCode: "000000"
        }

        const result = await facade.generate(input)

        const productsPersisted = await InvoiceProductModel.findOne({where: {id: "1"}})

        expect(productsPersisted).toBeDefined()
        expect(productsPersisted.name).toBe("ball")
        expect(result.id).toBeDefined()
        expect(result).toBeDefined()
    })

    it("should find an invoice", async() => {
        const facade = InvoiceFacadeFactory.create()
        await InvoiceModel.create({
            id: "1",
            name:  "green ball",
            document: "2323",
            street: "qr",
            number:"1",
            complement: "qr",
            city: "ceilandia",
            state: "DF",
            zipCode: "000000",
            createdAt: new Date(),
            updatedAt: new Date()
        })
    
        await InvoiceProductModel.create({
            productId: "123",
            invoiceId: "1",
            name: "ball",
            price: 10
        })
        await InvoiceProductModel.create({
            productId: "456",
            invoiceId: "1",
            name: "ball",
            price: 10
        })
        const result = await facade.find({id: "1"})

        expect(result).toBeDefined()
        expect(result.items).toHaveLength(2)
    })
})