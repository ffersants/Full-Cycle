import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto } from "./add-client.usecase.dto";

export default class AddClientUsecase implements UseCaseInterface {
	constructor(private _repo: ClientGateway) {}

	async execute(input: AddClientInputDto): Promise<void> {
		return await this._repo.add(new Client({
            address: input.address,
            email: input.email,
            name: input.name,
        }));
	}
}
