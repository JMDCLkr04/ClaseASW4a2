import type { exercise } from '../models/exercise'
import type { ExerciseCat } from '../models/excerciseCat'

export type ExerciseInput = Omit<exercise, 'id'>

export class ExerciseForm {
  private form: HTMLFormElement
  private onSubmit: (data: ExerciseInput) => Promise<void>
  private onCancel?: () => void
  private exercise?: exercise
  private categories: ExerciseCat[]

  constructor(
    container: HTMLElement,
    categories: ExerciseCat[],
    onSubmit: (data: ExerciseInput) => Promise<void>,
    onCancel?: () => void,
    exercise?: exercise
  ) {
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.exercise = exercise
    this.categories = categories
    this.form = this.createForm()
    container.innerHTML = ''
    container.appendChild(this.form)
    this.setupEventListeners()
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form')
    form.id = 'exerciseForm'
    form.innerHTML = `
      <h2>${this.exercise ? 'Editar' : 'Nuevo'} Ejercicio</h2>
      <div class="form-group">
        <input type="text" id="name" name="name" placeholder="Nombre del ejercicio" required
          value="${this.exercise?.name || ''}">
      </div>
      <div class="form-group">
        <select id="type" name="type" required>
          <option value="">Seleccione una categoría</option>
          ${this.categories.map(cat => `
            <option value="${cat.id}" ${this.exercise?.type.id === cat.id ? 'selected' : ''}>${cat.category}</option>
          `).join('')}
        </select>
      </div>
      <div class="form-group">
        <input type="text" id="description" name="description" placeholder="Descripción" required
          value="${this.exercise?.description || ''}">
      </div>
      <div class="form-group">
        <input type="text" id="duration" name="duration" placeholder="Duración (ej: 30 min)" required
          value="${this.exercise?.duration || ''}">
      </div>
      <div class="form-group">
        <input type="text" id="intensity" name="intensity" placeholder="Intensidad (ej: Alta, Media, Baja)" required
          value="${this.exercise?.intensity || ''}">
      </div>
      <button type="submit">${this.exercise ? 'Actualizar' : 'Crear'}</button>
      ${this.exercise ? '<button type="button" id="cancelEdit">Cancelar</button>' : ''}
    `
    return form
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(this.form)

      const name = formData.get('name')
      const typeId = Number(formData.get('type'))
      const description = formData.get('description')
      const duration = formData.get('duration')
      const intensity = formData.get('intensity')

      if (!name || typeof name !== 'string' || !name.trim()) {
        alert('El nombre es obligatorio.')
        return
      }
      if (!typeId) {
        alert('Debe seleccionar una categoría.')
        return
      }
      const type = this.categories.find(cat => cat.id === typeId)
      if (!type) {
        alert('Categoría inválida.')
        return
      }
      if (!description || typeof description !== 'string' || !description.trim()) {
        alert('La descripción es obligatoria.')
        return
      }
      if (!duration || typeof duration !== 'string' || !duration.trim()) {
        alert('La duración es obligatoria.')
        return
      }
      if (!intensity || typeof intensity !== 'string' || !intensity.trim()) {
        alert('La intensidad es obligatoria.')
        return
      }

      const exerciseData: ExerciseInput = {
        name: name.trim(),
        type,
        description: description.trim(),
        duration: duration.trim(),
        intensity: intensity.trim(),
      }

      try {
        await this.onSubmit(exerciseData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar el ejercicio:', error)
        alert('Error al guardar el ejercicio. Por favor intente nuevamente.')
      }
    })

    const cancelButton = this.form.querySelector('#cancelEdit')
    if (cancelButton && this.onCancel) {
      cancelButton.addEventListener('click', (e) => {
        e.preventDefault()
        this.onCancel!()
      })
    }
  }
}