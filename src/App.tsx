import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import './App.css'

function App() {
    return (
        <section id="center">
            <NoteList />
            <NoteEditor />
        </section>
    )
}

export default App
