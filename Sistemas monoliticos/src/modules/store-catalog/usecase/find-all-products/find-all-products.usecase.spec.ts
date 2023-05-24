import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindAllProductsUsecase from "./find-all-products.usecase"

const product1 = new Product({
    id: new Id("1"),
    name: "Nameee",
    description: "descriptionion",
    salesPrice: 50
})

const product2 = new Product({
    id: new Id("2"),
    name: "Nameee",
    description: "descriptionion",
    salesPrice: 50
})

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    }
}

describe("FindAllProducts test", () => {
    it("should find all products", async() => {
        const productRepository = mockRepository()
        const useCase = new FindAllProductsUsecase(productRepository)
        
        const result = await useCase.execute()

        expect(productRepository.findAll).toHaveBeenCalled()
        expect(result).toHaveLength(2)
    })
})