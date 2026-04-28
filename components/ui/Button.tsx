"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary: "text-white focus:ring-[var(--color-accent)]",
  secondary:
    "focus:ring-gray-400 border",
  ghost:
    "focus:ring-gray-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantBg: Record<string, string> = {
  primary: "var(--color-accent)",
  secondary: "var(--color-surface)",
  ghost: "transparent",
  danger: "#dc2626",
};

const variantHoverBg: Record<string, string> = {
  primary: "var(--color-accent-hover)",
  secondary: "var(--color-border)",
  ghost: "var(--color-border)",
  danger: "#b91c1c",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? undefined : variantBg[variant],
          color: variant === "ghost" ? "var(--color-text)" : undefined,
          ...style,
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseEnter={(e) => {
          if (!disabled && variantHoverBg[variant]) {
            e.currentTarget.style.backgroundColor = variantHoverBg[variant];
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = variantBg[variant];
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
