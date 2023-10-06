import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { saveState } from "../utils/Store.js"



function _save() {
  saveState('notes', AppState.notes)
}
class NotesService {
  removeNotes(noteId) {
    const notes = AppState.notes
    const noteIndex = notes.findIndex(note => note.Id == noteId)

    notes.splice(noteIndex, 1)
    _save()
    AppState.emit('notes')

  }
  setActiveNote(noteId) {
    const note = AppState.notes
    const foundNote = note.find(note => noteId == note.Id)
    AppState.activeNote = foundNote
    console.log('[NOTES SERVICE] activeNote set ', AppState.activeNote);
  }
  saveNotes(noteId, content) {
    const notes = AppState.notes
    const foundNotes = notes.find(note => note.Id == noteId)
    // @ts-ignore
    foundNotes.updateDate = new Date
    // @ts-ignore
    foundNotes.body = content
    // @ts-ignore
    console.log('[SERVICE] saveNotes ', foundNotes.body);
    // @ts-ignore
    console.log('[SERVICE] saveNotes updatedDate', foundNotes.updateDate);
    console.log(notes);

    _save()

    AppState.emit('activeNote')
  }



  createNote(noteData) {
    const newNote = new Note(noteData)
    AppState.notes.push(newNote)
    _save()
  }

}


export const notesService = new NotesService()