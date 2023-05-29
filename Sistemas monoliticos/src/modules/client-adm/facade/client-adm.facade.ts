import ClientAdmFacadeInterface, {
	AddClientFacadeInputDto,
	FindClientFacadeInputDto,
	FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";
import AddClientUsecase from "./../use-case/add-client/add-client.usecase";
import UseCaseInterface from "./../../@shared/usecase/add-product/use-case.interface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
	private _addClientUsecase: UseCaseInterface;
	private _findClientUsecase: UseCaseInterface;

	constructor(
		addClientUsecase: UseCaseInterface,
		findClientUsecase: UseCaseInterface
	) {
		this._addClientUsecase = addClientUsecase;
		this._findClientUsecase = findClientUsecase;
	}

	async add(input: AddClientFacadeInputDto): Promise<void> {
		await this._addClientUsecase.execute(input)
	}
	async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
		return await this._findClientUsecase.execute(input)
	}
}
