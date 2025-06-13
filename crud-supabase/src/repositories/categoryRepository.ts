import { database, getNextCategoryId } from '../models/database'
import type { Category, CategoryInput, CategoryUpdate } from '../models/category'

/**
 * Repository para manejar la persistencia de categorías
 * Se encarga únicamente de las operaciones CRUD sobre el array de categorías
 */
export class CategoryRepository {
  
  /**
   * Obtiene todas las categorías
   */
  static getAll(): Category[] {
    return database.categories
  }

  /**
   * Busca una categoría por ID
   */
  static findById(id: number): Category | undefined {
    return database.categories.find(category => category.id === id)
  }

  /**
   * Agrega una nueva categoría
   */
  static create(categoryData: CategoryInput): Category {
    const newCategory: Category = {
      ...categoryData,
      id: getNextCategoryId(),
      created_at: new Date().toISOString()
    }
    
    database.categories.push(newCategory)
    return newCategory
  }

  /**
   * Actualiza una categoría existente
   */
  static update(id: number, updates: CategoryUpdate): Category | null {
    const index = database.categories.findIndex(category => category.id === id)
    
    if (index === -1) {
      return null
    }
    
    database.categories[index] = { 
      ...database.categories[index], 
      ...updates 
    }
    
    return database.categories[index]
  }

  /**
   * Elimina una categoría
   */
  static delete(id: number): boolean {
    const index = database.categories.findIndex(category => category.id === id)
    
    if (index === -1) {
      return false
    }
    
    database.categories.splice(index, 1)
    return true
  }

  /**
   * Cuenta total de categorías
   */
  static count(): number {
    return database.categories.length
  }
}