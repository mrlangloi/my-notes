import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteItem from '../../src/components/NoteItem'
import { NoteProvider } from '../../src/contexts/NoteContext'
import { Note } from '../../src/types/types'

describe('NoteItem component', () => {

    // helper function to render the NoteItem component with context
    const renderNoteItem = (note: Note) => {
        render(
            <NoteProvider>
                <NoteItem note={note} />
            </NoteProvider>
         )
        
        return {
            titleElement: screen.getByText(note.title),
            bodyElement: screen.getByText(note.body),
            deleteButton: screen.getByRole('button', { name: /delete/i })
        }
    }

    it('should render the note title and body correctly', () => {
        const note: Note = {
            id: '1',
            title: 'Test Note',
            body: 'Test note',
            createdAt: new Date().toISOString()
        }

        const { titleElement, bodyElement, deleteButton } = renderNoteItem(note)

        expect(titleElement).toBeInTheDocument()
        expect(bodyElement).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument()
        expect(deleteButton).toHaveTextContent(/delete/i)
    })
})