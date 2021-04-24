import React from 'react';
import { removeHTMLTags } from '../../helper';
import { withStyles } from '@material-ui/core/styles';
import style from  './style';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const SidebarItem = ({note, index, classes, selectedNoteIndex, selectNote, deleteNote}) => {
    
    const onSelectNote = (note, index) => selectNote(note, index);
    
    const onDeleteNote = (note) => {
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
            deleteNote(note);
        }
    }

    return (
        <div key={index}>
            <ListItem 
            className={classes.listItem}
            selected={selectedNoteIndex === index}
            alignItems="flex-start"
            
            >
                <div className={classes.textSection} >
                    <ListItemText
                    primary={note.title}
                    secondary={removeHTMLTags(note.body.substring(0,30)+ '...')}
                    onClick={() => onSelectNote(note, index)}
                    >
                    </ListItemText>
                </div>
                <DeleteIcon onClick={() => onDeleteNote(note)} className={classes.deleteIcon}></DeleteIcon>
            </ListItem>
        </div>
    );
    
};

export default withStyles(style)(SidebarItem);