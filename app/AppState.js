import { Note } from "./models/Note.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/IsValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])


  /**
    * @type {import("./models/Note.js").Note[]}
    */
  notes = []
  /**
    * @type {import("./models/Note.js").Note|null|undefined}
    */
  activeNote = null



  // NOTE Used to load initial data
  init() {
    this.notes = loadState('notes', [Note])
    console.log('[APPSTATE] loadState', this.notes);
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
