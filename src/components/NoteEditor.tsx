import { useState } from "react"
import { useNotes } from "../contexts/NoteContext"
import type { Note } from "../types/types"

const NoteEditor = () => {
    const { notes, setNotes } = useNotes()

    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")

    const generateID = (): string => Date.now().toString(36) + Math.random().toString(36).slice(2)

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (title.trim() === "" || body.trim() === "") {
            alert("Please fill in both the title and body fields.")
            return
        }

        // add to list of notes
        const newNote: Note = {
            //id: crypto.randomUUID(), // this one works for https
            id: generateID(), // this one works for http
            title,
            body,
            createdAt: new Date().toISOString(),
        }
        setNotes([...notes, newNote])
        console.log(notes)

        // reset form
        setTitle("")
        setBody("")
    }

    return (
            <div className="note-editor">
                <div className="note-editor-form">
                    <h2>Note Editor</h2>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />

                        <label htmlFor="body">Body</label>
                        <textarea id="body" name="body" value={body} onChange={handleBodyChange} />

                        <button type="submit">
                            Save Note
                        </button>
                    </form>
                </div>
                <small>
                    A simple note-taking app <br />
                    Created by Ricky Cheung
                </small>
            </div>
    )
}

export default NoteEditor