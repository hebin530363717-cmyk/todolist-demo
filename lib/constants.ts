import { FILTER_TYPE, type FilterType, PRIORITY, type Priority } from "@/types";

export const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: "All", value: FILTER_TYPE.ALL },
  { label: "Active", value: FILTER_TYPE.ACTIVE },
  { label: "Completed", value: FILTER_TYPE.COMPLETED },
];

export const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
  { label: "Low", value: PRIORITY.LOW },
  { label: "Medium", value: PRIORITY.MEDIUM },
  { label: "High", value: PRIORITY.HIGH },
  { label: "Urgent", value: PRIORITY.URGENT },
];

export const PRIORITY_COLORS: Record<Priority, string> = {
  [PRIORITY.LOW]: "text-green-600 bg-green-50 border-green-200",
  [PRIORITY.MEDIUM]: "text-blue-600 bg-blue-50 border-blue-200",
  [PRIORITY.HIGH]: "text-orange-600 bg-orange-50 border-orange-200",
  [PRIORITY.URGENT]: "text-red-600 bg-red-50 border-red-200",
};

export const STORAGE_KEY = "todo-storage";
