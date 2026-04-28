"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, onChange, id, disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-2"
            )}
            style={{
              borderColor: checked ? "var(--color-accent)" : "var(--color-border)",
              backgroundColor: checked ? "var(--color-accent)" : "var(--color-bg)",
            }}
          >
            {checked && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
          </span>
        </span>
        {label && <span className="text-sm" style={{ color: "var(--color-text)" }}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
