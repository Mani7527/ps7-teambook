import React from 'react';

// Props: receiving task/todo object
function TaskItem({ todo }) {
  return (
    <div className="todo-item">
      <span>{todo.todo}</span>
      <span className={todo.completed ? 'done' : 'pending'}>
        {todo.completed ? 'Done' : 'Pending'}
      </span>
    </div>
  );
}

export default TaskItem;
