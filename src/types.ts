export interface IProduct{
    id:string;
    name:string;
    price:number;
    imageUtl:string;
    category?:string;
}

export interface ICartItem extends IProduct{
    quantity:number;
}