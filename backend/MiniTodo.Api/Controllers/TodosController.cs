using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniTodo.Api.Data;
using MiniTodo.Api.DTOs;
using MiniTodo.Api.Models;

namespace MiniTodo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly AppDbContext _db;

    public TodosController(AppDbContext db)
    {
        _db = db;
    }

    private static TodoDto MapToDto(Todo todo) => new TodoDto
    {
        Id = todo.Id,
        Title = todo.Title,
        IsCompleted = todo.IsCompleted,
        CreatedAt = todo.CreatedAt
    };

    // GET /api/todos
    [HttpGet]
    public async Task<ActionResult<List<TodoDto>>> GetAll()
    {
        var todos = await _db.Todos
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => MapToDto(t))
            .ToListAsync();
        return Ok(todos);
    }

    // GET /api/todos/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoDto>> GetById(int id)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo is null) return NotFound();
        return Ok(MapToDto(todo));
    }

    // POST /api/todos
    [HttpPost]
    public async Task<ActionResult<TodoDto>> Create([FromBody] CreateTodoDto dto)
    {
        var todo = new Todo
        {
            Title = dto.Title,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };
        _db.Todos.Add(todo);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, MapToDto(todo));
    }

    // PUT /api/todos/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<TodoDto>> Update(int id, [FromBody] UpdateTodoDto dto)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        todo.Title = dto.Title;
        todo.IsCompleted = dto.IsCompleted;
        await _db.SaveChangesAsync();
        return Ok(MapToDto(todo));
    }

    // DELETE /api/todos/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // PATCH /api/todos/{id}/toggle
    [HttpPatch("{id}/toggle")]
    public async Task<ActionResult<TodoDto>> Toggle(int id)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        todo.IsCompleted = !todo.IsCompleted;
        await _db.SaveChangesAsync();
        return Ok(MapToDto(todo));
    }
}
