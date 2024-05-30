
import './App.css';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput'
import {useEffect, useState} from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage when component initializes
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    if (tasks.length === 0) {
      const initialTasks = [
        { name: 'Sample Task 1', done: false },
        { name: 'Sample Task 2', done: true }
      ];
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    setTasks((prev) => [...prev, { name, done: false }]);
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return 'Try to do at least one!';
    }
    if (percentage === 100) {
      return 'Nice job for today!';
    }
    return 'Keep it going';
  }

  return (
    <main>
      <h1>To-Do List</h1>
      <h2>{numberComplete}/{numberTotal} Complete</h2>
      <h3>{getMessage()}</h3>
      <TodoInput onAdd={addTask} />
      <TodoList 
        tasks={tasks}
        onRename={renameTask}
        onDelete={removeTask}
        onToggle={updateTaskDone}
      />
    </main>
  );
}

export default App;