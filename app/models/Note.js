import { generateId } from "../utils/GenerateId.js"



export class Note {
  constructor(data) {
    this.Id = generateId(),
      this.name = data.name
    this.body = data.body || 'Notes'
    this.color = data.color
    this.initialDate = data.initialDate ? new Date(data.initialDate) : new Date()
    this.updateDate = data.updateDate ? new Date(data.updateDate) : new Date()
  }

  get notesList() {
    return `<p class="fs-5" role="button" onclick="app.NotesController.setActiveNote('${this.Id}')">${this.name} <i class="mdi mdi-pen" style="color: ${this.color};"></i></p>`
  }

  get CurrentActiveNote() {
    return `
      <div class="col-10">
        <section class="row border border-3 border-light rounded p-3">
          <div class="col-5">
            <p class="fs-3 fw-bolder">${this.name} <i class="mdi mdi-pen" style="color: ${this.color};"></i></p>
            <p class="fs-5">Created On: ${this.initialDate.toLocaleString()}</p>
            <p class="fs-5">Edited On: ${this.updateDate.toLocaleString()}</p>
          </div>
          <div class="col-5">
            <textarea onblur="app.NotesController.saveNotes('${this.Id}')" name="body" id="note-content" cols="90" rows="30" >${this.body}</textarea>
          </div>
          <div class="col-2">
            <button onclick="app.NotesController.removeNotes('${this.Id}')" class="btn btn-danger rounded btn-margin"><i class="mdi mdi-delete"></i></button
          </div>
        </section>
      </div>
  </div>`
  }





}


