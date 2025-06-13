// Servicios de lógica de negocio
export { CategoryService } from './categoryService'
export { PacienteService } from './pacienteService'

// Re-export de repositories para conveniencia
export { CategoryRepository, PacienteRepository } from '../repositories'

// Tipos principales
export type { JsonDatabase } from '../types/database'
export { database } from '../types/database' 