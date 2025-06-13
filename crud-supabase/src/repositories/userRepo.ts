import { database, getNextUserId } from '../models/database'
import type { user } from '../models/user'

export type UserInput = Omit<user, 'id'>
export type UserUpdate = Partial<UserInput>

/**
 * Repository para manejar la persistencia de usuarios
 * Se encarga únicamente de las operaciones CRUD sobre el array de usuarios
 */
export class UserRepository {

  /**
   * Obtiene todos los usuarios
   */
  static getAll(): user[] {
    return database.users
  }

  /**
   * Busca un usuario por ID
   */
  static findById(id: number): user | undefined {
    return database.users.find(u => u.id === id)
  }

  /**
   * Agrega un nuevo usuario
   */
  static create(userData: UserInput): user {
    const newUser: user = {
      ...userData,
      id: getNextUserId()
    }
    database.users.push(newUser)
    return newUser
  }

  /**
   * Actualiza un usuario existente
   */
  static update(id: number, updates: UserUpdate): user | null {
    const index = database.users.findIndex(u => u.id === id)
    if (index === -1) {
      return null
    }
    database.users[index] = {
      ...database.users[index],
      ...updates
    }
    return database.users[index]
  }

  /**
   * Elimina un usuario
   */
  static delete(id: number): boolean {
    const index = database.users.findIndex(u => u.id === id)
    if (index === -1) {
      return false
    }
    database.users.splice(index, 1)
    return true
  }

  /**
   * Cuenta total de usuarios
   */
  static count(): number {
    return database.users.length
  }
}