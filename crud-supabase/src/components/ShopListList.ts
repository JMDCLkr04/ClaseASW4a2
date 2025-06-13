import type { ShopList } from "../models/shoplist"
import type { ShopCategory } from "../models/shopCategory"

export type ShopListInput = Omit<ShopList, "id">

export class ShopListForm {
  private form: HTMLFormElement
  private onSubmit: (data: ShopListInput) => Promise<void>
  private onCancel?: () => void
  private shoplist?: ShopList
  private categories: ShopCategory[]

  constructor(
    container: HTMLElement,
    categories: ShopCategory[],
    onSubmit: (data: ShopListInput) => Promise<void>,
    onCancel?: () => void,
    shoplist?: ShopList
  ) {
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.shoplist = shoplist
    this.categories = categories
    this.form = this.createForm()
    container.innerHTML = ''
    container.appendChild(this.form)
    this.setupEventListeners()
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form')
    form.id = 'shopListForm'
    form.innerHTML = `
      <h2>${this.shoplist ? 'Editar' : 'Nuevo'} Ítem de Lista de Compras</h2>
      <div class="form-group">
        <input type="text" id="item" name="item" placeholder="Ítems separados por coma (ej: pan, leche, queso)" required
          value="${this.shoplist ? this.shoplist.item.join(', ') : ''}">
      </div>
      <div class="form-group">
        <input type="number" id="quantity" name="quantity" placeholder="Cantidad" required min="1"
          value="${this.shoplist?.quantity || ''}">
      </div>
      <div class="form-group">
        <select id="type" name="type" required>
          <option value="">Seleccione una categoría</option>
          ${this.categories.map(cat => `
            <option value="${cat.id}" ${this.shoplist?.type.id === cat.id ? 'selected' : ''}>${cat.name}</option>
          `).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="done" name="done" ${this.shoplist?.done ? 'checked' : ''}>
          ¿Completado?
        </label>
      </div>
      <button type="submit">${this.shoplist ? 'Actualizar' : 'Agregar'}</button>
      ${this.shoplist ? '<button type="button" id="cancelEdit">Cancelar</button>' : ''}
    `
    return form
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(this.form)

      const itemRaw = formData.get('item')
      const quantity = Number(formData.get('quantity'))
      const typeId = Number(formData.get('type'))
      const done = !!formData.get('done')

      if (!itemRaw || typeof itemRaw !== 'string' || !itemRaw.trim()) {
        alert('Debes ingresar al menos un ítem.')
        return
      }
      if (!quantity || quantity < 1) {
        alert('La cantidad debe ser mayor a 0.')
        return
      }
      const category = this.categories.find(cat => cat.id === typeId)
      if (!category) {
        alert('Debes seleccionar una categoría válida.')
        return
      }

      const shopListData: ShopListInput = {
        item: itemRaw.split(',').map(i => i.trim()).filter(Boolean),
        quantity,
        type: category,
        done,
      }

      try {
        await this.onSubmit(shopListData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar el ítem de la lista de compras:', error)
        alert('Error al guardar el ítem. Por favor intente nuevamente.')
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