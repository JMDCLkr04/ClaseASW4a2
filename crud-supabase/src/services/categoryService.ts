import { CategoryRepository } from '../repositories/categoryRepository'
import type { Category, CategoryInput, CategoryUpdate } from '../types/category'

/**
 * Servicio de categorías
 * Maneja la lógica de negocio y utiliza el CategoryRepository para la persistencia
 */
export class CategoryService {
  
  static async getAll(): Promise<Category[]> {
    console.log('📋 Obteniendo todas las categorías...')
    const categories = CategoryRepository.getAll()
    console.log(`✅ ${categories.length} categorías obtenidas`)
    return categories
  }

  static async getById(id: number): Promise<Category | null> {
    console.log(`🔍 Buscando categoría con ID: ${id}`)
    const category = CategoryRepository.findById(id)
    if (category) {
      console.log(`✅ Categoría encontrada: ${category.description}`)
      return category
    } else {
      console.log(`❌ Categoría con ID ${id} no encontrada`)
      return null
    }
  }

  static async create(category: CategoryInput): Promise<void> {
    console.log('➕ Creando nueva categoría:', category)
    const newCategory = CategoryRepository.create(category)
    console.log(`✅ Categoría creada con ID: ${newCategory.id}`)
  }

  static async update(id: number, category: CategoryUpdate): Promise<void> {
    console.log(`✏️ Actualizando categoría ID ${id}:`, category)
    const updated = CategoryRepository.update(id, category)
    if (!updated) {
      throw new Error('Categoría no encontrada')
    }
    console.log(`✅ Categoría ${id} actualizada exitosamente`)
  }

  static async delete(id: number): Promise<void> {
    console.log(`🗑️ Eliminando categoría con ID: ${id}`)
    const deleted = CategoryRepository.delete(id)
    if (!deleted) {
      throw new Error('Categoría no encontrada')
    }
    console.log(`✅ Categoría ${id} eliminada exitosamente`)
  }

  static async getCount(): Promise<number> {
    const count = CategoryRepository.count()
    console.log(`📊 Total de categorías: ${count}`)
    return count
  }
} 