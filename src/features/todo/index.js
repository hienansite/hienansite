import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTodo,
  selectList,
  deletedTodo,
  updateTodo,
  selectSync,
  syncData
} from './slice';
import './style.css';

function TodDoList() {
  const list = useSelector(selectList);
  const sync = useSelector(selectSync);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    update: false,
    updateData:{
      id: 0,
      value: ""
    }
  });

  const inputHandle = (e) => {
    setState({...state, title: e.target.value})
  }

  const createTodoHandle = () => {
    if (state.title === '') {} //alert("You must write something!")
    else{
      dispatch(createTodo(state.title))
      setState({...state, title: ""})
    }
  }
  // syncData

  if(sync){
    setTimeout(() => {
      dispatch(syncData())
    }, 100);
  }

  return sync ? <h1>Loading...</h1>
  :<>
    <div id="myDIV" className="header">
      <h2 style={{ margin: 5 }}>My To Do List</h2>
      <input type="text" ref={inputRef} value={state.title} onKeyUp={(e) => enterHandle(e)} onChange={(e)=>inputHandle(e)} id="myInput" placeholder="Title..." />
      {
        state.update ? 
          <span onClick={() => updateTodoHandle()} className="addBtn">Update</span>
          : <span onClick={() => createTodoHandle()} className="addBtn">Add</span>
      }
    </div>
    <ul id="myUL">
      { list.map(data => <Li {...data} />) }
    </ul>
  </>;

  function Li(prop){
    return <li onClick={e=>handleEdit(e,prop)}> {prop.value}<CloseRow {...prop} /> </li>
  }

  function CloseRow(prop) {
    return <span className="close" onClick={() => handleRemove(prop.id)}>×</span>
  }

  function enterHandle(e){
    if(e.code === "Enter" || e.code === "NumpadEnter"){
      state.update ? updateTodoHandle() : createTodoHandle()
    }
  }

  function handleRemove(id){
    dispatch(deletedTodo(id))
  }

  function updateTodoHandle(){
    if(state.updateData.id !== 0 && state.title !== "") {
      dispatch(updateTodo({...state.updateData, value: state.title}))
    }
    setState({
      ...state, 
      update: false,
      title: ""
    })
  }

  function handleEdit(e,data){
    if (e.currentTarget !== e.target) return
    setState({
      ...state, 
      update: true,
      title: data.value,
      updateData: data
    })
    inputRef.current.focus()
  }
}


export { TodDoList };
