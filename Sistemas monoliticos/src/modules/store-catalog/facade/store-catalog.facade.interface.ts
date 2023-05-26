export interface FindAllStoreCatalogFacadeOutputDto {
    id: string
    name: string
    description: string
    salesPrice: number
}

export default interface StoreCatalogFacadeInterface {
    find(id: string): Promise<FindAllStoreCatalogFacadeOutputDto>
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto[]>
}