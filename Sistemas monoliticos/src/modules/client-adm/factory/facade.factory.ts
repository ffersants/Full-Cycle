import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../use-case/add-client/add-client.usecase";
import FindClientUsecase from "../use-case/find-client/find-client.usecase";

export default class ClientFacadeFactory {
	static create() {
		const repo = new ClientRepository();
		const addClientUsecase = new AddClientUsecase(repo);
		const findClientUsecase = new FindClientUsecase(repo);

		const facade = new ClientAdmFacade(addClientUsecase, findClientUsecase);
		return facade;
	}
}
