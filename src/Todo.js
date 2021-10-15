import {List, ListItem, ListItemText, Modal, Button, FormControl } from '@material-ui/core'
import React, {useState} from 'react'
import './Todo.css'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Todo = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')

    const updateToDo = () => {
        db.collection('todos').doc(props.todo.id).set({
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge:true})

        setOpen(false)
    }

    const updateStatus = () => {
        db.collection('todos').doc(props.todo.id).set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'done'
        }, {merge:true})
    }

    return (
        <>
            <Modal
                
                open={open}
                onClose={e => setOpen(false)}
                >
                    <div className={classes.paper}>
                        <FormControl>
                            <input placeholder={props.todo.text} onChange={event => setInput(event.target.value)}/>

                            <Button type="submit"  onClick={updateToDo} variant="contained" color="primary">
                            Update TODO
                            </Button>
                        </FormControl>
                    </div>
                
            </Modal>
            <List className="todo__list">
                <ListItem key={props.todo.id}>
                    <input type="checkbox" onClick={updateStatus} id={props.todo.id} name="todo" value={props.todo.text} disabled={props.todo.status === 'done' ? true : false}/>
                    <label htmlFor={props.todo.id} style={props.todo.status === 'done' ? {textDecoration:'line-through'} : {}}> 
                        <ListItemText onClick={e => setOpen(true)} primary={props.todo.text}/>
                    </label>
                </ListItem>
                <EditIcon onClick={e => setOpen(true)} />
                <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
            </List>
        </>
    )
}

export default Todo
