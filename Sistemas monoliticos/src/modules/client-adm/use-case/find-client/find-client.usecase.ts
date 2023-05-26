import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import {
	FindClientInputDto,
	FindClientOutputDto,
} from "./find-client.usecase.dto";

export default class FindClientUsecase {
	constructor(private _repo: ClientGateway) {}

	async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
		const result = await this._repo.find(input.id);

		return {
			address: result.address,
			email: result.email,
			name: result.name,
			id: result.id.id,
            createdAd: result.createdAt,
            updatedAt: result.updatedAt
		}
	}
}
