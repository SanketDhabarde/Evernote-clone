import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Editor from './components/Editor/Editor';
import { db } from './firebase';
import firebase from 'firebase/app';

class App extends Component {
  state={
    notes: null,
    selectedNoteIndex: null,
    selectedNote: null
  }

  componentDidMount = () => {
    db.collection('notes').onSnapshot(snap => {
      const notes = snap.docs.map( doc => {
        const data = doc.data();
          data['id'] = doc.id;
          return data;
      })
      this.setState({notes: notes});
    })
  }

  render(){
    return (
      <div className="app-container">
        <Sidebar 
        notes={this.state.notes} 
        selectedNoteIndex={this.state.selectedNoteIndex}
        selectNote={this.selectNote}
        deleteNote={this.deleteNote}
        newNote={this.newNote}
        ></Sidebar>
        {
          this.state.selectedNote && 
          <Editor 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          selectedNote={this.state.selectedNote}
          notes={this.state.notes}
          updateNote={this.updateNote}></Editor>
        }
        
      </div>
    );
  }
  
  selectNote = (note, index) => this.setState({selectedNote: note, selectedNoteIndex: index});

  updateNote = (id, obj) => {
    db.collection('notes').doc(id).update({
      title: obj.title,
      body: obj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  newNote = async (title) => {
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
    await this.setState({notes: [...this.state.notes, note]});
    const indexOfNewNote = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newNoteId)[0]);
    this.setState({
      selectedNote: this.state.notes[indexOfNewNote],
      selectedNoteIndex: indexOfNewNote
    })
  }

  deleteNote = async (note) => {
    const noteIndex= this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(noteInState => noteInState !== note)})

    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({selectedNote: null, selectedNoteIndex: null});
    }else{
      if(this.state.notes.length > 1){
        if(this.state.selectedNoteIndex < noteIndex){
          this.selectNote(this.state.notes[this.state.selectedNoteIndex], this.state.selectedNoteIndex)
        }else{
          this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
        } 
      }else{
        this.setState({selectedNote: null, selectedNoteIndex: null});
      }
       
    }

    db.collection('notes').doc(note.id).delete();
  }


  
}

export default App;
