import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  text: String,
  date: String,
  completed: Boolean
});

export default mongoose.model("Task", TaskSchema);
