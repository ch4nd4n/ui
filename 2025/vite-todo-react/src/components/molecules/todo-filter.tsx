import React from "react";

type Filter = "all" | "active" | "completed";

type TodoFilterProps = {
  currentFilter: Filter;
  onChange: (filter: Filter) => void;
};

const filters: Filter[] = ["all", "active", "completed"];

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onChange }) => (
  <div className="flex gap-2">
    {filters.map((filter) => (
      <button
        key={filter}
        className={`px-3 py-1 rounded ${
          currentFilter === filter
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700"
        } transition-colors`}
        onClick={() => onChange(filter)}
        type="button"
      >
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </button>
    ))}
  </div>
);

export default TodoFilter;
