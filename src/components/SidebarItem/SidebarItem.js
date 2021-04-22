import React, { Component } from 'react';
import { removeHTMLTags } from '../../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import style from  './style';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class SidebarItem extends Component {
    render(){

        const {note, index, classes, selectedNoteIndex} = this.props;

        return (
            <div key={index}>
                <ListItem 
                className={classes.listItem}
                selected={selectedNoteIndex === index}
                alignItems="flex-start"
                >
                    <div className={classes.textSection} onClick={() => this.selectNote(note, index)}>
                        <ListItemText
                        primary={note.title}
                        secondary={removeHTMLTags(note.body.substring(0,30)+ '...')}
                        >
                        </ListItemText>
                    </div>
                    <DeleteIcon onClick={() => this.deleteNote(note)} className={classes.deleteIcon}></DeleteIcon>
                </ListItem>
            </div>
        );
    }

    selectNote = (note, index) => this.props.selectNote(note, index);
    
    deleteNote = (note) => {
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
            this.props.deleteNote(note);
        }
    }
};

export default withStyles(style)(SidebarItem);