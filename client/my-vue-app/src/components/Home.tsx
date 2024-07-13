import React, { useEffect, useState } from 'react';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [newNoteContent, setNewNoteContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    const addNote = (content: string) => {
        fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
        .then(response => response.json())
        .then(newNote => {
            setNotes([...notes, newNote]);
            setNewNoteContent('');
        })
        .catch(error => console.error('Error adding note:', error));
    };

    const deleteNote = (id: number) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setNotes(notes.filter(note => note.id !== id));
            } else {
                console.error('Failed to delete note');
            }
        })
        .catch(error => console.error('Error deleting note:', error));
    };

    const generateImage = (id: number) => {
        fetch(`http://localhost:3000/notes/${id}/image`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(updatedNote => {
            setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
        })
        .catch(error => console.error('Error generating image:', error));
    };

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (newNoteContent.trim() !== '') {
            addNote(newNoteContent);
        }
    };
    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleAddNote}>
                <textarea
                    value={newNoteContent}
                    onChange={e => setNewNoteContent(e.target.value)}
                    placeholder="Add a new note"
                />
                <br />
                <button type="submit">Add Note</button>
            </form>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <a href={`/note/${note.id}`}>{note.content}</a>
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                        {note.imageUrl && (
                            <div>
                                <img src={note.imageUrl} alt="Unsplash image similar to node " />
                                <p>
                                    Photo by <a href={note.imageAuthorLink}>{note.imageAuthor}</a>
                                </p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
6