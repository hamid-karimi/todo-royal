import React, {useEffect, useState} from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';


const App = () => {

  useEffect(() => {
    document.title = "TO-DO App"
 }, []);

  const [todos, setTodos] = useState(['']);
  const [input, setInput] = useState('');

  useEffect(() => {
   db.collection('todos').orderBy('priority', 'asc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc =>({id: doc.id, text: doc.data().text, status: doc.data().status, date: doc.data().timestamp})))
   })
  }, [input])

  const addToDo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      priority: 0,
      status: 'pending'
    })

    setTodos([...todos, input]);
    setInput('');
  }
  return (
    <div className="app">
      <h1>TODO List</h1>
      <form>

      <FormControl>
        <InputLabel>Write Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>

        <Button disabled={!input} type="submit" onClick={addToDo} variant="contained" color="primary">
          TODO
        </Button>
      </FormControl>
        
      </form>
      <ul>
        {todos.map(
          todo => (
            <Todo todo={todo} />
          )

        )}
      </ul>
    </div>
  );
}

export default App;
