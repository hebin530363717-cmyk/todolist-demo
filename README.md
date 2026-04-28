# Todo App

基于 **Next.js 15** + **React 19** + **Zustand 5** + **Tailwind CSS 3** 构建的现代待办事项应用。

## 功能

- **增删改查** — 支持创建、编辑、删除待办事项
- **四级优先级** — 低 / 中 / 高 / 紧急（颜色区分）
- **筛选视图** — 全部 / 进行中 / 已完成
- **拖拽排序** — 通过拖拽调整待办顺序
- **本地持久化** — 刷新页面数据不丢失（localStorage）
- **实时统计** — 显示进行中 / 已完成数量
- **响应式布局** — 适配移动端

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| UI 库 | React 19 |
| 语言 | TypeScript 5.7 |
| 状态管理 | Zustand 5 + Immer + Persist |
| 样式 | Tailwind CSS 3 + clsx + tailwind-merge |
| 图标 | Lucide React |
| 包管理 | npm |

## 快速开始

### 环境要求

- Node.js >= 18
- npm

### 安装

```bash
npm install
```

### 开发

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可查看。

### 构建

```bash
npm run build
```

### 生产运行

```bash
npm start
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
todo-app/
├── app/                    # Next.js App Router
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── providers.tsx       # 应用 Provider
├── components/
│   ├── layouts/            # 布局组件
│   │   └── Header.tsx
│   ├── todo/               # 待办功能组件
│   │   ├── TodoFilter.tsx  # 筛选标签
│   │   ├── TodoInput.tsx   # 新增输入框
│   │   ├── TodoItem.tsx    # 单个待办项
│   │   ├── TodoList.tsx    # 待办列表（拖拽排序）
│   │   └── TodoStats.tsx   # 统计栏
│   └── ui/                 # 通用 UI 组件
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── Input.tsx
│       └── Select.tsx
├── lib/
│   ├── cn.ts               # 类名合并工具
│   ├── constants.ts        # 常量配置
│   └── utils.ts            # 通用工具函数
├── stores/
│   └── todo-store.ts       # Zustand 状态管理（immer + persist）
├── types/
│   └── index.ts            # TypeScript 类型定义
└── configs/                # 配置文件
```

## 状态管理

使用 **Zustand 5** 配合两个中间件：

- **`immer`** — 以可变风格更新状态
- **`persist`** — 将待办数据保存到 `localStorage`，key 为 `todo-storage`

仅持久化 `todos` 数组，筛选状态为内存级。

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 代码检查 |

## License

MIT
