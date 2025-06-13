import type { Category, CategoryInput } from '../models/category'

export class CategoryForm {
  private form: HTMLFormElement
  private onSubmit: (data: CategoryInput) => Promise<void>
  private onCancel?: () => void
  private category?: Category

  constructor(
    container: HTMLElement,
    onSubmit: (data: CategoryInput) => Promise<void>,
    onCancel?: () => void,
    category?: Category
  ) {
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.category = category
    this.form = this.createForm()
    container.innerHTML = ''
    container.appendChild(this.form)
    this.setupEventListeners()
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form')
    form.id = 'categoryForm'
    form.innerHTML = `
      <h2>${this.category ? 'Editar' : 'Nueva'} Categoría</h2>
      <div class="form-group">
        <input type="text" id="description" name="description" placeholder="Descripción" required 
          value="${this.category?.description ? this.category.description : ''}">
      </div>
      <button type="submit">${this.category ? 'Actualizar' : 'Crear'}</button>
      ${this.category ? '<button type="button" id="cancelEdit">Cancelar</button>' : ''}
    `
    return form
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(this.form)

      const description = formData.get('description')
      if (!description || typeof description !== 'string' || !description.trim()) {
        alert('La descripción es obligatoria.')
        return
      }

      const categoryData: CategoryInput = {
        name: description.trim(),
        description: description.trim(),
      }

      try {
        await this.onSubmit(categoryData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar la categoría:', error)
        alert('Error al guardar la categoría. Por favor intente nuevamente.')
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