import Id from "../../../@shared/domain/value-object/id.value-object"

export interface ProcessPaymentInputDto {
    id?: Id
    orderId: string
    amount: number
}

export interface ProcessPaymentOutputDto {
    transactionId: string
    orderId: string
    amount: number
    status: string
    createdAt: Date
    updatedAt: Date
}