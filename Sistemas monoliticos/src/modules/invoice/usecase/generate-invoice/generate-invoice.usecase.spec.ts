import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto"
import GenerateInvoiceUsecase from "./generate-invoice.usecase"

const RepoMock = () => {
    return {
        find: jest.fn(),
        generate: jest.fn()
    }
}

describe("InvoiceUsecase test", () => {
    it("should register a new invoice", async() => {
        const repo = RepoMock()
        const usecase = new GenerateInvoiceUsecase(repo)

        const input: GenerateInvoiceUseCaseInputDto = {
            city: "ceilandia",
            complement: "qr",
            document: "2323",
            items: [
                {
                    id: "1",
                    name: "ball",
                    price: 10
                }
            ],
            name: "green ball",
            number:"1",
            state: "DF",
            street: "qr",
            zipCode: "000000"
        }

        const result = await usecase.execute(input)

        expect(result.id).toBeDefined()
        expect(result.total).toBe(10)
    })
})