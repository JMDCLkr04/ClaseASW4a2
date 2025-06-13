import type { exercise } from '../models/exercise'

export class ExerciseList {
  private container: HTMLElement
  private onEdit: (exercise: exercise) => void
  private onDelete: (id: number) => Promise<void>

  constructor(
    container: HTMLElement,
    onEdit: (exercise: exercise) => void,
    onDelete: (id: number) => Promise<void>
  ) {
    this.container = container
    this.onEdit = onEdit
    this.onDelete = onDelete
  }

  render(exercises: exercise[]): void {
    this.container.innerHTML = `
      <h2>Lista de Ejercicios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Duración</th>
            <th>Intensidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${exercises.map(ex => `
            <tr data-id="${ex.id}">
              <td>${ex.id}</td>
              <td>${ex.name}</td>
              <td>${ex.type.category}</td>
              <td>${ex.description}</td>
              <td>${ex.duration}</td>
              <td>${ex.intensity}</td>
              <td>
                <button class="edit-btn" data-id="${ex.id}">Editar</button>
                <button class="delete-btn" data-id="${ex.id}">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    // Editar ejercicio
    this.container.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = Number(button.getAttribute('data-id'))
        const row = button.closest('tr')
        if (row) {
          const exercise: exercise = {
            id: id,
            name: row.cells[1].textContent || '',
            type: {
              id: 0, // El id real de la categoría debería buscarse en la fuente de datos
              category: row.cells[2].textContent || '',
              description: '', // Si necesitas la descripción, deberías obtenerla de la fuente de datos
            },
            description: row.cells[3].textContent || '',
            duration: row.cells[4].textContent || '',
            intensity: row.cells[5].textContent || '',
          }
          this.onEdit(exercise)
        }
      })
    })

    // Eliminar ejercicio
    this.container.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const id = Number(button.getAttribute('data-id'))
        if (id && confirm('¿Está seguro de eliminar este ejercicio?')) {
          await this.onDelete(id)
        }
      })
    })
  }
}