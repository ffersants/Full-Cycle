import ProductRepositry from "../../@shared/repository/product.repository"
import ProductAdmFacade from "../facade/product-adm.facade"
import AddProductUsecase from "../usecase/add/add-product.usecase"

export default class ProductAdmFacadeFactory{
    static create(){
        const productRepo = new ProductRepositry()
        const addProductUsecase = new AddProductUsecase(productRepo)
        const productFacade = new ProductAdmFacade({
            addUsecase: addProductUsecase,
            stockUsecase: undefined
        })

        return productFacade
    }
}