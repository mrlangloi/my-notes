import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteItem from '../../src/components/NoteItem'
import { NoteProvider } from '../../src/contexts/NoteContext'
import { Note } from '../../src/types/types'

describe('NoteItem component', () => {
    it('should render the note title and body correctly', () => {
        const note: Note = {
            id: '1',
            title: 'Test Note',
            body: 'Test note',
            createdAt: new Date().toISOString()
        }

        render(
            <NoteProvider>
                <NoteItem note={note} />
            </NoteProvider>
        )

        const titleElement = screen.getByText(note.title)
        expect(titleElement).toBeInTheDocument()

        const bodyElement = screen.getByText(note.body)
        expect(bodyElement).toBeInTheDocument()

        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveTextContent(/delete/i)
    })
})