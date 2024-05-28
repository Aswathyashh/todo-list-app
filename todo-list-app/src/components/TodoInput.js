import React, { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    if (taskName.trim() === '') return;
    onAdd(taskName);
    setTaskName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">+</button>
      <input 
        type="text"
        value={taskName}
        onChange={(ev) => setTaskName(ev.target.value)}
        placeholder="Your next task..."
      />
    </form>
  );
}