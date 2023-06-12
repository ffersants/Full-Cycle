import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/add-product/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import { InvoiceProductModel } from "./../../../invoice/repository/invoice-products.model";
import Order from "../../domain/order.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";

export default class PlaceOrderUsecase implements UseCaseInterface {
	private _clientFacade: ClientAdmFacadeInterface;
	private _productFacade: ProductAdmFacadeInterface;
	private _catalogFacade: StoreCatalogFacadeInterface;
	private _repo: CheckoutGateway
	private _invoiceFacade: InvoiceFacadeInterface
	private _paymentFacade: PaymentFacadeInterface
	
	constructor(
		clientFacade: ClientAdmFacadeInterface,
		productFacade: ProductAdmFacadeInterface,
		catalogFacade: StoreCatalogFacadeInterface,
		repo: CheckoutGateway,
		invoiceFacade: InvoiceFacadeInterface,
		paymentFacade: PaymentFacadeInterface
	) {
		this._clientFacade = clientFacade;
		this._productFacade = productFacade;
		this._catalogFacade = catalogFacade;
		this._repo = repo
		this._invoiceFacade = invoiceFacade
		this._paymentFacade = paymentFacade
	}

	async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
		const findClientResult = await this._clientFacade.find({
			id: input.clientId,
		});
		if (!findClientResult) throw new Error("Client not found");

		await this.validateProducts(input);

		const products = await Promise.all(
			input.products.map((p) => this.getProducts(p.productId))
		);

		const client = new Client({
			id: new Id(findClientResult.id),
			address: findClientResult.address,
			email: findClientResult.email,
			name: findClientResult.name,
		});

		const order = new Order({
			client,
			products,
		});

		const payment = await this._paymentFacade.process({
			orderId: order.id.id,
			amount: order.total
		})

		 const invoice = payment.status === "approved" ? await this._invoiceFacade.generate({
			name: client.name,
			city: "",
			complement: "",
			document: "",
			items: products.map(i => ({id: i.id.id, name: i.name, price: i.salesPrice})),
			number: "",
			state: "",
			street: "",
			zipCode: ""
		}) : null
		
		payment.status === "approved" && order.approved()
		this._repo.addOrder(order)

		return {
			id: order.id.id,
			invoiceId: payment.status === "approved" ? invoice.id : null,
			status: order.status,
			total: order.total,
			products: order.products.map(i => ({
				productId: i.id.id
			}))
		} 
	}

	private async validateProducts(input: PlaceOrderInputDto) {
		if (input.products.length === 0) {
			throw new Error("No products selected");
		}

		for (const p of input.products) {
			const product = await this._productFacade.checkStock({
				productId: p.productId,
			});

			if (product.stock <= 0) {
				throw new Error(`Product ${product.productId} is out of stock`);
			}
		}
	}

	private async getProducts(productId: string): Promise<Product> {
		const product = await this._catalogFacade.find(productId);
		if (!product) throw new Error("Product not found");

		const productReturn = {
			id: new Id(product.id),
			description: product.description,
			name: product.name,
			salesPrice: product.salesPrice,
		};

		return new Product(productReturn);
	}
}
