import ProductGateway from "../../../@shared/gateway/product.gateway";

export default class CheckStockUsecase {
    private _productRepo: ProductGateway

    constructor(productRepo: ProductGateway) {
        this._productRepo = productRepo
    }

    async execute(productIdInput: string): Promise<any> {
       return await this._productRepo.find(productIdInput)
    }
}