import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import Styles from  './Styles';
import { Button, List } from '@material-ui/core';
import SidebarItem from '../SidebarItem/SidebarItem';

class Sidebar extends Component {
    state={
        addingNote: false,
        text: null
    }
    render(){

        const { notes, classes, selectedNoteIndex } = this.props;
       
            return (
                <div className={classes.sidebarContainer}>
                    <Button className={classes.newNoteBtn} onClick={this.onBtnClickHandler}>{this.state.addingNote ? 'Cancel' : 'new Note'}</Button>
                    {
                        this.state.addingNote ?
                        <div> 
                            <input type="text"
                            className={classes.newNoteInput}
                            placeholder="Enter note title..."
                            onKeyUp={(e) => this.updateTitle(e.target.value)}
                            />
                            <Button className={classes.newNoteSubmitBtn} onClick={this.submitNote}>Submit note</Button>
                        </div>
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
                                selectNote={this.selectNote}
                                deleteNote={this.deleteNote}
                                ></SidebarItem>
                              )  
                            })
                        }
                    </List>
                </div>
            );
        

        
    }

    updateTitle = (text) => {
        this.setState({text:text});
    }

    onBtnClickHandler = () =>{
        this.setState({text: null, addingNote: !this.state.addingNote})
    }

    submitNote = () => {
        console.log(this.state);
    }
    selectNote = (note, index) => this.props.selectNote(note, index);

    deleteNote =() => {
        console.log("note deleted");
    }
    
};

export default withStyles(Styles)(Sidebar);