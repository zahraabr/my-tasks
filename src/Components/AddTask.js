import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import TaskForm from "./TaskForm";

const AddTask = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5001/tasks");
    setTasks(response.data);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "#90e4c1",
          color: "#008080", // Optional: change text color for contrast
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#81cdc6", // Optional: darker shade on hover
          },
        }}
        onClick={handleOpen}
      >
        Add Task
      </Button>

      <TaskForm 
        fetchTasks={fetchTasks}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default AddTask;
