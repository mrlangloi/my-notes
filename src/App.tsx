import './App.css'
import NoteEditor from './components/NoteEditor'
import NoteList from './components/NoteList'
import { NoteProvider } from './contexts/NoteContext'

function App() {
    return (
        <div className="container">
            <NoteProvider>
                <section id="center">
                    <NoteEditor />
                    <NoteList />
                </section>
            </NoteProvider>
        </div>
    )
}

export default App
