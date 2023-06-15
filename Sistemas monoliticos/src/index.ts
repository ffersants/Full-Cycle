import { validate } from 'class-validator';
import express from 'express'
import CreateProductModelValidation from "./app/validations/create-product-model-validation"
import ProductAdmFacadeFactory from './modules/product-adm/factory/facade.factory';
import ClientFacadeFactory from './modules/client-adm/factory/facade.factory';
import CreateClientModelValidation from './app/validations/create-client-model-validation';
const app = express()

app.post("products", async(req, res) => {
    const productFacade = ProductAdmFacadeFactory.create()

    const product = req.body;
    const validationErrors = await validate(new CreateProductModelValidation(), product);
  
    if (validationErrors.length > 0) {
      // Handle validation errors
      res.status(400).json({ errors: validationErrors });
    } else {
      productFacade.addProduct(product)
    }
})

app.post("clients", async(req, res) => {
  const clientFacade = ClientFacadeFactory.create()

  const client = req.body;
  const validationErrors = await validate(new CreateClientModelValidation(), client);

  if (validationErrors.length > 0) {
    // Handle validation errors
    res.status(400).json({ errors: validationErrors });
  } else {
    clientFacade.add(client)
  }
})

//TODO: implementar post de checkout e facade do checkout. 
//TODO: implementar testes dos endpoints com supertest