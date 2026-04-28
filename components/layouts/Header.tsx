"use client";

import { CheckSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function Header() {
  return (
    <header className="border-b bg-[var(--color-surface)]" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6" style={{ color: "var(--color-accent)" }} />
          <h1 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
            Todo App
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export { Header };
