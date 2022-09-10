import { Brand } from "./brands";
import { Type } from "./types";
export interface IProduct {
    id: number;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    isActive: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    type: Type;
    typeId: number;
    brand: Brand;
    brandId: number;
    stock: number;
}