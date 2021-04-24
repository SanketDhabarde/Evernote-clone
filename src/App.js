import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Editor from './components/Editor/Editor';
import { db } from './firebase';
import firebase from 'firebase/app';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  
  useEffect(() => {
    db.collection('notes').orderBy('timestamp', 'desc').onSnapshot(snap => {
      const notes = snap.docs.map( doc => {
        const data = doc.data();
          data['id'] = doc.id;
          return data;
      })
      setNotes(notes);
    })
  }, []);

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  };

  

 const newNote = async (title) => {
    const note={
      title: title,
      body: ''
    }

    const newNoteDB = await db
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    const newNoteId = newNoteDB.id;
    await setNotes([...notes, note]);

    const indexOfNewNote = notes.indexOf(notes.filter(note => note.id === newNoteId)[0]);

    setSelectedNote(notes[indexOfNewNote]);
    setSelectedNoteIndex(indexOfNewNote);
  }

  const deleteNote = async (note) => {
    const noteIndex= notes.indexOf(note);
    await setNotes(notes.filter(noteInState => noteInState !== note))

    if(selectedNoteIndex === noteIndex){
      setSelectedNote(null);
      setSelectedNoteIndex(null);
    }else{
      if(notes.length >= 1){
        if(selectedNoteIndex < noteIndex){
          selectNote(notes[selectedNoteIndex], selectedNoteIndex)
        }else{
          selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        } 
      }else{
        setSelectedNote(null);
        setSelectedNoteIndex(null);
      }
       
    }

    db.collection('notes').doc(note.id).delete();
  }

    return (
      <div className="app-container">
        <Sidebar 
        notes={notes} 
        selectedNoteIndex={selectedNoteIndex}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
        ></Sidebar>
        {
          selectedNote && 
          <Editor 
          selectedNoteIndex={selectedNoteIndex} 
          selectedNote={selectedNote}
          notes={notes}
          ></Editor>
        }
        
      </div>
    );
  
}

export default App;
