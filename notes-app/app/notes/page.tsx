import notes from '@/app/services/notes'

const Notes = () => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content} {note.important && <strong>(important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Notes