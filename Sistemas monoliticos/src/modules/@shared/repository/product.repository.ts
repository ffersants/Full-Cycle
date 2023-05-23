import Product from "../../product-adm/domain/product.entity";
import Id from "../domain/value-object/id.value-object";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepositry implements ProductGateway {
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
			product,
		});
	}
}
