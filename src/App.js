import {useEffect, useState  } from "react";
import axios from "axios";


const URL = "http://localhost:3001/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task,setTask] = useState("");
  const[editTask,setEditTask] = useState(null);
  const[editDescription,setEditDescription] = useState("");

  useEffect(() => {
    axios.get(URL).then((response) => {
      setTasks(response.data);
    }).catch((error) => {
      alert(error.response.data.error);
    });
  }, []);

function save() {
  const json = JSON.stringify({description: task});
  axios.post(URL + "new", json, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    const addedObject = JSON.parse(json);
    addedObject.id = response.data.id;
    setTasks(tasks =>[...tasks, addedObject]);
    setTask("");
  }).catch((error) => {
    alert(error.response.data.error);
  });
  
}

  const remove = (id) => {
    axios.delete(`${URL}delete/${id}`).then(() => {
      const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch((error) => {
      alert(error.response.data.error);
    });
  };

  function setEditableRow(task) {
    setEditTask(task);
    setEditDescription(task.description);
  }

  function edit(){
    const json = JSON.stringify({id: editTask.id, description: editDescription});
    axios.put(URL + "edit", json, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      const editedObject = JSON.parse(json);
      const tempArray = [...tasks];
      const index = tempArray.findIndex(task=>{return editTask.id})
      if(index !== -1)
        tempArray[index].description = editDescription;
        setTasks(tempArray);
        
        setEditTask(null);
        setEditDescription("");
    }).catch((error) => {
      alert(error.response.data.error);
    });
  }



  return (
    <div style={{margin:'20px'}}>
     <h3>My tasks</h3>
     <form >
      <label>Add new</label>
        <button type="button" onClick={save}>Save</button>
     </form>
     <ol>
        {tasks.map(task => (
          <li key={task.id}>
            {editTask?.id === task.id &&
            task.description + ''}
            {editTask?.id !== task.id &&
            <form >
              <input value={editDescription} onChange ={e => setEditDescription(e.target.value)} />
              <button type="button" onClick={edit}>Save</button>
              <button type="button" onClick={() => setEditTask(null)}>Cancel</button>
            </form>
            }
            <a href="#" onClick={()=>remove(task.id)}>Delete</a>&nbsp;
            {editTask === null &&
            <a href="#" onClick={() => setEditableRow(task)}>Edit</a>
            }
          </li>
        ))}
     </ol>
    </div>
  );
}

export default App;
