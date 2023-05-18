import Product from "../../../product-adm/domain/product.entity";
import Id from "../../domain/value-object/id.value-object";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUsecase {
	private _productRepository: ProductGateway;

	constructor(repo: ProductGateway) {
		this._productRepository = repo;
	}

	//o use case/método do domínio recebe sim um DTO por parametro
	//e monta internamente a entidade de domínio de acordo com as
	//informações contidas no DTO
	async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
		const product = new Product({
			id: new Id(input.id).id,
			description: input.description,
			name: input.name,
			purchasePrice: input.purchasePrice,
			stock: input.stock,
		});

		this._productRepository.add(product);

		return {
			id: product.id.id,
			name: product.name,
			description: product.description,
			purchasePrice: product.purchasePrice,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
			stock: product.stock,
		};
	}
}
