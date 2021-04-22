import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from  './Styles';
import { Button, List } from '@material-ui/core';
import SidebarItem from '../SidebarItem/SidebarItem';

class Sidebar extends Component {
    state={
        addingNote: false,
        title: null
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
                            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>Submit note</Button>
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
        this.setState({title:text});
    }

    onBtnClickHandler = () =>{
        this.setState({title: null, addingNote: !this.state.addingNote})
    }

    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({ title: null, addingNote: false });
    }
    selectNote = (note, index) => this.props.selectNote(note, index);

    deleteNote =(note) => {
        this.props.deleteNote(note);
    }
    
};

export default withStyles(Styles)(Sidebar);