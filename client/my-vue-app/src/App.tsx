import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import EditNote from './components/EditNote';
import { useQuery, gql } from "@apollo/client";
   
  const GET_NOTES = gql`
    query GetNotes {
      notes {
        id
        content
        imageUrl
        imageAuthor
        imageAuthorLink
      }
    }
  `;

function App() {
    const { loading, error, data } = useQuery(GET_NOTES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <div>
        {data.notes.map((note) => (
          <div key={note.id}>
            <h3>{note.content}</h3>
            {note.imageUrl && <img src={note.imageUrl} alt={note.content} />}
            <p>Author: <a href={note.imageAuthorLink}>{note.imageAuthor}</a></p>
          </div>
        ))}
      </div>
    );
  
}

export default App;
