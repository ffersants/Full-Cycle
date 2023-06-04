import ProductRepository from "../../../product-adm/repository/product.repository";
import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUsecase implements UseCaseInterface {
    constructor(private productRepo: ProductGateway){}
    async execute(): Promise<any> {
        const result = await this.productRepo.findAll()

        return result
    }

}