# MiniTodoApp

A minimal full-stack Todo application built with:
- **Backend**: ASP.NET Core Web API (C#) + Entity Framework Core + SQLite
- **Frontend**: React + Vite (JavaScript)

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| .NET SDK | 8.0+ |
| Node.js | 18.0+ |
| npm | 9.0+ |

---

## Running the Backend

```bash
cd backend/MiniTodo.Api
dotnet restore
dotnet ef database update
dotnet run
```

API will be available at: `http://localhost:5000`

---

## Running the Frontend

```bash
cd frontend/mini-todo-ui
npm install
npm run dev
```

UI will be available at: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| PUT | /api/todos/{id} | Update a todo |
| DELETE | /api/todos/{id} | Delete a todo |
| PATCH | /api/todos/{id}/toggle | Toggle completed status |

---

## Project Structure

```
MiniTodoApp/
├── .gitignore
├── README.md
├── backend/
│   └── MiniTodo.Api/       ← ASP.NET Core Web API
└── frontend/
    └── mini-todo-ui/       ← React + Vite app
```

---

> Built as a learning project to explore full-stack development with AI subagents.
