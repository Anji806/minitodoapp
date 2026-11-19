using Microsoft.EntityFrameworkCore;
using MiniTodo.Api.Models;

namespace MiniTodo.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Todo> Todos { get; set; }
}
