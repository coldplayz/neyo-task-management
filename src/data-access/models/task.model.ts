/**
* Model for mapping to database.
* - Framework-specific to Mongoosejs
* - Database-specific to MongoDB
*/

import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  done: Boolean,
}, {
  timestamps: true, // This adds createdAt and updatedAt fields
});

const Task = model('Task', taskSchema);

export default Task;
