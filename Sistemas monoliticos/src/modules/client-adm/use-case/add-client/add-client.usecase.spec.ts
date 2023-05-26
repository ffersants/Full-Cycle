import AddClientUsecase from "./add-client.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("AddClientUsecase test",  () => {
    it("should add client", async() => {
        const repo = MockRepository()
        const usecase = new AddClientUsecase(repo)

        const input = {
            name: "Fulano",
            address: "qwio",
            email: "test@ok.com"
        }

        const result = await usecase.execute(input)
        expect(repo.add).toHaveBeenCalled()
    })
})