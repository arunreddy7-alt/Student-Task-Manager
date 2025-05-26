"use client";

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <ul className="list-none">
      {tasks.map(task => (
        <li key={task.id} className="mb-2">
          <label className="flex items-center text-black">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.text}
            </span>
          </label>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;