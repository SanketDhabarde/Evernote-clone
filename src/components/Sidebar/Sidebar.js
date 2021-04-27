import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from  './Styles';
import { Button, List } from '@material-ui/core';
import SidebarItem from '../SidebarItem/SidebarItem';

const Sidebar = ({ notes, classes, selectedNoteIndex, newNote, selectNote, deleteNote }) => {
    const [addingNote, setAddingNote] = useState(null);
    const [title, setTitle] = useState(null);
    
    const updateTitle = (text) => {
       setTitle(text);
    }

    const onBtnClickHandler = () =>{
        setTitle(null);
        setAddingNote(!addingNote);
    }

    const onNewNote = (event) => {
        event.preventDefault();
        newNote(title);
        setTitle(null);
        setAddingNote(false);
    }

    const onSelectNote = (note, index) => selectNote(note, index);

    const onDeleteNote =(note) => {
        deleteNote(note);
    }
       
    return (
        <div className={classes.sidebarContainer}>
            <Button className={classes.newNoteBtn} onClick={onBtnClickHandler}>{addingNote ? 'Cancel' : 'new Note'}</Button>
            {
                addingNote ?
                <form> 
                    <input type="text"
                    className={classes.newNoteInput}
                    placeholder="Enter note title..."
                    onKeyUp={(e) => updateTitle(e.target.value)}
                    />
                    <Button type="submit" className={classes.newNoteSubmitBtn} onClick={onNewNote}>Submit note</Button>
                </form>
                 : null
            }
            <List>
                {
                 notes && notes.map((note, index) => {
                      return(
                        <SidebarItem
                        key={index}
                        note={note}
                        index={index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={onSelectNote}
                        deleteNote={onDeleteNote}
                        ></SidebarItem>
                      )  
                    })
                }
            </List>
        </div>
    );
        
    
};

export default withStyles(Styles)(Sidebar);