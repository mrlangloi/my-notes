import { useNotes } from "../contexts/NoteContext"
import NoteItem from "./NoteItem"

const NoteList = () => {
    const { notes } = useNotes()

    if (notes.length === 0) {
        return (
            <div className="note-list">
                <h2>Note List</h2>
                <small>
                    No notes yet. Create one using the note editor!
                </small>
            </div>
        )
    }

    return (
        <div className="note-list">
            <h2>Note List</h2>
            <small>
                Notes can be expanded by clicking on them.
            </small>
            {notes.map((note) => (
                <NoteItem key={note.id} note={note} />
            ))}
        </div>
    )
}

export default NoteList