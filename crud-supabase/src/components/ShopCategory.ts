import type { ShopCategory } from "../models/shopCategory"

export type ShopCategoryInput = Omit<ShopCategory, "id">

export class ShopCategoryForm {
  private form: HTMLFormElement
  private onSubmit: (data: ShopCategoryInput) => Promise<void>
  private onCancel?: () => void
  private category?: ShopCategory

  constructor(
    container: HTMLElement,
    onSubmit: (data: ShopCategoryInput) => Promise<void>,
    onCancel?: () => void,
    category?: ShopCategory
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
    form.id = 'shopCategoryForm'
    form.innerHTML = `
      <h2>${this.category ? 'Editar' : 'Nueva'} Categoría de Compras</h2>
      <div class="form-group">
        <input type="text" id="name" name="name" placeholder="Nombre de la categoría" required 
          value="${this.category?.name || ''}">
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

      const name = formData.get('name')
      if (!name || typeof name !== 'string' || !name.trim()) {
        alert('El nombre es obligatorio.')
        return
      }

      const categoryData: ShopCategoryInput = {
        name: name.trim(),
      }

      try {
        await this.onSubmit(categoryData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar la categoría de compras:', error)
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