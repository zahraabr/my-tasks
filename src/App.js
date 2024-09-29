import React, { useState, useEffect } from "react";
import "./App.css";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/AddTask";
import axios from "axios";

// Import from react-router-dom
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5001/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Tasks List</p>
        <AddTask
          fetchTasks={fetchTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          setCurrentTask={setCurrentTask}
        />
      </header>
    </div>
  );
}

export default App;
