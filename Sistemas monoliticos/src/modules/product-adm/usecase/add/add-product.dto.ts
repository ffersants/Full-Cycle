export interface AddProductInputDto {
	id?: string
	name: string;
	description: string;
	purchasePrice: number;
	stock: number;
}

export interface AddProductOutputDto extends AddProductInputDto{
	createdAt: Date
	updatedAt: Date
}
