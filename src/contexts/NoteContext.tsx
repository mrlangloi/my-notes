import { createContext, useContext, useEffect, useState } from 'react'
import type { Note } from '../types/types'

const NoteContext = createContext<{
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
} | undefined>(undefined)

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [ notes, setNotes ] = useState<Note[]>(() => {
        // load from localStorage
        const existingNotes = localStorage.getItem("notes")
        return existingNotes ? JSON.parse(existingNotes) : []
    })

    useEffect(() => {
        // save to localStorage whenever notes change
        console.log("Saving notes to localStorage:", notes)
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => {
    const context = useContext(NoteContext)

    if (!context) {
        throw new Error("useNotes must be used within a NoteProvider")
    }

    return context
}