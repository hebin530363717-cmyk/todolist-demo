/**
 * Todo 任务状态
 */
const TODO_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

/**
 * Todo 任务项
 */
interface Todo {
  /** 唯一标识符 */
  id: string;
  /** 任务标题 */
  title: string;
  /** 完成状态 */
  completed: boolean;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
  /** 优先级 (可选) */
  priority?: Priority;
  /** 截止日期 (可选) */
  dueDate?: number;
}

/**
 * 任务优先级
 */
const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

/**
 * 筛选类型
 */
const FILTER_TYPE = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

type FilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE];

export { TODO_STATUS, PRIORITY, FILTER_TYPE };
export type { Todo, TodoStatus, Priority, FilterType };
