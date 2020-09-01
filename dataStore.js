/*
  interface Task {
    _id: String // will just be “task” + counter for now
    name!: String
    description: String
    dueDate: Date
    isComplete: boolean
    createdAt!: Date
    deletedAt!: Date
  }
*/

const tasks = [];

module.exports = {
  getTask: (taskId) => {
    return tasks.find(task => !task.deletedAt && task._id == taskId);
  },
  dataStore: tasks
};
