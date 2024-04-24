import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [fallbackStorage, setFallbackStorage] = useState<Todo[]>([]);

  const safeLocalStorage = {
    getItem: (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch {
        alert("Changes will not be saved!");
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        alert("Failed to save changes.");
        setFallbackStorage(JSON.parse(value));
      }
    },
  };

  useEffect(() => {
    const data = safeLocalStorage.getItem("todos");
    if (data) {
      setTodos(JSON.parse(data));
    } else {
      setTodos(fallbackStorage);
    }
  }, []);

  useEffect(() => {
    safeLocalStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([newTodo, ...todos]);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 300);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      addTodo(trimmedInput);
      setInput("");
    } else {
      alert("Please enter a valid todo item.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-4 w-1/5">
          <label
            htmlFor="filter-select"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Filter
          </label>
          <select
            id="filter-select"
            value={filter}
            onChange={handleFilterChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <form onSubmit={handleFormSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="input input-bordered input-primary w-full rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add new"
          />
          <button
            type="submit"
            className={`btn btn-primary rounded-lg shadow-sm transform active:scale-95 transition duration-150 ease-in-out px-6 py-2 min-w-[120px] ${
              isAdding ? "loading" : ""
            }`}
          >
            Add
          </button>
        </form>

        <div>
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between bg-white shadow-md p-2 rounded-md mb-2 transition duration-300 ease-in-out ${
                todo.completed ? "bg-green-50" : "hover:bg-blue-50"
              }`}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox checkbox-primary"
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
