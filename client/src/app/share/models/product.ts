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

export interface Type {
    id: number;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    isActive: number;
    name: string;
}

export interface Brand {
    id: number;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    isActive: number;
    name: string;
}