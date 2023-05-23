import UseCaseInterface from "../../@shared/usecase/add-product/use-case.interface";
import ProductAdmFacadeInterface, {
	AddProductFacadeInputDto,
	CheckStockFacadeInputDto,
	CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
	addUsecase: UseCaseInterface;
	stockUsecase: UseCaseInterface;
}
//a facade é uma maneira de interligar os casos de uso interno da aplicação
//com os clientes externos da aplicação
export default class ProductAdmFacade
	implements ProductAdmFacadeInterface
{
	private _addUsecase: UseCaseInterface;
	private _checkStockUsecase: UseCaseInterface;

	constructor(usecasesProps: UseCasesProps) {
		this._addUsecase = usecasesProps.addUsecase;
		this._checkStockUsecase = usecasesProps.stockUsecase;
	}

	addProduct(input: AddProductFacadeInputDto): Promise<void> {
		return this._addUsecase.execute(input);
	}
	checkStock(
		input: CheckStockFacadeInputDto
	): Promise<CheckStockFacadeOutputDto> {
		return this._checkStockUsecase.execute(input);
	}
}
