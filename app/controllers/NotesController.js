import { AppState } from "../AppState.js"
import { notesService } from "../services/NotesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { setHTML } from "../utils/Writer.js";

function _drawNotesList() {
  const notes = AppState.notes
  console.log('Notes List');
  let content = ''
  notes.forEach(note => content += note.notesList)
  setHTML('note-list', content)
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


  saveNotes(noteId) {
    // @ts-ignore
    let noteContent = document.getElementById('note-content').value
    console.log(noteContent);
    notesService.saveNotes(noteId)

  }
}