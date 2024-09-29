import React from "react";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks, setCurrentTask }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.name} - {task.priority} -{" "}
          {new Date(task.date).toLocaleDateString()}
          <button onClick={() => handleEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
