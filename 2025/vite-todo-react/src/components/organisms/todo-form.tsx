import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import Input from "../atoms/input";
// import Button from "../atoms/button";

type TodoFormProps = {
  onAdd: (text: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1"
        aria-label="Add todo"
      />
      <Button type="submit" className="px-4 py-2">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
