import ProductRepositry from "../../@shared/repository/product.repository"
import ProductAdmFacade from "../facade/product-adm.facade"
import AddProductUsecase from "../usecase/add/add-product.usecase"
import CheckStockUsecase from "../usecase/check-stock/check-stock.usecase"

export default class ProductAdmFacadeFactory{
    static create(){
        const productRepo = new ProductRepositry()
        const addProductUsecase = new AddProductUsecase(productRepo)
        const checkStockUsecase = new CheckStockUsecase(productRepo)
        const productFacade = new ProductAdmFacade({
            addUsecase: addProductUsecase,
            stockUsecase: checkStockUsecase
        })

        return productFacade
    }
}