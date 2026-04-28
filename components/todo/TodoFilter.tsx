"use client";

import { FILTER_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { FilterType } from "@/types";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

function TodoFilter({ currentFilter, onFilterChange, activeCount }: TodoFilterProps) {
  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center gap-1 rounded-lg border p-0.5"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onFilterChange(option.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              currentFilter === option.value
                ? "shadow-sm"
                : "hover:opacity-70"
            )}
            style={{
              backgroundColor: currentFilter === option.value ? "var(--color-accent)" : "transparent",
              color: currentFilter === option.value ? "#ffffff" : "var(--color-text)",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      <span className="text-sm" style={{ color: "var(--color-text)", opacity: 0.5 }}>
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
    </div>
  );
}

export { TodoFilter, type TodoFilterProps };
