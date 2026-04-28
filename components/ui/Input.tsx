"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border px-4 py-2 text-sm",
            "placeholder:text-gray-400 dark:placeholder:text-slate-500",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          style={{
            borderColor: error ? "#ef4444" : "var(--color-border)",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
          }}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
