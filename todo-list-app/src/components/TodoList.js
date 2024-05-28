import React ,{useState} from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ tasks, onRename, onDelete, onToggle }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          {...task}
          onRename={(newName) => onRename(index, newName)}
          onDelete={() => onDelete(index)}
          onToggle={(done) => onToggle(index, done)}
        />
      ))}
    </div>
  );
}
