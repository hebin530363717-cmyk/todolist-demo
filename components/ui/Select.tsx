"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, placeholder, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "w-full rounded-lg border px-4 py-2 text-sm appearance-none pr-10",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent",
              className
            )}
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            style={{ color: "var(--color-text)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, type SelectProps, type SelectOption };
