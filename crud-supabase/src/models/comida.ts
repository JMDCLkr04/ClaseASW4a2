import type { Category}  from "./category"

export interface Comida{
  id: number,
  name: string,
  category: Category,
  flavor: string,
  unity: string,
  preparation_time: number,
  created_at: string,
  calories: number
}

export type ComidaInput = Omit<Comida, 'id'>
export type ComidaUpdate = Partial<ComidaInput> 