import type { Category } from './category'
import type { Comida } from './comida'
// import type { ShopList } from './shoplist'

// Nueva interfaz de base de datos
export interface JsonDatabase {
  categories: Category[]
  food: Comida[]
  // shopList: ShopList[]
}

// Base de datos de ejemplo
export const database: JsonDatabase = {
  categories: [
    {
      id: 1,
      name: 'Dulce',
      description: 'Comidas con sabor dulce'
    },
    {
      id: 2,
      name: 'Salado',
      description: 'Comidas con sabor salado'
    }
  ],
  food: [
    {
      id: 1,
      name: 'Pastel de chocolate',
      category: { id: 1, name: 'Dulce', description: 'Comidas con sabor dulce' },
      flavor: 'Dulce',
      unity: 'porción',
      preparation_time: 90,
      calories: 350,
      created_at: '2025-06-13'
    }
  ],
 


}

// Contadores simples para IDs
export let nextCategoryId = 3
export let nextFoodId = 2

export function getNextCategoryId(): number {
  return nextCategoryId++
}

export function getNextFoodId(): number {
  return nextFoodId++
}