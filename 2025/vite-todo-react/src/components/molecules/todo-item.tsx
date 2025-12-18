import React from "react";
// import Checkbox from "../atoms/checkbox";
// import Button from "../atoms/button";
// import Input from "../atoms/input";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type TodoItemProps = {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== "") {
      onEdit(id, editText.trim());
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center gap-2 py-2 px-3 border-b">
      <Checkbox
        checked={completed}
        onChange={() => onToggle(id)}
        aria-label="Toggle complete"
      />
      {isEditing ? (
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1"
        />
      ) : (
        <span
          className={`flex-1 ${completed ? "line-through text-gray-400" : ""}`}
        >
          {text}
        </span>
      )}
      <Button
        onClick={handleEdit}
        className="ml-2 px-2 py-1 text-xs"
        aria-label={isEditing ? "Save" : "Edit"}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={() => onDelete(id)}
        className="ml-1 px-2 py-1 text-xs bg-red-500 hover:bg-red-600"
        aria-label="Delete"
      >
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;
