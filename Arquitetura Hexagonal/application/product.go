package application

import (
	"errors"

	"github.com/asaskevich/govalidator"
	uuid "github.com/satori/go.uuid"
)

func init() {
	govalidator.SetFieldsRequiredByDefault(true)
}

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	GetID() string
	GetName() string
	GetStatus() string
	GetPrice() float64
}

const (
	DISABLED = "disabled"
	ENABLED  = "enabled"
)

type Product struct {
	//apos a especificação do tipo do campo da sruct, temos o que é chamado de tags ``.
	//essas tags são basicamente notations que definem se o valor atribuído ao campo em questão é válido.
	//por exemplo, para o campo ID, só o consideramos como válido se o seu valor for do tipo uuidv4
	ID     string  `valid:"uuidv4"`
	Name   string  `valid:"required"`
	Price  float64 `valid:"float,optional"`
	Status string  `valid:"required"`
}

type ProductReader interface {
	Get(id string) (ProductInterface, error)
}

type ProductWriter interface {
	Save(product ProductInterface) (ProductInterface, error)
}

type ProductServiceInterface interface {
	Get(id string) (ProductInterface, error)
	Create(name string, price float64) (ProductInterface, error)
	Enable(Product ProductInterface) (ProductInterface, error)
	Disable(Product ProductInterface) (ProductInterface, error)
}

type ProductPersistenceInterface interface {
	ProductReader
	ProductWriter
}

func NewProduct() *Product {
	product := Product{
		ID:     uuid.NewV4().String(),
		Status: DISABLED,
	}
	return &product
}

func (p *Product) IsValid() (bool, error) {
	if p.Status == "" {
		p.Status = DISABLED
	}

	if p.Status != ENABLED && p.Status != DISABLED {
		return false, errors.New("O status deve ser disabled ou enabled")
	}

	if p.Price < 0 {
		return false, errors.New("O preço deve ser maior que 0")
	}
	//o pacote govalidator junto com o método ValidateStruct
	//ira checar se todos os campos de p (instância de Product)
	//são válidos de acordo com a notation/tag definida para acada propriedade
	_, err := govalidator.ValidateStruct(p)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (p *Product) Enable() error {
	if p.Price > 0 {
		p.Status = ENABLED
		return nil
	}
	return errors.New("O valor do produto deve ser informado")
}

func (p *Product) Disable() error {
	if p.Price == 0 {
		p.Status = DISABLED
		return nil
	}
	return errors.New("O valor do produto deve ser 0")
}

func (p *Product) GetID() string {
	return p.ID
}

func (p *Product) GetName() string {
	return p.Name
}

func (p *Product) GetStatus() string {
	return p.Status
}

func (p *Product) GetPrice() float64 {
	return p.Price
}
