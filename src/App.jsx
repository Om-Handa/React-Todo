import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleInput = (e) => {
    settodo(e.target.value)
  }

  const handleClick = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(todo => {
      return id !== todo.id
    })
    settodos(newtodos)
  }

  const handleEdit = (e, id) => {
    let newtodo = todos.find(todo => {
      return id === todo.id
    })
    settodo(newtodo.todo)
    settodos(todos.filter(todo => {
      return id !== todo.id
    }))
  }

  const checkChange = (e, id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: e.target.checked };
      }
      return todo;
    });
    settodos(updatedTodos);
  };

  const handleFinished = () => {
    setshowfinished(!showfinished)
  }



  return (
    <>
      <Navbar />
      <div className=" mx-5 md:mx-0 flex justify-center items-center my-10">
        <div className='container md:w-1/2 w-full '>
          <div className="bg-[#0B3948] min-h-24 flex flex-col items-center space-y-6 p-2">
            <p className='text-4xl font-bold text-white'>Add your Todo</p>
            <div className="input w-full flex space-x-4 justify-center items-center">
              <input type="text" className='rounded-lg w-3/4 p-1 h-9' onKeyDown={(e) => { if (e.key === 'Enter') {handleClick()}}} value={todo} onChange={handleInput} placeholder='Enter Your Todo' />
              <button disabled={todo.length === 0} className='bg-red-900 flex justify-center items-center' onClick={handleClick}>
                <span className="material-icons mx-2 my-1 font-bold text-3xl">add</span>
              </button>
            </div>
          </div>
          <div className="todo bg-[#416165] min-h-96 md:p-5 p-3 flex flex-col items-center space-y-3">
            <div className=' self-start flex my-2'>
              <input type="checkbox" className='w-12 h-7 accent-red-900' checked={!showfinished} onChange={handleFinished} />
              <h1 className='text-xl font-bold text-white'>Show Finished Todos?</h1>
            </div>
            {todos.length === 0 ? (<p className="text-white text-2xl font-bold mt-5">NO TODOS TO SHOW</p>) :
              todos.map(items => {
                return (!showfinished || !items.isCompleted) && <div key={items.id} className="todos border-4 p-3 border-slate-950 flex items-center w-full min-h-9 space-x-2">
                  <input type="checkbox" checked={items.isCompleted} className='w-16 h-7 accent-red-900' onChange={(e) => { checkChange(e, items.id) }} />
                  <div className={`w-4/5 text-center text-2xl font-bold ${items.isCompleted ? 'line-through' : ''}`}>{items.todo}</div>
                  <button onClick={(e) => { handleEdit(e, items.id) }} className="edit bg-red-900 max-h-9">
                    <span className="material-icons p-2 ">edit</span>
                  </button>
                  <button onClick={(e) => { handleDelete(e, items.id) }} className="delete bg-red-900 max-h-9">
                    <span className="material-icons p-2 ">delete</span>
                  </button>
                </div>
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
