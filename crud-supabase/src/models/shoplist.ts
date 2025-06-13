import type { ShopCategory } from "./shopCategory";

export interface ShopList{
    id: number,
    item: string[],
    quantity: number,
    type: ShopCategory,
    done: boolean,
}