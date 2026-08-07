export interface Note {
  id: number
  content: string
  important: boolean
}

const notes: Note[] = [
  { id: 1, content: "next.js utilizes React Server Components", important: true },
  { id: 2, content: "next.js is built on top of React", important: true },
  { id: 3, content: "next.js supports both static and dynamic rendering", important: false },
]

export const addNote = (content: string, important: boolean): Note => {
  const note = {
    id: Math.max(...notes.map(n => n.id), 0) + 1,
    content,
    important,
  }
  notes.push(note)
  return note
}

export default notes