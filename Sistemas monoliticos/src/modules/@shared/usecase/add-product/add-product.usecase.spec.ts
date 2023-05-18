import AddProductUsecase from "./add-product.usecase"

const MockRepository = {
    add: jest.fn(),
    find: jest.fn()
}

describe("Add product usecase unit test", () => {
    it("should add a product", async () => {
        const productRepo = MockRepository
        const usecase = new AddProductUsecase(productRepo)
       
        const input = {
            name: "",
            description: "",
            purchasePrice: 29,
            stock: 10
        }

        const result = await usecase.execute(input)
    
        expect(productRepo.add).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(input.name)
        expect(result.description).toBe(input.description)
        expect(result.purchasePrice).toBe(input.purchasePrice)
        expect(result.stock).toBe(input.stock)
    })
})