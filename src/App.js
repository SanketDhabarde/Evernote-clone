import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Editor from './components/Editor/Editor';
import { db } from './firebase';
import firebase from 'firebase';

class App extends Component {
  state={
    notes: null,
    selectedNoteIndex: null,
    selectedNote: null
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
}

export default App;
