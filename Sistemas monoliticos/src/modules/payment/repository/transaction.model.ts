import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export default class TransactionModel extends Model {
	@PrimaryKey
    @Column({ allowNull: false })
	id: string;

	@Column({ allowNull: false })
	orderId: string;

	@Column({ allowNull: false })
	amount: string;

	@Column({ allowNull: false })
	status: string;

	@Column({ allowNull: false })
	createdAt: Date;

	@Column({ allowNull: false })
	updatedAt: Date;
}
