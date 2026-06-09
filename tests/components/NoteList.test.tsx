import { it, expect, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteList from '../../src/components/NoteList'
import { NoteProvider } from '../../src/contexts/NoteContext'
import { Note } from '../../src/types/types'

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

        const note1Title = screen.getByText(notes[0].title)
        const note1Body = screen.getByText(notes[0].body)
        expect(note1Title).toBeInTheDocument()
        expect(note1Body).toBeInTheDocument()

        const note2Title = screen.getByText(notes[1].title)
        const note2Body = screen.getByText(notes[1].body)
        expect(note2Title).toBeInTheDocument()
        expect(note2Body).toBeInTheDocument()
    })
})