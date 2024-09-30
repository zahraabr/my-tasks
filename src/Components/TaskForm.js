import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const AddTask = ({ fetchTasks, currentTask, setCurrentTask }) => {
    const [name, setName] = useState(currentTask ? currentTask.name : "");
    const [priority, setPriority] = useState(
        currentTask ? currentTask.priority : "medium"
    );
    const [date, setDate] = useState(
        currentTask ? new Date(currentTask.date) : new Date()
    );

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const taskData = { name, priority, date };
    
        if (currentTask) {
          // Edit task
          await axios.put(
            `http://localhost:5001/tasks/${currentTask._id}`,
            taskData
          );
        } else {
          // Add task
          await axios.post("http://localhost:5001/tasks", taskData);
        }
    
        fetchTasks();
        setCurrentTask(null); // Reset the form
        setName("");
        setPriority("medium");
        setDate(new Date());
    };
    

}