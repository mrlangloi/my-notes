import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteEditor from '../../src/components/NoteEditor'
import { NoteProvider } from '../../src/contexts/NoteContext'

describe('NoteEditor component', () => {

    it('should render the note editor', () => {
        render(
            <NoteProvider>
                <NoteEditor />
            </NoteProvider>
        )

        const heading = screen.getByRole('heading')
        const titleInput = screen.getByLabelText(/title/i)
        const bodyTextarea = screen.getByLabelText(/body/i)
        const submitButton = screen.getByRole('button')

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