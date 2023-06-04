import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.value-object";
import Product from "../domain/product.entity";
import Invoice from './../domain/invoice.entity';
import { InvoiceProductModel } from "./invoice-products.model";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";

describe("ClientRepository test", () => {
	let sequelize: Sequelize;
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([InvoiceProductModel, InvoiceModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});
	
    it("should create an invoice", async() => {
        const repo = new InvoiceRepository()
       
        const input = new Invoice({
            id: new Id("1"),
            address: new Address({
                city: "ceilandia",
                complement: "qr",
                street: "qr",
                number:"1",
                state: "DF",
                zipCode: "000000",
            }),
            document: "2323",
            name: "green ball",
            items: [
                new Product({
                    id: new Id("123"),
                    name: "ball",
                    price: 10
                })
            ],
        })

        const invoice = await repo.generate(input)

        const products = await InvoiceProductModel.findAll({where: {invoiceId:  invoice.id.id}})
        expect(products).toHaveLength(1)
        expect(products[0].productId).toBe("123")
        expect(products[0].name).toBe("ball")
        expect(products[0].price).toBe(10)
   })

   it("should get an invoice with its products", async() => {   
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
    
    const repo = new InvoiceRepository()
    const invoice = await repo.find("1")

    expect(invoice).toBeDefined()
    expect(invoice.items).toHaveLength(2)
})
});
