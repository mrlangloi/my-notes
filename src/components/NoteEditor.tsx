import { useFormStatus } from "react-dom"

const NoteEditor = () => {
    const { pending } = useFormStatus()

    return (
        <div>
            <h2>Note Editor</h2>

            <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />

                <label htmlFor="body">Body</label>
                <textarea id="body" name="body" />

                {/* https://react.dev/reference/react-dom/components/form#display-a-pending-state-during-form-submission */}
                <button type="submit" disabled={pending}>
                    {pending ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    )
}

export default NoteEditor