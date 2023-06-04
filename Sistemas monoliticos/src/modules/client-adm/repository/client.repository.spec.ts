import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.repository";
import ProductModel from "../../product-adm/repository/product.model";

describe("ClientRepository test", () => {
	let sequelize: Sequelize;
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([ClientModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should add a new client", async () => {
		const repo = new ClientRepository();
		const client = new Client({
			name: "Fulano",
			address: "qe",
			email: "ok@tabom.com",
			id: new Id("1"),
		});

		await repo.add(client);
		//importante utilizar diretamente o model para a operação abaixo, sem utilizar o método
		//get implementado no repository, para evitar que um teste dependa de outro, pois
		//neste teste o que está sendo verificado é apenas o metodo add
		const result = await ClientModel.findOne({ where: { id: "1" } });

		expect(result.id).toBe("1");
	});

	it("should get a client recently added", async () => {
		const client = new Client({
			name: "Fulano",
			address: "qe",
			email: "ok@tabom.com",
			id: new Id("1"),
		});

		await ClientModel.create({
			id: client.id.id,
			name: client.name,
			email: client.email,
			address: client.address,
			createdAt: client.createdAt,
			updatedAt: client.updatedAt,
		});

		const repo = new ClientRepository()
		const result = await repo.find(client.id.id)

		expect(result.id.id).toBe(client.id.id)
		expect(result.name).toBe(client.name)
	});
});
