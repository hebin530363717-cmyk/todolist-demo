"use client";

import { useTodoStore } from "@/stores/todo-store";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

function TodoStats() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const totalCount = todos.length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  if (totalCount === 0) return null;

  return (
    <div
      className="flex items-center justify-between rounded-lg border px-4 py-3"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="flex items-center gap-4 text-sm" style={{ color: "var(--color-text)" }}>
        <span>
          <strong style={{ color: "var(--color-text)" }}>{activeCount}</strong> active
        </span>
        <span>
          <strong style={{ color: "var(--color-text)" }}>{completedCount}</strong> completed
        </span>
        <span>
          <strong style={{ color: "var(--color-text)" }}>{totalCount}</strong> total
        </span>
      </div>

      {completedCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearCompleted}>
          <Trash2 className="h-4 w-4" />
          Clear completed
        </Button>
      )}
    </div>
  );
}

export { TodoStats };
