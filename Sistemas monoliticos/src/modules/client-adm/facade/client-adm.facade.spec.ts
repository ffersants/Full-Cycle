import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../use-case/add-client/add-client.usecase";
import FindClientUsecase from "../use-case/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe.only("ClientRepository test", () => {
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

	it("should create a client", async () => {
		const repo = new ClientRepository();
		const addClientUsecase = new AddClientUsecase(repo);
		const findClientUsecase = new FindClientUsecase(repo);

		const facade = new ClientAdmFacade(addClientUsecase, findClientUsecase);

		const input = {
			id: "1",
			name: "Fulano",
			address: "qwio",
			email: "test@ok.com",
		};

		await facade.add(input);
        const result = await ClientModel.findOne({where: {id: input.id}})
        
        expect(result.id).toBe(input.id)
    });
});
