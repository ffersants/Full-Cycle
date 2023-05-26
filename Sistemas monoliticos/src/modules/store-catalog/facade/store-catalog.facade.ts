import UseCaseInterface from "../../@shared/usecase/add-product/use-case.interface";

export interface StoreCatalogFacadeProps{
    findProductUseCase: UseCaseInterface
    findAllProductsUseCase: UseCaseInterface
}

export default class StoreCatalogFacade {
    private _findProductUseCase: UseCaseInterface
    private _findAllProductsUseCase: UseCaseInterface
    constructor(props: StoreCatalogFacadeProps){
        this._findAllProductsUseCase = props.findAllProductsUseCase
        this._findProductUseCase = props.findProductUseCase
    }

    async find(id: string){
        return await this._findProductUseCase.execute(id)
    }

    async findAll(){
        return await this._findAllProductsUseCase.execute(null)
    }
}