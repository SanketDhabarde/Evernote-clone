import React, { Component } from "react";
import ReactQuill from 'react-quill';
import debounce from '../../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import Style from './Style';

class Editor extends Component{
    state = {
        text: '',
        title: '',
        id: ''
    }

    componentDidMount = () => {
        this.setState({
          text: this.props.selectedNote.body,
          title: this.props.selectedNote.title,
          id: this.props.selectedNote.id
        });
    }

    componentDidUpdate = () => {
        if(this.state.id !== this.props.selectedNote.id){
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
              });
        }
    }

    update = debounce(() => {
        this.props.updateNote(this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
    }, 1500)

    updateBody = async (val) =>{
        await this.setState({text: val});
        this.update();
    }

    titleChange = async (title) => {
       await this.setState({title: title});
       this.update();
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                className={classes.titleInput}
                value={this.state.title}
                onChange={(e) => this.titleChange(e.target.value)}>
                </input>
                <ReactQuill
                value={this.state.text}
                onChange={this.updateBody}
                ></ReactQuill>
            </div>
        )
    
    }
}   

export default withStyles(Style)(Editor);