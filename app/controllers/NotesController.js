import { AppState } from "../AppState.js"
import { notesService } from "../services/NotesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawNotesList() {
  const notes = AppState.notes
  let totalNotes = 0
  notes.forEach(note => totalNotes++)
  let content = ''
  notes.forEach(note => content += note.notesList)
  setHTML('note-list', content)
  setHTML('total-notes', totalNotes)
}




function _drawActiveNote() {
  const active = AppState.activeNote
  let content = ''
  // @ts-ignore
  content += active.CurrentActiveNote
  setHTML('active-note', content)
}
export class NotesController {
  constructor() {
    AppState.on('notes', _drawNotesList)
    AppState.on('activeNote', _drawActiveNote)
    _drawNotesList()
  }


  setActiveNote(noteId) {
    notesService.setActiveNote(noteId)

  }


  createNote(event) {

    try {

      event.preventDefault()
      const form = event.target
      const noteData = getFormData(form)
      console.log("[NOTES CONTROLLEr] creating note");
      notesService.createNote(noteData)
      AppState.emit('notes')
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  async removeNotes(noteId) {
    const confirm = await Pop.confirm('Would you like to delete this note?')

    if (!confirm) {
      return
    }

    notesService.removeNotes(noteId)
  }

  saveNotes(noteId) {
    // @ts-ignore
    let noteContent = document.getElementById('note-content').value

    console.log('[NOTES CONTROLLER]note content', noteContent);
    notesService.saveNotes(noteId, noteContent)
    Pop.success('Note Saved')

  }
}