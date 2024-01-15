import { createSlice } from '@reduxjs/toolkit'

import { v4 as uuidv4 } from 'uuid';

function saveTodo(list){
  localStorage.setItem('todolist', JSON.stringify(list))
}
function getTodoList(){
  let list = localStorage.getItem('todolist') 
  if (!list) list = []
  else {
    list = JSON.parse(list)
  }
  return list
}
export const slice = createSlice({
  name: 'todo',
  initialState: {
    value: [],
    list: [],
    sync: true
  },
  reducers: {
    createTodo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const id = uuidv4();
      state = { ...state, list: [...state.list, {key: id, id, value: action.payload}]}
      saveTodo(state.list)
      return state
    },
    deletedTodo: (state, action) => {
      let list = []
      state.list.map(row => {
        if(action.payload !== row.key){
          list = [...list, row]
        }
        return 0;
      })
      state = { ...state, list}
      saveTodo(state.list)
      return state
    },
    updateTodo: (state, action) => {
      let list = []
      state.list.map(row => {
        if(action.payload.id === row.key){
          list = [...list, {...row, value: action.payload.value}]
        }else{
          list = [...list, row]
        }
        return 0;
      })
      state = state = { ...state, list}
      saveTodo(state.list)
      return state
    },
    syncData: (state) => {
      const list = getTodoList()
      state = {
         ...state, 
         sync: false,
         list: [ ...list ]
        }
      return state
    }
  },
})

// export const { increment, decrement, incrementByAmount } = slice.actions
export const { createTodo, deletedTodo, updateTodo, syncData } = slice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectList = (state) => state.todo.list
export const selectSync = (state) => state.todo.sync

export default slice.reducer
