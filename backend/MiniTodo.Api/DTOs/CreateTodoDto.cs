using System.ComponentModel.DataAnnotations;
namespace MiniTodo.Api.DTOs;

public class CreateTodoDto
{
    [Required]
    [MinLength(1)]
    public string Title { get; set; } = string.Empty;
}
