import ProductGateway from "../../../@shared/gateway/product.gateway";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "../../facade/product-adm.facade.interface";

export default class CheckStockUsecase {
	private _productRepo: ProductGateway;

	constructor(productRepo: ProductGateway) {
		this._productRepo = productRepo;
	}

	async execute(productIdInput: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
		const product = await this._productRepo.find(productIdInput.productId);
		return { productId: product.id.id, stock: product.stock };
	}
}
