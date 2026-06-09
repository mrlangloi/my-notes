import { useState } from "react"
import { useNotes } from "../contexts/NoteContext"
import type { Note } from "../types/types"


const NoteItem = ({ note }: { note: Note }) => {

    const { notes, setNotes } = useNotes()
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false)

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setNotes(notes.filter((n) => n.id !== note.id))
    }

    return (
        <div 
            className={`note-item ${isExpanded ? "expanded" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <h3>
                {isExpanded ? note.title : (
                    note.title.length > 16 ? note.title.slice(0, 16) + "..." : note.title
                )}
            </h3>
            <p className="note-body">
                {isExpanded ? note.body : (
                    note.body.length > 16 ? note.body.slice(0, 16) + "..." : note.body
                )}
            </p>
            <small>Created at: {new Date(note.createdAt).toLocaleString()}</small>

            <div className="note-item-actions">
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default NoteItem