import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import { Table } from 'sequelize-typescript';
import FindClientUsecase from "./find-client.usecase";

const mockResult = new Client({
	id: new Id("1"),
	name: "Fulano",
	address: "qwio",
	email: "test@ok.com",
});

const MockRepository = () => {
	return {
		add: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(mockResult)),
	};
};

describe("FindClientUsecase test", () => {
	it("should find a client", async () => {
		const repo = MockRepository();
		const usecase = new FindClientUsecase(repo);

		const input = {
			id: "1",
		};

		const result = await usecase.execute(input);
		expect(repo.find).toHaveBeenCalled();
		expect(result.id).toBe(input.id)
	});
});
