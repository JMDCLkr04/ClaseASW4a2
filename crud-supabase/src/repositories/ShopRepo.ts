import { database, getNextShopListId } from '../models/database'
import type { ShopList } from '../models/shoplist'

export type ShopListInput = Omit<ShopList, 'id'>
export type ShopListUpdate = Partial<ShopListInput>

/**
 * Repository para manejar la persistencia de listas de compras
 * Se encarga únicamente de las operaciones CRUD sobre el array de listas de compras
 */
export class ShopRepository {

  /**
   * Obtiene todas las listas de compras
   */
  static getAll(): ShopList[] {
    return database.shoplists
  }

  /**
   * Busca una lista de compras por ID
   */
  static findById(id: number): ShopList | undefined {
    return database.shoplists.find(list => list.id === id)
  }

  /**
   * Agrega una nueva lista de compras
   */
  static create(listData: ShopListInput): ShopList {
    const newList: ShopList = {
      ...listData,
      id: getNextShopListId()
    }
    database.shoplists.push(newList)
    return newList
  }

  /**
   * Actualiza una lista de compras existente
   */
  static update(id: number, updates: ShopListUpdate): ShopList | null {
    const index = database.shoplists.findIndex(list => list.id === id)
    if (index === -1) {
      return null
    }
    database.shoplists[index] = {
      ...database.shoplists[index],
      ...updates
    }
    return database.shoplists[index]
  }

  /**
   * Elimina una lista de compras
   */
  static delete(id: number): boolean {
    const index = database.shoplists.findIndex(list => list.id === id)
    if (index === -1) {
      return false
    }
    database.shoplists.splice(index, 1)
    return true
  }

  /**
   * Cuenta total de listas de compras
   */
  static count(): number {
    return database.shoplists.length
  }
}