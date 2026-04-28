"use client";

import { useTodoStore } from "@/stores/todo-store";
import { useShallow } from "zustand/react/shallow";
import { TodoItem } from "./TodoItem";
import { ListTodo } from "lucide-react";
import type { Todo } from "@/types";

function TodoList() {
  const { todos, filter, toggleTodo, editTodo, deleteTodo } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      filter: state.filter,
      toggleTodo: state.toggleTodo,
      editTodo: state.editTodo,
      deleteTodo: state.deleteTodo,
    }))
  );

  const filteredTodos: Todo[] = (() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  })();

  const sortedTodos = [...filteredTodos].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  if (sortedTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16" style={{ color: "var(--color-text)", opacity: 0.5 }}>
        <ListTodo className="mb-4 h-16 w-16" />
        <p className="text-lg font-medium">
          {filter === "all"
            ? "No tasks yet"
            : filter === "active"
              ? "No active tasks"
              : "No completed tasks"}
        </p>
        <p className="mt-1 text-sm">
          {filter === "all"
            ? "Add a task to get started"
            : "Try changing the filter"}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {sortedTodos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={toggleTodo}
            onEdit={(id, title) => editTodo(id, { title })}
            onEditPriority={(id, priority) => editTodo(id, { priority })}
            onDelete={deleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

export { TodoList };
