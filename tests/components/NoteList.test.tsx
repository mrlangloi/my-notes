import { it, expect, describe, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import NoteList from '../../src/components/NoteList'
import { NoteProvider } from '../../src/contexts/NoteContext'
import { Note } from '../../src/types/types'
import userEvent from '@testing-library/user-event'

describe('NoteList component', () => {

    // clear localStorage before each test
    beforeEach(() => {
        localStorage.clear()
    })

    it('should display no notes when note list is empty', () => {
        render(
            <NoteProvider>
                <NoteList />
            </NoteProvider>
        )

        const desc = screen.getByText(/no notes yet/i)
        expect(desc).toBeInTheDocument()
    })

    it('should display notes when note list is not empty', () => {
        // add notes to localStorage
        const notes: Note[] = [
            {
                id: '1',
                title: 'test title',
                body: 'test body',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'abcd',
                body: 'ABCDEFG',
                createdAt: new Date().toISOString()
            }
        ]

        // set notes in localStorage
        localStorage.setItem('notes', JSON.stringify(notes))

        // render the component
        render(
            <NoteProvider>
                <NoteList />
            </NoteProvider>
        )

        // check that the notes are displayed
        const desc1 = screen.queryByText(/no notes yet/i)
        expect(desc1).not.toBeInTheDocument()

        const desc2 = screen.getByText(/notes can be expanded/i)
        expect(desc2).toBeInTheDocument()

        notes.forEach(note => {
            const titleElement = screen.getByText(note.title)
            const bodyElement = screen.getByText(note.body)
            expect(titleElement).toBeInTheDocument()
            expect(bodyElement).toBeInTheDocument()
        })
    })

    it('should delete a note', async () => {
        // add notes to localStorage
        const notes: Note[] = [
            {
                id: '1',
                title: 'test title',
                body: 'test body',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'abcd',
                body: 'ABCDEFG',
                createdAt: new Date().toISOString()
            }
        ]

        // set notes in localStorage
        localStorage.setItem('notes', JSON.stringify(notes))

        // render the component
        render(
            <NoteProvider>
                <NoteList />
            </NoteProvider>
        )

        // delete note 2
        // get the parent note card element of note 2
        const noteCard2 = screen.getByText(notes[1].title).closest('.note-item') as HTMLElement | null
        expect(noteCard2).not.toBeNull()
        // click the delete button within note 2
        const { getByRole } = within(noteCard2!)
        const deleteButton = getByRole('button', { name: /delete/i })
        await userEvent.click(deleteButton)

        // check that note 2 is deleted, while note 1 is still displayed
        expect(screen.getByText(notes[0].title)).toBeInTheDocument()
        expect(screen.getByText(notes[0].body)).toBeInTheDocument()
        expect(screen.queryByText(notes[1].title)).not.toBeInTheDocument()
        expect(screen.queryByText(notes[1].body)).not.toBeInTheDocument()
    })
})