import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditNote = () => {
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState({ id: 0, content: '', imageUrl: '', imageAuthor: '', imageAuthorLink: '' });

    useEffect(() => {
        fetch(`http://localhost:3000/notes/${id}`)
            .then(response => response.json())
            .then(data => setNote(data))
            .catch(error => console.error('Error fetching note:', error));
    }, [id]);

    const handleEditNote = () => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: note.content }),
        })
        .then(response => {
            if (response.ok) {
                // Handle successful edit
            } else {
                console.error('Failed to edit note');
            }
        })
        .catch(error => console.error('Error editing note:', error));
    };

    const generateImage = () => {
        // Make a request to backend to fetch image details and update note
        fetch(`http://localhost:3000/notes/${id}/image`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: note.content }),
        })
        .then(response => response.json())
        .then(data => {
            setNote({
                ...note,
                imageUrl: data.imageUrl,
                imageAuthor: data.imageAuthor,
                imageAuthorLink: data.imageAuthorLink,
            });
        })
        .catch(error => console.error('Error generating image:', error));
    };

    return (
        <div>
            <h2>Edit Note</h2>
            <form>
                <label>
                    Content:
                    <textarea
                        value={note.content}
                        onChange={e => setNote({ ...note, content: e.target.value })}
                    />
                </label>
                <br />
                <button type="button" onClick={handleEditNote}>Save</button>
                <button type="button" onClick={generateImage}>Generate Image</button>
            </form>
            {note.imageUrl && (
                <div>
                    <img src={note.imageUrl} alt="Unsplash" style={{ maxWidth: '100%' }} />
                    <p>Photo by <a href={note.imageAuthorLink}>{note.imageAuthor}</a> on Unsplash</p>
                </div>
            )}
        </div>
    );
};

export default EditNote;
