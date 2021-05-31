import React, { useState, useEffect} from "react";
import ReactQuill from 'react-quill';
import { withStyles } from '@material-ui/core/styles';
import Style from './Style';
import { db } from '../../firebase';
import EditIcon from '@material-ui/icons/Edit';


const Editor = ({classes, selectedNote}) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    
    useEffect(() => {
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
    },[selectedNote.id, selectedNote.title, selectedNote.body])
    
    // use debaunce effect to update the body
    useEffect(() => {
      const timer = setTimeout(() => {
        db.collection('notes')
        .doc(selectedNote.id)
        .update({
          body: text,
        });
      }, 1500);

      return () => clearTimeout(timer);

    }, [selectedNote.id, text]);

    useEffect(() => {
      const timer = setTimeout(() => {

        db.collection('notes')
        .doc(selectedNote.id)
        .update({
          title: title,
        });

      }, 1500);

      return () => clearTimeout(timer);

    }, [selectedNote.id, title])
    

    const updateBody = async (val) =>{
        await setText(val);
    }

    const titleChange = async (title) => {
       await setTitle(title);
    }

        return(
            <div className={classes.editorContainer}>
                <div className={classes.editorHeader}>
                  <EditIcon className={classes.editIcon}></EditIcon>
                    <input
                    className={classes.titleInput}
                    value={title}
                    onChange={(e) => titleChange(e.target.value)}>
                    </input>
                </div>
                <ReactQuill
                value={text}
                onChange={updateBody}
                ></ReactQuill>
            </div>
        )
    
    
}   

export default withStyles(Style)(Editor);