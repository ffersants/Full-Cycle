package cli

import (
	"fmt"

	"github.com/ffersants/full-cycle/application"
)

func Run(service application.ProductServiceInterface, action string, productId string, productName string, price float64) (string, error) {

	var result = ""

	switch action {
	case "create":
		product, err := service.Create(productName, price)
		if err != nil {
			return result, err
		}
		result = fmt.Sprintf("Product ID %s with name %s has been created with price %f",
			product.GetID(),
			product.GetName(),
			product.GetPrice())
	case "enable":
		product, err := service.Get(productId)
		if err != nil {
			return result, err
		}
		v, err := service.Enable(product)
		if v == nil || err != nil {
			return result, err
		}
		result = fmt.Sprintf("Product %s has been enabled", product.GetName())
	case "disable":
		product, err := service.Get(productId)
		if err != nil {
			return result, err
		}
		res, err := service.Disable(product)
		if res == nil || err != nil {
			return result, err
		}
		result = fmt.Sprintf("Product %s has been disabled", product.GetName())
	default:
		res, err := service.Get(productId)
		if err != nil {
			return result, err
		}
		result = fmt.Sprintf("Product to return has ID %s", res.GetName())
	}

	return result, nil
}
