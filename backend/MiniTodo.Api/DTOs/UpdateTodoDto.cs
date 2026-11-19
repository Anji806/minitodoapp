using System.ComponentModel.DataAnnotations;
namespace MiniTodo.Api.DTOs;

public class UpdateTodoDto
{
    [Required]
    [MinLength(1)]
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}
