import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import ClientAdmFacade from "../../../client-adm/facade/client-adm.facade";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

type props = {
    clientFacade: ClientAdmFacadeInterface
}

export default class PlaceOrderUsecase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdmFacadeInterface

    constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface) {
        this._clientFacade = clientFacade
        this._productFacade = productFacade
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const result = await this._clientFacade.find({id: input.clientId})
        if(!result) throw new Error("Client not found")

        await this.validateProducts(input)
        return {} as PlaceOrderOutputDto
    }

    private async validateProducts(input: PlaceOrderInputDto){
        if(input.products.length === 0){
            throw new Error("No products selected")
        }

        for(const p of input.products){
            const product = await this._productFacade.checkStock({
                productId: p.productId
            })

            if(product.stock <= 0){
                throw new Error(`Product ${product.productId} is out of stock`)
            }
        }
    }
}