import { IAddress } from "./address"

export interface IOrder {
    id: number
    buyerEmail: string
    orderDate: string
    orderDateNormalizer: string
    toAddress: IAddress
    shipType: string
    shippingPrice: number
    orderItems: IOrderItem[]
    subTotal: number
    total: number
    status: string
}

export interface IOrderItem {
    productId: number
    productName: string
    imageURL: string
    price: number
    quantity: number
}

export interface IOrderToCreate {
    cartId: string
    deliveryMethodId: number
    shipToAddress: IAddress
}