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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddTask = ({ fetchTasks, currentTask, setCurrentTask }) => {
  const [name, setName] = useState(currentTask ? currentTask.name : "");
  const [priority, setPriority] = useState(
    currentTask ? currentTask.priority : "medium"
  );
  const [date, setDate] = useState(
    currentTask ? new Date(currentTask.date) : new Date()
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Task
          </Typography>
          <Grid></Grid>

          <form onSubmit={handleSubmit}>
            <Box sx={{ width: "100%", marginTop: "16px" }}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Task Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="priority">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      id="priority"
                      value={priority}
                      label="Priority"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <MenuItem value={"high"}>High</MenuItem>
                      <MenuItem value={"medium"}>Medium</MenuItem>
                      <MenuItem value={"low"}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      label="Due Date"
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                display="flex"
                justifyContent="center"
                sx={{ marginTop: "16px" }}
              >
                <Grid item>
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
                    type="submit"
                  >
                    {currentTask ? "Edit " : "Add "}
                    Task
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTask;
