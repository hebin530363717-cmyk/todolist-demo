"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PRIORITY, FILTER_TYPE, type Todo, type Priority, type FilterType } from "@/types";
import { STORAGE_KEY } from "@/lib/constants";

interface TodoStore {
  todos: Todo[];
  filter: FilterType;

  filteredTodos: () => Todo[];
  activeCount: () => number;
  completedCount: () => number;

  addTodo: (title: string, priority?: Priority) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, updates: Partial<Omit<Todo, "id">>) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  reorderTodos: (todos: Todo[]) => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    immer((set, get) => ({
      todos: [],
      filter: FILTER_TYPE.ALL,

      filteredTodos: () => {
        const { todos, filter } = get();
        switch (filter) {
          case FILTER_TYPE.ACTIVE:
            return todos.filter((t) => !t.completed);
          case FILTER_TYPE.COMPLETED:
            return todos.filter((t) => t.completed);
          default:
            return todos;
        }
      },

      activeCount: () => {
        return get().todos.filter((t) => !t.completed).length;
      },

      completedCount: () => {
        return get().todos.filter((t) => t.completed).length;
      },

      addTodo: (title, priority = PRIORITY.MEDIUM) => {
        set((state) => {
          state.todos.unshift({
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            priority,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        });
      },

      toggleTodo: (id) => {
        set((state) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = Date.now();
          }
        });
      },

      editTodo: (id, updates) => {
        set((state) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) {
            Object.assign(todo, updates, { updatedAt: Date.now() });
          }
        });
      },

      deleteTodo: (id) => {
        set((state) => {
          state.todos = state.todos.filter((t) => t.id !== id);
        });
      },

      clearCompleted: () => {
        set((state) => {
          state.todos = state.todos.filter((t) => !t.completed);
        });
      },

      setFilter: (filter) => {
        set((state) => {
          state.filter = filter;
        });
      },

      reorderTodos: (todos) => {
        set((state) => {
          state.todos = todos;
        });
      },
    })),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ todos: state.todos }),
    }
  )
);

export { useTodoStore };
