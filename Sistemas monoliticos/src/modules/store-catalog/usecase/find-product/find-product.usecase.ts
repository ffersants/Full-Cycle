import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface{
    constructor(private productRepo: ProductGateway){}
    async execute(input: any): Promise<FindProductDto> {
        const result = await this.productRepo.find(input)
        return {
            id: result.id.id,
            description: result.description,
            name: result.name,
            salesPrice: result.salesPrice
        }
    }

}