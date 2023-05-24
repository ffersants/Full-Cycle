import { AggregateError } from "sequelize";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

export default class Product extends BaseEntity implements AggregateRoot{
    private _name: string
    private _description: string
    private _salesPrice: number
}