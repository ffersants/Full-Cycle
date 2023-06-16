import { validate } from "class-validator";
import express from "express";
import CreateProductModelValidation from "./app/validations/create-product-model-validation";
import ProductAdmFacadeFactory from "./modules/product-adm/factory/facade.factory";
import ClientFacadeFactory from "./modules/client-adm/factory/facade.factory";
import CreateClientModelValidation from "./app/validations/create-client-model-validation";
import InvoiceFacadeFactory from "./modules/invoice/factory/facade.factory";
const app = express();

app.post("products", async (req, res) => {
	try {
		const productFacade = ProductAdmFacadeFactory.create();

		const product = req.body;
		const validationErrors = await validate(
			new CreateProductModelValidation(),
			product
		);

		if (validationErrors.length > 0) {
			// Handle validation errors
			res.status(400).json({ errors: validationErrors });
		} else {
			await productFacade.addProduct(product);
			res.status(200).send();
		}
	} catch (e) {
		res.status(500).send("Algo deu errado. Favor tentar novamente");
	}
});

app.post("clients", async (req, res) => {
	try {
		const clientFacade = ClientFacadeFactory.create();

		const client = req.body;
		const validationErrors = await validate(
			new CreateClientModelValidation(),
			client
		);

		if (validationErrors.length > 0) {
			// Handle validation errors
			res.status(400).json({ errors: validationErrors });
		} else {
			await clientFacade.add(client);
			res.status(200).send();
		}
	} catch (e) {
		res.status(500).send("Algo deu errado. Favor tentar novamente");
	}
});

app.get("invoice/:id", async (req, res) => {
	try {
		const invoiceToGet = req.params.id;

		const invoiceFacade = InvoiceFacadeFactory.create();

		const result = await invoiceFacade.find({ id: invoiceToGet });
		res.send(result);
	} catch (e) {
		res.status(500).send("Algo deu errado. Favor tentar novamente");
	}
});

//TODO: implementar endpoint POST/checkout
//TODO: implementar testes dos endpoints com supertest
