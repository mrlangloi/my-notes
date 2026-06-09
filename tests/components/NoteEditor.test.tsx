import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteEditor from '../../src/components/NoteEditor'
import { NoteProvider } from '../../src/contexts/NoteContext'

describe('NoteEditor component', () => {

    // helper function to render the NoteEditor component with context
    const renderNoteEditor = () => {
        render(
            <NoteProvider>
                <NoteEditor />
            </NoteProvider>
        )

        return {
            heading: screen.getByRole('heading'),
            titleInput: screen.getByLabelText(/title/i),
            bodyTextarea: screen.getByLabelText(/body/i),
            submitButton: screen.getByRole('button')
        }
    }

    it('should render the note editor', () => {
        const { heading, titleInput, bodyTextarea, submitButton } = renderNoteEditor()

        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/note editor/i)

        expect(titleInput).toBeInTheDocument()
        expect(titleInput).toHaveAttribute('type', 'text')

        expect(bodyTextarea).toBeInTheDocument()
        expect(bodyTextarea.tagName).toBe('TEXTAREA')

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toHaveTextContent(/save note/i)
    })
})