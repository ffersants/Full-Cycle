import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "invoice-products",
    timestamps: false
})    

export class InvoiceProductModel extends Model{
    @Column({allowNull: false})
    productId: string

    @Column({allowNull: false})
    invoiceId: string

    @Column({allowNull: false})
    name: string
    
    @Column({allowNull: false})
    price: number

}