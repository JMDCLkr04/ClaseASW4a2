import { database, getNextFoodId } from '../models/database'
import type { Comida, ComidaInput, ComidaUpdate } from '../models/comida'

/**
 * Repository para manejar la persistencia de comidas
 * Se encarga únicamente de las operaciones CRUD sobre el array de comidas
 */
export class FoodRepository {

  /**
   * Obtiene todas las comidas
   */
  static getAll(): Comida[] {
    return database.food
  }

  /**
   * Busca una comida por ID
   */
  static findById(id: number): Comida | undefined {
    return database.food.find(food => food.id === id)
  }

  /**
   * Agrega una nueva comida
   */
  static create(comidaData: ComidaInput): Comida {
    const newComida: Comida = {
      ...comidaData,
      id: getNextFoodId(),
      created_at: new Date().toISOString()
    }
    database.food.push(newComida)
    return newComida
  }

  /**
   * Actualiza una comida existente
   */
  static update(id: number, updates: ComidaUpdate): Comida | null {
    const index = database.food.findIndex(food => food.id === id)
    if (index === -1) {
      return null
    }
    database.food[index] = {
      ...database.food[index],
      ...updates
    }
    return database.food[index]
  }

  /**
   * Elimina una comida
   */
  static delete(id: number): boolean {
    const index = database.food.findIndex(food => food.id === id)
    if (index === -1) {
      return false
    }
    database.food.splice(index, 1)
    return true
  }

  /**
   * Cuenta total de comidas
   */
  static count(): number {
    return database.food.length
  }
}