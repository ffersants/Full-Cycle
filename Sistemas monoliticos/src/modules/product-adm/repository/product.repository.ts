import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../../product-adm/domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
	async find(id: string): Promise<Product> {
		const product = await ProductModel.findOne({
			where: { id },
		});

		if (!product) throw new Error("Product not found");
		else
			return new Product({
				description: product.description,
				name: product.name,
				purchasePrice: product.purchasePrice,
				stock: product.stock,
				id: new Id(product.id),
			});
	}
	async add(product: Product): Promise<void> {
		await ProductModel.create({
			id: product.id.id,
			name: product.name,
			description: product.description,
			purchasePrice: product.purchasePrice,
			stock: product.stock,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		});
	}
}
