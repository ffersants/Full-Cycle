import StoreCatalogFacade from "../facade/store-catalog.facade"
import ProductRepository from "../repository/product.repository"
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase"
import FindProductUsecase from "../usecase/find-product/find-product.usecase"

export default class StoreCatalogFacadeFactory {
    static create(){
        const repo = new ProductRepository()
        const findAllUsecase = new FindAllProductsUsecase(repo)
        const findUsecase = new FindProductUsecase(repo)
        const storeCatalogFacade = new StoreCatalogFacade({
            findAllProductsUseCase: findAllUsecase,
            findProductUseCase: findUsecase 
        }) 

        return storeCatalogFacade
    }
}