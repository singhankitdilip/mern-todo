import { useEffect, useState } from 'react'
import Todo from './Todo';

function App() {
  const [todos, setTodo] = useState([])
  const [content, setcontent] = useState("")
  useEffect(() => {
    async function getToDo() {
      const res = await fetch("api/todos");
      const todos = await res.json();
      setTodo(todos);
    }
    getToDo();

  }, [])

  const createNewTodo = async(e)=>{
    e.preventDefault();
    if(content.length>3){
    let res = await fetch("api/todos",{
      method:"post",
      body:JSON.stringify({todo:content}),
      headers:{
        "Content-Type":"application/json"
      },
    })
    const newTodo = await res.json()
    setcontent("");
    setTodo([newTodo,...todos])
  }}

  return (
    <div className='mainContainer'>
     <h1>Simple Todo</h1>

     <form onSubmit={createNewTodo}>
      <input type="text" value={content}
      onChange={(e)=>setcontent(e.target.value)} 
      placeholder='Enter new todo ...'
      required/>
      <button type='submit'>Create Todo</button>
     </form>
      <div className="todoContainer">
      {/* {todos.length > 0 &&
  todos.map((todo, index) => (
   <Todo key={todos._id} todo={todo} setTodo={setTodo}/>
  ))
} */}
{todos.length > 0 &&
    todos.map((todo, index) => (
        <Todo key={todo._id} todo={todo} setTodo={setTodo}/>
    ))
}

      </div>
    </div>
  )
}

export default App
