"use client";

import { useTodoStore } from "@/stores/todo-store";
import { useShallow } from "zustand/react/shallow";
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoFilter } from "@/components/todo/TodoFilter";
import { TodoList } from "@/components/todo/TodoList";
import { TodoStats } from "@/components/todo/TodoStats";

export default function Home() {
  const { filter, setFilter, addTodo } = useTodoStore(
    useShallow((state) => ({
      filter: state.filter,
      setFilter: state.setFilter,
      addTodo: state.addTodo,
    }))
  );

  const activeCount = useTodoStore((state) =>
    state.todos.filter((t) => !t.completed).length
  );

  return (
    <div className="flex flex-col gap-6">
      <TodoInput onAdd={addTodo} />
      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
      />
      <TodoList />
      <TodoStats />
    </div>
  );
}
