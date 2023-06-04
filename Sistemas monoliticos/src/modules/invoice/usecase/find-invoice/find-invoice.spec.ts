import Id from "../../../@shared/domain/value-object/id.value-object"
import Address from "../../domain/address.value-object"
import Invoice from "../../domain/invoice.entity"
import Product from "../../domain/product.entity"
import FindInvoiceUsecase from "./find-invoice.usecase"

const findResult = new Invoice({
    id: new Id("1"),
    address: new Address({
        city: "ceilandia",
        complement: "qr",
        number:"1",
        state: "DF",
        street: "qr",
        zipCode: "000000",
    }),
    document: "2323",
    name: "green ball",
    items: [
        new Product({
            id: new Id("123"),
            name: "ball",
            price: 10
        })
    ],
})

const RepoMock = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(findResult)),
        generate: jest.fn()
    }
}

describe("InvoiceUsecase test", () => {
    it("should register a new invoice", async() => {
        const repo = RepoMock()
        const usecase = new FindInvoiceUsecase(repo)
        const input = {id: "1"}
        const result = await usecase.execute(input)

        expect(result).toBeDefined()
        expect(result.total).toBe(10)
    })
})