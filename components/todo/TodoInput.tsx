"use client";

import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PRIORITY_OPTIONS, PRIORITY_COLORS } from "@/lib/constants";
import type { Priority } from "@/types";

interface TodoInputProps {
  onAdd: (title: string, priority?: Priority) => void;
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [showPriority, setShowPriority] = useState(false);

  const trimmed = title.trim();

  const handleSubmit = () => {
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setTitle("");
    setPriority("medium");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value as Priority);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className={cn(
            "flex-1 rounded-lg border px-4 py-2.5 text-sm",
            "placeholder:text-gray-400 dark:placeholder:text-slate-500",
            "focus:outline-none focus:ring-2 focus:border-transparent"
          )}
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
          }}
        />
        <Button onClick={handleSubmit} disabled={!trimmed} size="md">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowPriority(!showPriority)}
          className="text-xs transition-colors"
          style={{ color: "var(--color-text)", opacity: 0.5 }}
        >
          {showPriority ? "Hide priority" : "+ Set priority"}
        </button>

        {showPriority && (
          <div className="flex items-center gap-1.5">
            {PRIORITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handlePriorityChange(option.value)}
                className={cn(
                  "rounded px-2 py-0.5 text-xs font-medium border transition-colors",
                  priority === option.value
                    ? PRIORITY_COLORS[option.value]
                    : "hover:opacity-70"
                )}
                style={{
                  borderColor: priority !== option.value ? "var(--color-border)" : undefined,
                  color: priority !== option.value ? "var(--color-text)" : undefined,
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { TodoInput, type TodoInputProps };
