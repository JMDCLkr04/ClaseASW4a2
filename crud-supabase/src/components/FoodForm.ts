import type { Comida, ComidaInput } from "../models/comida"

export class FoodForm {
  private form: HTMLFormElement
  private onSubmit: (data: ComidaInput) => Promise<void>
  private onCancel?: () => void
  private comida?: Comida

  constructor(
    container: HTMLElement,
    onSubmit: (data: ComidaInput) => Promise<void>,
    onCancel?: () => void,
    comida?: Comida
  ) {
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.comida = comida
    this.form = this.createForm()
    container.innerHTML = ''
    container.appendChild(this.form)
    this.setupEventListeners()
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form')
    form.id = 'foodForm'
    form.innerHTML = `
      <h2>${this.comida ? 'Editar' : 'Nueva'} Comida</h2>
      <div class="form-group">
        <input type="text" id="name" name="name" placeholder="Nombre" required 
          value="${this.comida?.name || ''}">
      </div>
      <div class="form-group">
        <input type="text" id="flavor" name="flavor" placeholder="Sabor" required
          value="${this.comida?.flavor || ''}">
      </div>
      <div class="form-group">
        <input type="text" id="unity" name="unity" placeholder="Unidad (ej: gramos, porción)" required
          value="${this.comida?.unity || ''}">
      </div>
      <div class="form-group">
        <input type="number" id="preparation_time" name="preparation_time" placeholder="Tiempo de preparación (min)" required min="1"
          value="${this.comida?.preparation_time || ''}">
      </div>
      <div class="form-group">
        <input type="number" id="calories" name="calories" placeholder="Calorías" min="0"
          value="${this.comida?.calories || ''}">
      </div>
      <div class="form-group">
        <input type="date" id="created_at" name="created_at" required
          value="${this.comida?.created_at || ''}">
      </div>
      <!-- La categoría debe seleccionarse aparte o gestionarse en otro campo -->
      <button type="submit">${this.comida ? 'Actualizar' : 'Crear'}</button>
      ${this.comida ? '<button type="button" id="cancelEdit">Cancelar</button>' : ''}
    `
    return form
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(this.form)

      const comidaData: ComidaInput = {
        name: formData.get('name') as string,
        flavor: formData.get('flavor') as string,
        unity: formData.get('unity') as string,
        preparation_time: Number(formData.get('preparation_time')),
        calories: formData.get('calories') ? Number(formData.get('calories')) : 0,
        created_at: formData.get('created_at') as string,
      }

      try {
        await this.onSubmit(comidaData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar la comida:', error)
        alert('Error al guardar la comida. Por favor intente nuevamente.')
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