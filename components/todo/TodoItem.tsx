"use client";

import { useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { Trash2, Pencil, Check, X, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PRIORITY_OPTIONS, PRIORITY_COLORS } from "@/lib/constants";
import { formatDate, getPriorityLabel } from "@/lib/utils";
import type { Todo, Priority } from "@/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onEditPriority: (id: string, priority: Priority) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onEdit, onEditPriority, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const priorityRef = useRef<HTMLDivElement>(null);

  // Close priority menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (priorityRef.current && !priorityRef.current.contains(e.target as Node)) {
        setShowPriorityMenu(false);
      }
    }
    if (showPriorityMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPriorityMenu]);

  const handleEditStart = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  const handleEditSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const priorityColor = todo.priority ? PRIORITY_COLORS[todo.priority] : "";

  const handlePrioritySelect = (newPriority: Priority) => {
    onEditPriority(todo.id, newPriority);
    setShowPriorityMenu(false);
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-4 transition-all",
        "hover:shadow-md",
        todo.completed && "opacity-70"
      )}
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={handleTitleChange}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="flex-1 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-accent)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
              }}
            />
            <button
              onClick={handleEditSave}
              className="rounded p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleEditCancel}
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-slate-700"
              style={{ color: "var(--color-text)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <span
            className={cn(
              "text-sm font-medium cursor-pointer",
              todo.completed && "line-through"
            )}
            style={{
              color: todo.completed ? "var(--color-text)" : "var(--color-text)",
              opacity: todo.completed ? 0.5 : 1,
            }}
            onDoubleClick={handleEditStart}
          >
            {todo.title}
          </span>
        )}

        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text)", opacity: 0.6 }}>
          {todo.priority && (
            <div className="relative" ref={priorityRef}>
              {todo.completed ? (
                <span
                  className={cn(
                    "rounded border px-1.5 py-0.5 text-xs font-medium",
                    priorityColor
                  )}
                >
                  {getPriorityLabel(todo.priority)}
                </span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-xs font-medium transition-colors",
                      "hover:opacity-80 cursor-pointer",
                      priorityColor
                    )}
                  >
                    {getPriorityLabel(todo.priority)}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {showPriorityMenu && (
                    <div
                      className="absolute left-0 top-full z-10 mt-1 flex flex-col gap-0.5 rounded-lg border p-1 shadow-lg"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {PRIORITY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handlePrioritySelect(opt.value)}
                          className={cn(
                            "whitespace-nowrap rounded px-2 py-1 text-left text-xs font-medium transition-colors",
                            todo.priority === opt.value
                              ? PRIORITY_COLORS[opt.value]
                              : "hover:bg-gray-100 dark:hover:bg-slate-700"
                          )}
                          style={{
                            color: todo.priority !== opt.value ? "var(--color-text)" : undefined,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <span>{formatDate(todo.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEditStart}
          aria-label="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export { TodoItem, type TodoItemProps };
