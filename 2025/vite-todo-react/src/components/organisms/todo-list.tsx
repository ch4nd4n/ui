import React from "react";
import TodoItem from "../molecules/todo-item";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No todos yet. Add your first task!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
