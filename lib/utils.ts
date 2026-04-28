import { PRIORITY, type Priority } from "@/types";

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function isOverdue(dueDate?: number): boolean {
  if (!dueDate) return false;
  return Date.now() > dueDate;
}

export function getPriorityLabel(priority?: Priority): string {
  if (!priority) return "Medium";
  const labels: Record<Priority, string> = {
    [PRIORITY.LOW]: "Low",
    [PRIORITY.MEDIUM]: "Medium",
    [PRIORITY.HIGH]: "High",
    [PRIORITY.URGENT]: "Urgent",
  };
  return labels[priority];
}
